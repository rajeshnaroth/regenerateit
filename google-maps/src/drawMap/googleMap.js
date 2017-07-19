function getMap(domNode) {
  return new window.google.maps.Map(domNode, {
    zoom: 15,
    center: new window.google.maps.LatLng(37.769, -122.446),
    mapTypeId: window.google.maps.MapTypeId.ROADMAP
  });
}

export default getMap;
