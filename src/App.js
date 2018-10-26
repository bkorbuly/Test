import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { data } from './data.js'
import FunnelChart from './FunnelChart.js'
import AddLvlButton from './AddLvlButton.js';
import EditLvlButton from './EditLvlButton.js';
import RemoveLvlButton from './RemoveLvlButton.js';

var lvlObjectCreation = (lvlInfo) => {
      const lvl = {
      name: lvlInfo.name,
      green: lvlInfo.green,
      red: lvlInfo.red,
      conversionRate: lvlInfo.conversionRate,
      }
      return lvl;
}

class App extends Component {
  state = {
    data,
  };

  addNewLvl = (lvlInfo) =>{
    const lvl = lvlObjectCreation(lvlInfo);
    this.setState(prevState => {
        const newData = prevState.data.slice();
        newData.splice(lvlInfo.index, 0, lvl);       
        return {
          data : newData
        }    
    },() => this.reCalculating(), console.log(data));
  };

  editLvl = (lvlInfo) =>{
    console.log('',lvlInfo);
    const lvl = lvlObjectCreation(lvlInfo);
    console.log(lvl);
    this.setState(prevState => ({
          data : prevState.data.map((dataLvl, index) => index == lvlInfo.index ? lvl : dataLvl)      
          }
    ),() => this.reCalculating());
  };

  removeLvl = (lvlName) =>{
    console.log(lvlName);
    this.setState(prevState => ({
      data: prevState.data.filter(lvl => lvl.name.toLowerCase() !== lvlName.name.toLowerCase())
      }
    ),() => this.reCalculating());
  };

  reCalculating = () => {
    console.log('Recalculating the whole chart');
    this.setState( prevState => ({
        data: prevState.data.map((lvl, index, arr) => {
        if(index != 0){
          lvl.green = arr[index - 1].green * (lvl.conversionRate/100);
          lvl.red = arr[index - 1].green * (1 - lvl.conversionRate/100);
        }
        return lvl
        }      
    )}), () => console.log(this.state.data))   
  };

  render() {
    return (
      <div width="1000px" height="1500px">
        <h1>Funnel Calculator</h1>
        <FunnelChart data={this.state.data} onChanged={this.editLvl} getBarWidth={this.getBarWidth} barWidths={this.state.barWidths}/>
        <AddLvlButton onSubmit={this.addNewLvl} datalength={this.state.data.length} data={this.state.data} />
        <EditLvlButton onSubmit={this.editLvl} datalength={this.state.data.length} />
        <RemoveLvlButton onSubmit={this.removeLvl} />
      </div>
    );
  }
}

export default App;
