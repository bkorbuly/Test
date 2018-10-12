import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Dot, LabelList, Line, ScatterChart } from 'recharts';
import customizedLabel from './customizedLabel.js';
import BarSlider from './BarSlider.js';
import ReactDOM from 'react-dom';

var roundedBars = (entry) => {
    return entry.red == 0 ? 15 : 0;
  }


class FunnelChart extends React.Component {       
    constructor(props){
        super(props);
        this.rootDOM;
    }
    state = {
            data: this.props.data,
    }

    componentDidMount() {
        console.log('mounted');
        var node = ReactDOM.findDOMNode(this.rootDOM);
        console.log(node);
    }
    
    onChanged = (conversionRate, i) => {
        console.log("gottcha");
        this.props.data[i].conversionRate = conversionRate
        this.props.onChanged(this.state.data[i])
    }
    
    render(){
        console.log('!!!!!!!!!!!!!', this.rootDOM)
        return(
                <ResponsiveContainer width = "95%" height={500}>
                    <BarChart data={this.props.data}
                            barCategoryGap="5"
                            layout="vertical"
                            margin={{top: 0, right: 0, left: 30, bottom: 0}}
                            >
                        <CartesianGrid visibility="hidden" />                    
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" margin={{top: 100}}/>
                        <Legend />                      
                        
                        <Bar
                            ref={(c) => this.rootDOM = c}
                        dataKey="green" fill="#80C25D" stackId="a" padding="0" margin="0" barSize={35}  >
                        {
                                this.props.data.map((entry, index) => {
                                    return(
                                    <Cell key={`greenCell-${index}`} radius={[0, roundedBars(entry), roundedBars(entry), 0]}   />,
                                    console.log(this.elem, this.rootDOM))},                                                                  
                                    
                                )
                        }                            
                            <LabelList dataKey="conversionRate" content={ customizedLabel }   />                                                   
                        </Bar>
                        <Bar dataKey="red" fill="#C92E25" stackId="a" key="red" >
                        {
                            
                                this.props.data.map((entry, index) => (
                                    <Cell key={`redCell-${index}`} radius={[0, 15, 15, 0]}  />                                                                    
                                    )
                                )
                                     
                        }
                            <LabelList dataKey='conversionRate' content={<BarSlider onChanged={this.onChanged}/> } id={this.props.data.index}  /> 
                        </Bar>
                        <BarSlider></BarSlider>
                    </BarChart>           
                </ResponsiveContainer>
        );
    } 
};

export default FunnelChart;