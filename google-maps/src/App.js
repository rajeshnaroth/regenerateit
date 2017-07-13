import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Mapper from './drawMap/Mapper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Mapper />
      </div>
    );
  }
}

export default App;
