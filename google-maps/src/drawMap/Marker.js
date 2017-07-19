import React from 'react';

function Marker(props) {
  const style={
    backgroundColor: (props.selected ? '#ffe0a7' : 'transparent')
  }
  return(
    <div style={style} onClick={props.selectionHandler}>
      <span>{props.index}. </span>
      <input type="text" value={props.title} onChange={props.titleChangeHandler} />
      <button onClick={props.toggleHandler}>Toggle</button>
      <button onClick={props.deleteHandler}>Delete</button>
    </div>
  )
}

export default Marker;
