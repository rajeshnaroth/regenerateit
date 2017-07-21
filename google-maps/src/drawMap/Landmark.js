/* global window */
import { loadLandmarks, saveLandmarks } from './persistence';

function save(landMarkList) {
  const toSave = landMarkList.map(lm => ({
    title: lm.marker.getTitle(),
    lat: lm.marker.position.lat(),
    lng: lm.marker.position.lng(),
  }));
  saveLandmarks(toSave);
}

function markerIsAtLocation(clickPosition, location) {
  return (
    location.lat() === clickPosition.lat() && location.lng() === clickPosition.lng()
  );
}

function hideMarker(marker) {
  marker.setMap(null);
}

function showMarker(marker, map) {
  // console.log('showMarker', map);
  marker.setMap(map);
}

const normalIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

class Landmark {

  constructor(map, viewStateRefresher) {
    this.landmarks = [];
    this.perimeter = null;
    this.viewStateRefresher = viewStateRefresher;
    const saved = loadLandmarks();
    if (saved && saved.length) {
      saved.forEach((location) => {
        // console.log(location.lat, location.lng);
        this.addMarker(map,
          new window.google.maps.LatLng(location.lat, location.lng),
          location.title, false);
      });
    }
    this.setBounds(map);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  getLandmarks() {
    return this.landmarks;
  }

  addMarker(map, location, title, insertNew = true) { // location must be object {lat, lng}
    const newMarker = new window.google.maps.Marker({
      position: location,
      map,
      draggable: true,
      label: title,
      title,
      icon: normalIcon,
    });

    newMarker.addListener('dragend', () => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      /* eslint no-param-reassign: 0 */
      this.landmarks.forEach((lm) => { lm.location = lm.marker.getPosition(); });
      this.showPerimeter(map);
      save(this.landmarks);
    });

    newMarker.addListener('dragstart', (ev) => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      this.selectMarkerAt(ev.latLng);
    });

    newMarker.addListener('click', (ev) => {
      // console.log('click', ev, ev.latLng.lat(), ev.latLng.lng());
      this.selectMarkerAt(ev.latLng);
    });

    newMarker.addListener('dblclick', (ev) => {
      // console.log('click', ev, ev.latLng.lat(), ev.latLng.lng());
      this.landmarks.forEach((lm) => {
        if (markerIsAtLocation(ev.latLng, lm.location)) {
          this.deleteMarker(lm.marker, map);
        }
      });
    });

    if (insertNew) {
      const midpoints = this.landmarks.map((lm, i, lmArray) => {
        const index1 = i;
        const index2 = (i + 1) % lmArray.length;
        const newLat = (lm.marker.getPosition().lat()
          + lmArray[index2].marker.getPosition().lat()) / 2;
        const newLng = (lm.marker.getPosition().lng()
          + lmArray[index2].marker.getPosition().lng()) / 2;

        return {
          indices: [index1, index2],
          position: new window.google.maps.LatLng(newLat, newLng),
        };
      });

      const nearest = midpoints.reduce((accum, mp) => {
        const distance =
          window.google.maps.geometry.spherical
            .computeDistanceBetween(newMarker.getPosition(), mp.position);
        // console.log(accum.index, mp.indices[0], distance);
        if (accum.index === -1) { // first one
          return { index: mp.indices[0], distance };
        }
        if (distance < accum.distance) {
          return { index: mp.indices[0], distance };
        }
        return accum;
      }, { index: -1, distance: 0 });

      // console.log(nearest);
      this.landmarks.splice(nearest.index + 1, 0, {
        id: (new Date()).getTime(),
        selected: false,
        location,
        marker: newMarker,
      });
      save(this.landmarks);
    } else {
      this.landmarks.push({
        id: (new Date()).getTime(),
        selected: false,
        location,
        marker: newMarker,
      });
    }

    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  static toggleMarker(marker, map) {
    if (marker.getMap()) {
      hideMarker(marker);
    } else {
      showMarker(marker, map);
    }
  }

  deleteMarker(marker, map) {
    hideMarker(marker);
    this.landmarks = this.landmarks.filter(lm => !markerIsAtLocation(marker.position, lm.location));
    // lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
    save(this.landmarks);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  selectMarkerAt(clickPosition) {
    this.landmarks.forEach((lm) => {
      lm.selected = markerIsAtLocation(clickPosition, lm.location);
      lm.marker.setIcon(lm.selected ? selectedIcon : normalIcon);
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
