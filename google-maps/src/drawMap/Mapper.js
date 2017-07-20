import React from 'react';
import { findDOMNode } from 'react-dom';
import { getMyLocation } from './mapUtils';
import { saveDefaultLocation } from './persistence';

import getMap from './googleMap';
import Landmark from './Landmark';
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
      this.landMark = new Landmark(this.map, updateLandmarkList.bind(this)());

      this.map.addListener('click', (ev) => {
        //console.log('click', ev.latLng.lat(), ev.latLng.lng());
        this.landMark.addMarker(this.map, ev.latLng, 'New Landmark', true);
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

  // deleteMarker(marker, map) {
  //   this.landMark.deleteMarker(marker);
  // }
  //
  // changeMarkerTitle(marker, newTitle) {
  //   this.landMark.changeMarkerTitle(marker, newTitle);
  // }
  //
  // moveMarkerUp(index) {
  //   this.landMark.moveMarkerUp(index);
  // }
  //
  // moveMarkerDown(index) {
  //   this.landMark.moveMarkerDown(index);
  // }

  render() {
    return (
      <div style={{display:'flex'}}>

        <div id="maps" style={this.style}
          ref={ (domElem) => this.mapDomElement = domElem }>
        </div>

        <div style={{display:'flexbox'}}>
        <button onClick={() => {
          if (this.landMark) this.landMark.setBounds();
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
              ((m, map) => this.landMark.selectMarkerAt(m.getPosition()))(lm.marker, this.map);
            }}
            toggleHandler={() => {
              ((m, map) => this.landMark.toggleMarker(m, map))(lm.marker, this.map);
            }}
            deleteHandler={() => {
              ((m, map) => this.landMark.deleteMarker(m, map))(lm.marker, this.map);
            }}
            titleChangeHandler={(event) => {
              ((m, map) => this.landMark.changeMarkerTitle(m, event.target.value))(lm.marker, this.map);
            }}
            moveUpHandler={() => {
              ((ind, map) => this.landMark.moveMarkerUp(ind, map))(index, this.map);
            }}
            moveDownHandler={() => {
              ((ind, map) => this.landMark.moveMarkerDown(ind, map))(index, this.map);
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
