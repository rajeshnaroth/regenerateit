import React from 'react';
import { findDOMNode } from 'react-dom';
import { getMyLocation } from './mapUtils';


class Mapper extends React.Component {

  constructor(props) {
    super(props);

    this.style = {
      height:600,
      width:'100%'
    }
    this.map = null;
    this.markers = [];
    this.state = {
    };
  }

  componentDidMount() {
    this.map = new window.google.maps.Map(findDOMNode(this.mapDomElement), {
      zoom: 15,
      center: new window.google.maps.LatLng(37.769, -122.446),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    });

    getMyLocation().then((position) => {
      this.map.setCenter(position);
    })

    this.map.addListener('click', (ev) => {
      console.log('click', ev);
      this.addMarker(ev.latLng);
    })
  }

  addMarker(location) { // location must be object {lat, long}
    let newMarker = new window.google.maps.Marker({
      position:location,
      map: this.map,
      title: 'New Marker'
    });
    this.markers.push(newMarker);
    console.log(this.markers, location);
    //this.assignMarkersToMap(this.markers, this.map);
  }

  assignMarkersToMap(markers, map) {
    markers.forEach(m => m.setMap(map));
  }

  render() {
    return (<div id="maps" style={this.style}
      ref={ (domElem) => this.mapDomElement = domElem }>
    </div>)
  }
}

export default Mapper;
