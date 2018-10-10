import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Dot, LabelList, Line, ScatterChart } from 'recharts';
import customizedLabel from './customizedLabel.js';
import BarSlider from './BarSlider.js';


const handleClick = (element) => {
    console.log('Gottcha!!!!', element);
}

var roundedBars = (entry) => {
    return entry.red == 0 ? 15 : 0;
  }

const FunnelChart = (props) => {    
    return(
            <ResponsiveContainer width = "95%" height={500}>
                <BarChart data={props.data}
                          barCategoryGap="5"
                          layout="vertical"
                          margin={{top: 0, right: 0, left: 30, bottom: 0}}
                          >
                    <CartesianGrid visibility="hidden" />                    
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" margin={{top: 100}}/>
                    //<Tooltip cursor={false}/>
                    <Legend />
                    <Bar dataKey="green" fill="#80C25D" stackId="a" padding="50" margin="0" onTouchMove={(element)=> handleClick(element)}>
                       {
                            props.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} radius={[0, roundedBars(entry), roundedBars(entry), 0]} />
                                
                            ))
                       }                        
                        <LabelList dataKey="conversionRate" content={ customizedLabel }  />
                        <LabelList dataKey="conversionRate"content={ <BarSlider />  }  />
                    </Bar>                    
                    <Bar dataKey="red" fill="#C92E25" stackId="a" radius={[0, 15, 15, 0]} />
                </BarChart>           
            </ResponsiveContainer>
        ); 
};

export default FunnelChart;