import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunnelChart from './FunnelChart.js'

class App extends Component {
  render() {
    return (
      <div width="1500px" height="1500px">
        <FunnelChart />
      </div>
    );
  }
}

export default App;
