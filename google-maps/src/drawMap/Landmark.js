// import getMapsApi from './googleMaps';
/* global window */
// import React from 'react';
// import ReactDOM from 'react-dom';
import { loadLandmarks, saveLandmarks } from './persistence';

function save(landMarkList) {
  const toSave = landMarkList.map(lm => ({
    title: lm.marker.getTitle(),
    show: (lm.marker.getMap() !== null),
    lat: lm.marker.position.lat(),
    lng: lm.marker.position.lng(),
  }));
  saveLandmarks(toSave);
}

function bothLocationsAreSame(clickPosition, location) {
  return (
    location.lat() === clickPosition.lat() && location.lng() === clickPosition.lng()
  );
}

function hideMarker(marker) {
  marker.setMap(null);
}

function showMarker(marker, map) {
  marker.setMap(map);
}

function getIcon(url) {
  return {
    url,
    size: new window.google.maps.Size(32, 32),
    scaledSize: new window.google.maps.Size(32, 32),
    labelOrigin: new window.google.maps.Point(16, -7),
  };
}

function selectedIcon() {
  return getIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
}

function normalIcon() {
  return getIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
}

function getMarker(config) {
  return new window.google.maps.Marker({
    position: config.location,
    map: null,
    draggable: true,
    label: config.title,
    title: config.title,
    icon: normalIcon(),
  });
}

function getMarkerPositionInNearestLandmarks(newMarker, landmarks) {
  const midpoints = landmarks.map((lm, i, lmArray) => {
    const index1 = i;
    const index2 = (i + 1) % lmArray.length;
    const newLat = (lm.marker.getPosition().lat() + lmArray[index2].marker.getPosition().lat()) / 2;
    const newLng = (lm.marker.getPosition().lng() + lmArray[index2].marker.getPosition().lng()) / 2;

    return {
      indices: [index1, index2],
      position: new window.google.maps.LatLng(newLat, newLng),
    };
  });

  const nearest = midpoints.reduce((accum, mp) => { // returns {index, distance}
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(newMarker.getPosition(), mp.position);
    if (accum.index === -1 || distance < accum.distance) {
      return { index: mp.indices[0], distance };
    }
    return accum;
  }, { index: -1, distance: 0 });

  return nearest;
}


class Landmark {
  constructor(map, viewStateRefresher) {
    this.landmarks = [];
    this.perimeter = null;
    this.viewStateRefresher = viewStateRefresher;
    const saved = loadLandmarks();
    if (saved && saved.length) {
      saved.forEach((location) => {
        // console.log(location.lat, location.lng);
        this.addMarker({
          map,
          show: location.show,
          location: new window.google.maps.LatLng(location.lat, location.lng),
          title: location.title,
        }, false);
      });
    }
    this.setBounds(map);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  getLandmarks() {
    return this.landmarks;
  }

  addMarker(config, insertViaUserClickOnMap = true) {
    const newMarker = getMarker(config);
    const newLandmarkRecord = {
      id: (new Date()).getTime(),
      selected: false,
      location: config.location,
      marker: newMarker,
      index: 0,
    };

    if (insertViaUserClickOnMap || config.show) {
      newMarker.setMap(config.map);
    }

    if (insertViaUserClickOnMap) {
      const nearest = getMarkerPositionInNearestLandmarks(newMarker, this.landmarks);
      this.landmarks.splice(nearest.index + 1, 0, newLandmarkRecord);
      newLandmarkRecord.index = nearest.index;
      save(this.landmarks);
    } else {
      newLandmarkRecord.index = this.landmarks.length;
      this.landmarks.push(newLandmarkRecord);
    }

    // Now the event handlers

    newMarker.addListener('dragend', () => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      /* slint no-param-reassign: 0 */
      this.landmarks.forEach((lm) => {
        lm.location = lm.marker.getPosition(); // eslint-disable-line no-param-reassign
      });
      this.showPerimeter(config.map);
      save(this.landmarks);
    });

    newMarker.addListener('dragstart', (ev) => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      this.selectMarkerAt(ev.latLng);
    });

    newMarker.addListener('click', (ev) => {
      // const contentString = (<div>{newLandmarkRecord.marker.getTitle()}</div>);
      //
      // const div = document.createElement('div');
      // ReactDOM.render(contentString, div);
      // const infoWindow = new window.google.maps.InfoWindow({
      //   content: div,
      // });
      this.selectMarkerAt(ev.latLng);
      // infoWindow.open(config.map, newMarker);
    });

    newMarker.addListener('dblclick', (ev) => {
      this.landmarks.forEach((lm) => {
        if (bothLocationsAreSame(ev.latLng, lm.location)) {
          this.deleteMarker(lm.marker, config.map);
        }
      });
    });

    // Draw and refresh
    this.showPerimeter(config.map);
    this.viewStateRefresher(this.landmarks);
  }

  toggleMarker(marker, map) {
    if (marker.getMap()) {
      hideMarker(marker);
    } else {
      showMarker(marker, map);
    }
    save(this.landmarks);
  }

  deleteMarker(marker, map) {
    hideMarker(marker);
    this.landmarks = this.landmarks.filter(lm => !bothLocationsAreSame(marker.position, lm.location));
    save(this.landmarks);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  selectMarkerAt(clickPosition) {
    this.landmarks.forEach((lm) => {
      lm.selected = bothLocationsAreSame(clickPosition, lm.location); // eslint-disable-line no-param-reassign
      lm.marker.setIcon(lm.selected ? selectedIcon() : normalIcon());
    });
    // lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
    this.viewStateRefresher(this.landmarks);
  }

  moveMarkerUp(index, map) {
    const toIndex = index - 1;
    if (toIndex >= 0) {
      [this.landmarks[index], this.landmarks[toIndex]] = [this.landmarks[toIndex], this.landmarks[index]];
      save(this.landmarks);
      this.showPerimeter(map);
      this.viewStateRefresher(this.landmarks);
    }
    // lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
  }

  moveMarkerDown(index, map) {
    const toIndex = index + 1;
    if (toIndex < this.landmarks.length) {
      [this.landmarks[index], this.landmarks[toIndex]] = [this.landmarks[toIndex], this.landmarks[index]];
      save(this.landmarks);
      this.showPerimeter(map);
      this.viewStateRefresher(this.landmarks);
    }
    // lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
  }

  changeMarkerTitleFromInfoWindow(marker, newTitle) {
    marker.setTitle(newTitle);
    marker.setLabel(newTitle);
    save(this.landmarks);
    // this.viewStateRefresher(this.landmarks);
  }

  changeMarkerTitle(marker, newTitle) {
    marker.setTitle(newTitle);
    marker.setLabel(newTitle);
    save(this.landmarks);
    this.viewStateRefresher(this.landmarks);
  }

  setBounds(map) {
    const bounds = new window.google.maps.LatLngBounds();
    this.landmarks.forEach(lm => bounds.extend(lm.marker.getPosition()));
    map.fitBounds(bounds);
  }

  showPerimeter(map) {
    const perimeterPoints = this.landmarks.map(lm => ({
      lat: lm.marker.position.lat(), lng: lm.marker.position.lng(),
    }));

    if (this.perimeter) {
      this.perimeter.setMap(null);
    }

    if (perimeterPoints.length > 0) {
      perimeterPoints.push(perimeterPoints[0]);
      this.perimeter = new window.google.maps.Polyline({
        path: perimeterPoints,
        strokeColor: '#0099AA',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#EEEE00',
        fillOpacity: 0.35,
      });
      this.perimeter.setMap(map);
    }
  }
}

export default Landmark;
