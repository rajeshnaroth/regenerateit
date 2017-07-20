import React from 'react';

function Marker(props) {
  const style={
    fontSize:'1.2em',
    backgroundColor: (props.selected ? '#ffe0a7' : 'transparent')
  }
  return(
    <div style={style} onClick={props.selectionHandler}>
      <div>
        <span>{props.index}. </span>
        <input type="text" size="30" value={props.title} onChange={props.titleChangeHandler} />
      </div>
      <button onClick={props.toggleHandler}>Toggle</button>
      <button onClick={props.deleteHandler}>Delete</button>
      <button onClick={props.moveUpHandler}>Up</button>
      <button onClick={props.moveDownHandler}>Down</button>
    </div>
  )
}

export default Marker;
