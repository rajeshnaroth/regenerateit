import React from 'react';
import { findDOMNode } from 'react-dom';
import { getMyLocation } from './mapUtils';
import { saveDefaultLocation } from './persistence';

import getMap from './googleMap';
import LandMarker from './LandMarker';
import Marker from './Marker';


class Mapper extends React.Component {

  constructor(props) {

    super(props);

    this.style = {
      height:600,
      width:'100%',
      display:'flexbox'
    }
    this.map = null;
    this.state = {
      landmarks: []
    };
  }

  componentDidMount() {

    getMyLocation().then((position) => {
      var saveTimer = 0;
      this.map = getMap(findDOMNode(this.mapDomElement));
      this.map.setCenter(position);
      this.landMarker = new LandMarker(this.map);
      this.setState({landmarks: this.landMarker.getLandmarks()});

      this.map.addListener('click', (ev) => {
        //console.log('click', ev.latLng.lat(), ev.latLng.lng());
        //this.addMarker(ev.latLng);
        this.landMarker.addMarker(ev.latLng, 'New Landmark', true);
        this.setState({landmarks: this.landMarker.getLandmarks()});
      });

      this.map.addListener('center_changed', (ev) => {
        if (saveTimer) {
          clearTimeout(saveTimer);
          saveTimer = 0;
        }
        saveTimer = setTimeout(() => {
          saveDefaultLocation({
            lat:this.map.getCenter().lat(),
            lng:this.map.getCenter().lng()
          });
          saveTimer = 0; //clear
        }, 3000);
      });
    });
  }

  deleteMarker(marker) {
    this.landMarker.deleteMarker(marker);
    this.setState({landmarks: this.landMarker.getLandmarks()});
  }

  changeMarkerTitle(marker, newTitle) {
    this.landMarker.changeMarkerTitle(marker, newTitle);
    this.setState({landmarks: this.landMarker.getLandmarks()});
  }


  render() {
    return (
      <div style={{display:'flex'}}>

        <div id="maps" style={this.style}
          ref={ (domElem) => this.mapDomElement = domElem }>
        </div>

        <div style={{display:'flexbox'}}>
        <ul>
        {
          this.state.landmarks.map((lm, index) => <Marker
            key={lm.id}
            id={lm.id}
            index={index}
            title={lm.marker.getTitle()}
            hideHandler={() => {
              ((m) => this.landMarker.hideMarker(m))(lm.marker);
            }}
            showHandler={() => {
              ((m) => this.landMarker.showMarker(m))(lm.marker);
            }}
            deleteHandler={() => {
              ((m) => this.deleteMarker(m))(lm.marker);
            }}
            titleChangeHandler={(event) => {
              ((m) => this.changeMarkerTitle(m, event.target.value))(lm.marker);
            }}
          />)
        }
        </ul>
        </div>

      </div>
    )
  }
}

export default Mapper;
