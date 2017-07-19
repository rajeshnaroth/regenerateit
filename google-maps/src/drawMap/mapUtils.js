import { loadDefaultLocation, saveDefaultLocation } from './persistence'

function getMyLocation() {
  return new Promise((resolve, reject) => {
    // from localStorage
    const dLoc = loadDefaultLocation();
    if (dLoc) {
      resolve(dLoc);
    }

    //from geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          saveDefaultLocation(loc)
          resolve(loc);
        },
        function() {
          reject('failed to get location');
        });
    } else {
      reject('Geolocation not supported or enabled');
    }
  })
}

export { getMyLocation }
