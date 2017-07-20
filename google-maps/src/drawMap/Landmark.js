
import { loadLandmarks, saveLandmarks } from './persistence';

function save(landMarkList) {
  const toSave = landMarkList.map(lm => ({title:lm.marker.getTitle(), lat:lm.marker.position.lat(), lng: lm.marker.position.lng()}));
  saveLandmarks(toSave);
}

function markerIsAtLocation(clickPosition, location) {
  return (
    location.lat() === clickPosition.lat() && location.lng() === clickPosition.lng()
  );
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
      saved.forEach(location => {
        console.log(location.lat, location.lng);
        this.addMarker(map, new window.google.maps.LatLng(location.lat, location.lng), location.title, false);
      });
    }
    this.setBounds(map);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  getLandmarks() {
    return this.landmarks;
  }

  addMarker(map, location, title, persist = true) { // location must be object {lat, lng}

    let newMarker = new window.google.maps.Marker({
      position:location,
      map: map,
      draggable:true,
      label: title,
      title: title,
      icon: normalIcon
    });

    newMarker.addListener('dragend', (ev) => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      this.landmarks.forEach(lm => lm.location = lm.marker.getPosition());
      this.showPerimeter(map);
      save(this.landmarks);
    });

    newMarker.addListener('dragstart', (ev) => {
      //console.log(ev.latLng.lat(), ev.latLng.lng());
      this.selectMarkerAt(ev.latLng);
    });

    newMarker.addListener('click', (ev) => {
      //console.log('click', ev, ev.latLng.lat(), ev.latLng.lng());
      this.selectMarkerAt(ev.latLng);
    });

    this.landmarks.push({
      id: (new Date()).getTime(),
      selected: false,
      location: location,
      marker: newMarker
    });

    if (persist) {
      save(this.landmarks);
    }
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  toggleMarker(marker, map) {
    if (marker.getMap()) {
      this.hideMarker(marker);
    } else {
      this.showMarker(marker, map);
    }
  }

  hideMarker(marker) {
    marker.setMap(null);
  }

  showMarker(marker, map) {
    console.log('showMarker', map);
    marker.setMap(map);
  }

  deleteMarker(marker, map) {
    console.log(map);
    this.hideMarker(marker);
    this.landmarks = this.landmarks.filter(lm => !markerIsAtLocation(marker.position, lm.location));
    //lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
    save(this.landmarks);
    this.showPerimeter(map);
    this.viewStateRefresher(this.landmarks);
  }

  selectMarkerAt(clickPosition) {
    this.landmarks.forEach(lm => {
      lm.selected = markerIsAtLocation(clickPosition, lm.location);
      lm.marker.setIcon(lm.selected ? selectedIcon : normalIcon);
    });
    //lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
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
    //lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
  }

  moveMarkerDown(index, map) {
    const toIndex = index + 1;
    if (toIndex < this.landmarks.length) {
      [this.landmarks[index], this.landmarks[toIndex]] = [this.landmarks[toIndex], this.landmarks[index]];
      save(this.landmarks);
      this.showPerimeter(map);
      this.viewStateRefresher(this.landmarks);
    }
    //lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
  }

  changeMarkerTitle(marker, newTitle) {
    marker.setTitle(newTitle);
    marker.setLabel(newTitle);
    save(this.landmarks);
    this.viewStateRefresher(this.landmarks);
  }

  setBounds(map) {
    let bounds = new window.google.maps.LatLngBounds();
    this.landmarks.forEach(lm => bounds.extend(lm.marker.getPosition()));
    map.fitBounds(bounds);
  }

  showPerimeter(map) {
    const perimeterPoints = this.landmarks.map(lm => ({lat:lm.marker.position.lat(), lng: lm.marker.position.lng()}));
    if (this.perimeter) {
      this.perimeter.setMap(null);
    }
    this.perimeter = new window.google.maps.Polygon({
          path: perimeterPoints,
          strokeColor: '#0099AA',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#EEEE00',
          fillOpacity: 0.35
        });

    this.perimeter.setMap(map);
  }

}



export default Landmark;
