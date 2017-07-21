/* global window, navigator */
import {
  loadDefaultLocation,
  saveDefaultLocation,
} from './persistence';

function getMap(domNode) {
  return new window.google.maps.Map(domNode, {
    zoom: 15,
    center: new window.google.maps.LatLng(37.769, -122.446),
    mapTypeId: window.google.maps.MapTypeId.ROADMAP,
  });
}

function getMyLocation() {
  return new Promise((resolve, reject) => {
    // First try to get it from from localStorage/api
    const defaultLocation = loadDefaultLocation();
    if (defaultLocation) {
      resolve(defaultLocation);
    }

    // if not get it from from geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          saveDefaultLocation(loc);
          resolve(loc);
        },
        () => {
          reject('failed to get location');
        });
    } else {
      reject('Geolocation not supported or enabled');
    }
  });
}

export { getMyLocation, getMap };
