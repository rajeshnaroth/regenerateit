
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

class LandMarker {

  constructor(map, viewStateRefresher) {

    this.googleMap = map;
    this.landmarks = [];
    this.viewStateRefresher = viewStateRefresher;
    const saved = loadLandmarks();
    if (saved && saved.length) {
      saved.forEach(location => {
        console.log(location.lat, location.lng);
        this.addMarker(new window.google.maps.LatLng(location.lat, location.lng), location.title, false);
      });
    }
    this.setBounds();
    this.viewStateRefresher(this.landmarks);
  }

  /*
  var markers = [];//some array
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
   bounds.extend(markers[i].getPosition());
  }

  map.fitBounds(bounds);
  */

  getLandmarks() {
    return this.landmarks;
  }

  addMarker(location, title, persist = true) { // location must be object {lat, lng}

    let newMarker = new window.google.maps.Marker({
      position:location,
      map: this.googleMap,
      draggable:true,
      label: title,
      title: title,
      icon: normalIcon
    });

    newMarker.addListener('dragend', (ev) => {
      // console.log(ev.latLng.lat(), ev.latLng.lng());
      this.landmarks.forEach(lm => lm.location = lm.marker.getPosition());
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

    this.viewStateRefresher(this.landmarks);
  }

  assignMarkersToMap(gMap) {
    this.landmarks.map(lm => lm.marker).forEach(m => m.setMap(gMap));
  }

  toggleMarker(marker) {
    if (marker.getMap()) {
      this.hideMarker(marker);
    } else {
      this.showMarker(marker);
    }
  }

  hideMarker(marker) {
    marker.setMap(null);
  }

  showMarker(marker) {
    marker.setMap(this.googleMap);
  }

  deleteMarker(marker) {
    this.hideMarker(marker);
    this.landmarks = this.landmarks.filter(lm => !markerIsAtLocation(marker.position, lm.location));
    //lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
    save(this.landmarks);
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

  changeMarkerTitle(marker, newTitle) {
    marker.setTitle(newTitle);
    marker.setLabel(newTitle);
    save(this.landmarks);
    this.viewStateRefresher(this.landmarks);
  }

  setBounds() {
    let bounds = new window.google.maps.LatLngBounds();
    this.landmarks.forEach(lm => bounds.extend(lm.marker.getPosition()));
    this.googleMap.fitBounds(bounds);
  }

}



export default LandMarker;
