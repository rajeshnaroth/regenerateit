import React from 'react';
import PropTypes from 'prop-types';

function markerColor(selected, show) {
  let color = 'transparent';
  if (!show) {
    color = '#cccccc';
  }
  if (selected) {
    color = '#ffe0a7';
  }
  return color;
}
function Marker(props) {
  const style = {
    fontSize: '1.2em',
    backgroundColor: markerColor(props.selected, props.show),
  };
  return (
    <div role="button" tabIndex={props.index} style={style} onClick={props.selectionHandler}>
      <div>
        <span>{props.index}.
        </span>
        <input type="text" size="30" value={props.title} onChange={props.titleChangeHandler} />
      </div>
      <button onClick={props.toggleHandler}>Toggle</button>
      <button onClick={props.deleteHandler}>Delete</button>
      <button onClick={props.moveUpHandler}>Up</button>
      <button onClick={props.moveDownHandler}>Down</button>
    </div>
  );
}

Marker.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  selectionHandler: PropTypes.func.isRequired,
  titleChangeHandler: PropTypes.func.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  moveUpHandler: PropTypes.func.isRequired,
  moveDownHandler: PropTypes.func.isRequired,
};

export default Marker;
