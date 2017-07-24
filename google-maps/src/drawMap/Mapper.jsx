import React from 'react';
import { findDOMNode } from 'react-dom';
import { getMap, getMyLocation } from './mapUtils';
import { saveDefaultLocation } from './persistence';
import Landmark from './Landmark';
import Marker from './Marker.jsx';

class Mapper extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      height: 600,
      width: '100%',
      display: 'flexbox',
    };

    this.map = null;
    this.state = {
      landmarks: [],
    };
  }

  componentDidMount() {
    function updateLandmarkList() {
      return (landmarks) => { this.setState({ landmarks }); };
    }

    getMyLocation().then((position) => {
      let saveTimer = 0;
      this.map = getMap(findDOMNode(this.mapDomElement));
      this.map.setCenter(position);
      this.landMark = new Landmark(this.map, updateLandmarkList.bind(this)());

      this.map.addListener('click', (ev) => {
        // console.log('click', ev.latLng.lat(), ev.latLng.lng());
        this.landMark.addMarker({
          map: this.map,
          location: ev.latLng,
          title: '',
          component: this,
        }, true);
      });

      this.map.addListener('center_changed', () => {
        if (saveTimer) {
          clearTimeout(saveTimer);
          saveTimer = 0;
        }
        saveTimer = setTimeout(() => {
          saveDefaultLocation({
            lat: this.map.getCenter().lat(),
            lng: this.map.getCenter().lng(),
          });
          saveTimer = 0; // clear
        }, 3000);
      });
    });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>

        <div
          id="maps"
          style={this.style}
          ref={(domElem) => { this.mapDomElement = domElem; }}
        />

        <div style={{ display: 'flexbox' }} >
          <button
            onClick={() => {
              if (this.landMark) this.landMark.setBounds(this.map);
            }}
          >
            Zoom to view
          </button>
          <section>
            {
              this.state.landmarks.map((lm, index) => (<Marker
                key={lm.id}
                id={lm.id}
                index={index}
                title={lm.marker.getTitle()}
                show={lm.marker.getMap() !== null}
                selected={lm.selected}
                selectionHandler={() => {
                  (m => this.landMark.selectMarkerAt(m.getPosition()))(lm.marker);
                }}
                toggleHandler={() => {
                  ((m, map) => this.landMark.toggleMarker(m, map))(lm.marker, this.map);
                }}
                deleteHandler={() => {
                  ((m, map) => this.landMark.deleteMarker(m, map))(lm.marker, this.map);
                }}
                titleChangeHandler={(event) => {
                  (m => this.landMark.changeMarkerTitle(m, event.target.value))(lm.marker);
                }}
                moveUpHandler={() => {
                  ((ind, map) => this.landMark.moveMarkerUp(ind, map))(index, this.map);
                }}
                moveDownHandler={() => {
                  ((ind, map) => this.landMark.moveMarkerDown(ind, map))(index, this.map);
                }}
              />))
            }
          </section>
        </div>

      </div>
    );
  }
}

export default Mapper;
