
import { loadLandmarks, saveLandmarks } from './persistence';

function save(landMarkList) {
  const toSave = landMarkList.map(lm => ({title:lm.marker.getTitle(), lat:lm.marker.position.lat(), lng: lm.marker.position.lng()}));
  saveLandmarks(toSave);
}

class LandMarker {

  constructor(map) {

    this.googleMap = map;
    this.landmarks = [];
    const saved = loadLandmarks();
    if (saved && saved.length) {
      saved.forEach(location => {
        console.log(location.lat, location.lng);
        this.addMarker(new window.google.maps.LatLng(location.lat, location.lng), location.title, false);
      });
    }
  }

  getLandmarks() {
    return this.landmarks;
  }

  addMarker(location, title, persist = true) { // location must be object {lat, lng}

    let newMarker = new window.google.maps.Marker({
      position:location,
      map: this.googleMap,
      draggable:true,
      label: title,
      title: title
    });

    newMarker.addListener('dragend', (ev) => {
      console.log(ev.latLng.lat(), ev.latLng.lng());
      save(this.landmarks);
    });

    newMarker.addListener('dragend', (ev) => {
      console.log(ev.latLng.lat(), ev.latLng.lng());
      save(this.landmarks);
    });

    this.landmarks.push({
      id: (new Date()).getTime(),
      location: location,
      marker: newMarker
    });

    if (persist) {
      save(this.landmarks);
    }
  }

  assignMarkersToMap(gMap) {
    this.landmarks.map(lm => lm.marker).forEach(m => m.setMap(gMap));
  }

  hideMarker(marker) {
    marker.setMap(null);
  }

  showMarker(marker) {
    marker.setMap(this.googleMap);
  }

  deleteMarker(marker) {
    this.hideMarker(marker);
    this.landmarks = this.landmarks.filter(lm => lm.location.lat() !== marker.position.lat() && lm.location.lng() !== marker.position.lng());
    save(this.landmarks);
  }

  changeMarkerTitle(marker, newTitle) {
    marker.setTitle(newTitle);
    marker.setLabel(newTitle);
    save(this.landmarks);
  }

}



export default LandMarker;
