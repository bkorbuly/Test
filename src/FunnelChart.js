import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Dot, LabelList, Line, ScatterChart } from 'recharts';
import CustomizedLabel from './CustomizedLabel.js';
import BarSlider from './BarSlider.js';

var roundedBars = (entry) => {
    return entry.red == 0 ? 15 : 0;
  }


class FunnelChart extends React.Component {       
    constructor(props){
        super(props);
        console.log("FunnelChart constructor")
    }

    state = {
            data: this.props.data,
            barWidths: [],
    }

    componentDidMount() {
        console.log('FunnelChart Component DidMount:', this.props)
    }

    componentDidUpdate(prevProps){
        console.log('FunnelChart Component DidUpdate')
        if(this.props.barWidths !== prevProps.barWidths){
            this.setState({
                barWidths: this.props.barWidths
            }, () => this.forceUpdate())
        }
    }
    
    handleChange = (conversionRate, i) => {
      console.log("FunnelChart onChagned function invoked");
        this.state.data[i].conversionRate = conversionRate;
        this.props.onChanged(this.state.data[i])
    }

    getBarWidth = (width) => {
    //    console.log("FunnelChart getBarWidth width parameters value", width)
        this.setState(prevState => {
            let newArr = prevState.barWidths
            if(prevState.barWidths.length >= 8) {
                newArr = [];
            }            
      //      console.log("FunnelChart getBarWidth setState values(prevstate, newArr, width)", prevState, newArr, width);
            newArr.push(width);
     //       console.log("FunnelChart getBarWidth setState values after concat(newArr, width)", newArr, width);
            return{ barWidths: newArr }
        },);       
    }

    passBarWidth = () => {
        if(this.state.barWidths.length == 8){
 //           console.log('passing it to app.js');
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
                            <LabelList dataKey='conversionRate' content={<BarSlider onChange={this.handleChange} id={this.props.data.index} barWidth={this.state.barWidths} /> } />
                        </Bar>
                    </BarChart>           
                </ResponsiveContainer>                    
        );
    } 
};

export default FunnelChart;