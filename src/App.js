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
    currentLvlIndex : 0,
  };
  constructor(props){
    super(props);
    console.log("App.js consturctor")
  }

  componentDidUpdate(){
    console.log("App.js componentDidUpdate")
  }

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
    console.log("sss")
    const lvl = lvlObjectCreation(lvlInfo);
    this.setState(prevState => ({
          data : prevState.data.map((dataLvl, index) => index == lvlInfo.index ? lvl : dataLvl)      
          }
    ),() => this.reCalculating());
  };

  removeLvl = (lvlName) =>{
    this.setState(prevState => ({
      data: prevState.data.filter(lvl => lvl.name.toLowerCase() !== lvlName.name.toLowerCase())
      }
    ),() => this.reCalculating());
  };

  reCalculating = () => {
    console.log("itt vavy")
    this.setState( prevState => ({
        data: prevState.data.map((lvl, index, arr) => {
        if(index != 0){
          lvl.green = arr[index - 1].green * (lvl.conversionRate/100);
          lvl.red = arr[index - 1].green * (1 - lvl.conversionRate/100);
        }
        return lvl
        }      
    )}))   
  };

  handleClick = (i) => {
    this.setState({
      currentLvlIndex : i
    })
    
  }

  render() {
    return (
      <div width="500px" height="1500px">
        <h1>Funnel Calculator</h1>
        <FunnelChart data={this.state.data} onChanged={this.editLvl} getBarWidth={this.getBarWidth} barWidths={this.state.barWidths} getClickedBarIndex={this.handleClick} />
        <AddLvlButton onChange={this.editLvl} datalength={this.state.data.length} data={this.state.data} buttonName={"Edit"} currentLvlIndex={this.state.currentLvlIndex} key={this.state.currentLvlIndex}/>
        <EditLvlButton onSubmit={this.editLvl} datalength={this.state.data.length}  />
        <RemoveLvlButton onSubmit={this.removeLvl} />
      </div>
    );
  }
}

export default App;
