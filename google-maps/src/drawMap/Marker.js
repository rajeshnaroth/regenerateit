import React from 'react';

function Marker(props) {
  return(
    <li>
      <span>{props.index}. </span>
      <span>{props.title}</span>
      <input type="text" value={props.title} onChange={props.titleChangeHandler} />
      <a href="#" onClick={props.hideHandler}>Hide </a>
      <a href="#" onClick={props.showHandler}>Show </a>
      <a href="#" onClick={props.deleteHandler}>Delete </a>
    </li>
  )
}

export default Marker;
