import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunnelChart from './FunnelChart.js'
import AddLvlButton from './AddLvlButton';
import RemoveLvlButton from './RemoveLvlButton';

const data = [
  {name: 'Market', green: 4000, red: 2400, },
  {name: 'Aware', green: 3000, red: 1398, },
  {name: 'Trust', green: 2000, red: 9800, },
  {name: 'Requested Card', green: 2780, red: 3908, },
  {name: 'Received Card', green: 1890, red: 4800, },
  {name: 'Activated Card', green: 2390, red: 3800, },
  {name: 'Using MC Card', green: 3490, red: 4300, },
  {name: 'Using MC Card 3+/Month', green: 3490, red: 4300, },
  ];

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
      data: prevState.data.filter(lvl => lvl.name !== lvlName.name)
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
