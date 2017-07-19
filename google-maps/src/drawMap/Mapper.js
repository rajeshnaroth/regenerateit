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
    function updateLandmarkList() {
      return (landmarks) => { this.setState({landmarks: landmarks}) }
    }

    getMyLocation().then((position) => {
      var saveTimer = 0;
      this.map = getMap(findDOMNode(this.mapDomElement));
      this.map.setCenter(position);
      this.landMarker = new LandMarker(this.map, updateLandmarkList.bind(this)());

      this.map.addListener('click', (ev) => {
        //console.log('click', ev.latLng.lat(), ev.latLng.lng());
        this.landMarker.addMarker(ev.latLng, 'New Landmark', true);
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
  }

  changeMarkerTitle(marker, newTitle) {
    this.landMarker.changeMarkerTitle(marker, newTitle);
  }


  render() {
    return (
      <div style={{display:'flex'}}>

        <div id="maps" style={this.style}
          ref={ (domElem) => this.mapDomElement = domElem }>
        </div>

        <div style={{display:'flexbox'}}>
        <button onClick={() => {
          if (this.landMarker) this.landMarker.setBounds();
        }}>Zoom to view</button>
        <section>
        {
          this.state.landmarks.map((lm, index) => <Marker
            key={lm.id}
            id={lm.id}
            index={index}
            title={lm.marker.getTitle()}
            selected={lm.selected}
            selectionHandler={() => {
              console.log('selectionHandler');
              ((m) => this.landMarker.selectMarkerAt(m.getPosition()))(lm.marker);
            }}
            toggleHandler={() => {
              ((m) => this.landMarker.toggleMarker(m))(lm.marker);
            }}
            deleteHandler={() => {
              ((m) => this.deleteMarker(m))(lm.marker);
            }}
            titleChangeHandler={(event) => {
              ((m) => this.changeMarkerTitle(m, event.target.value))(lm.marker);
            }}
          />)
        }
        </section>
        </div>

      </div>
    )
  }
}

export default Mapper;
