function getMyLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
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
