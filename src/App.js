import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data } from './data.js'
import FunnelChart from './FunnelChart.js'
import AddLvlButton from './AddLvlButton';
import RemoveLvlButton from './RemoveLvlButton';



class App extends Component {
  state = {
    data
  };

  addNewLvl = (lvlInfo) =>{
    console.log(lvlInfo);
    this.setState(prevState => ({
      data: prevState.data.concat(lvlInfo)
    }));
    console.log(this.state.data);
  };

  removeLvl = (lvlName) =>{
    console.log(lvlName);
    this.setState(prevState => ({
      data: prevState.data.filter(lvl => lvl.name.toLowerCase() !== lvlName.name.toLowerCase())
    }));
  };

  render() {
    return (
      <div width="1500px" height="1500px">
        <h1>Funnel Calculator</h1>
        <FunnelChart data={this.state.data}/>
        <AddLvlButton onSubmit={this.addNewLvl}/>
        <RemoveLvlButton onSubmit={this.removeLvl} />
      </div>
    );
  }
}

export default App;
