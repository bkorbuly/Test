import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Dot, LabelList, Line, ScatterChart } from 'recharts';
import CustomizedLabel from './CustomizedLabel.js';
import BarSlider from './BarSlider.js';
import ReactDOM from 'react-dom';

var roundedBars = (entry) => {
    return entry.red == 0 ? 15 : 0;
  }


class FunnelChart extends React.Component {       
    constructor(props){
        super(props);
    }

    state = {
            data: this.props.data,
            barWidths: [],
    }

    componentDidMount() {
        console.log('Mount:', this.props)
    }

    componentDidUpdate(prevProps){
        if(this.props.barWidths !== prevProps.barWidths){
            console.log('update', this.state.barWidths)
            this.setState({
                barWidths: this.props.barWidths
            }, () => console.log('update', this.state.barWidths), this.forceUpdate())
        }
    }
    
    onChanged = (conversionRate, i) => {
        console.log("gottcha");
        this.props.data[i].conversionRate = conversionRate
        this.props.onChanged(this.state.data[i])
    }

    getBarWidth = (width) => {
        this.setState(prevState => ({
            barWidths: prevState.barWidths.concat(width)
        }), () => console.log(this.state.barWidths));       
    }

    passBarWidth = () => {
        if(this.state.barWidths.length == 8){
            console.log('passing it to app.js');
            this.props.getBarWidth(this.state.barWidths);
        }
    }
    
    render(){
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
                        ref = {(c) => this.bar = c}
                        dataKey="green" fill="#80C25D" stackId="a" padding="0" margin="0" barSize={35}  >
                        {
                                this.props.data.map((entry, index) => (
                                    <Cell key={`greenCell-${index}`} radius={[0, roundedBars(entry), roundedBars(entry), 0]} />
                                    ),                                                                  
                                )
                        }                            
                            <LabelList dataKey="conversionRate" content={ <CustomizedLabel getBarWidth={this.getBarWidth} /> }  />                                                   
                        </Bar>
                        <Bar dataKey="red" fill="#C92E25" stackId="a" key="red" >
                        {
                                this.props.data.map((entry, index) => {
                                    return <Cell key={`redCell-${index}`} radius={[0, 15, 15, 0]}  />                                                                    
                                
                                }
                                )         
                        }
                            <LabelList dataKey='conversionRate' content={<BarSlider onChanged={this.onChanged} id={this.props.data.index} barWidth={this.state.barWidths} /> } />
                        </Bar>
                    </BarChart>           
                </ResponsiveContainer>                    
        );
    } 
};

export default FunnelChart;