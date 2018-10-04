import React from 'react';
import * as ReCharts from 'recharts';

const {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} = ReCharts;

const FunnelChart = (props) => {
        return(
            //<ResponsiveContainer>
                <BarChart width={1200} height={600} data={props.data}
                          barGap="0"
                          barCategoryGap="0"
                          layout="vertical"
                          margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid visibility="hidden" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="green" fill="#82ca9d" stackId="a" />
                    <Bar dataKey="red" fill="#FFa9a" stackId="a" />
                </BarChart>           
            //</ResponsiveContainer>
            //<Bar dataKey="Red" fill="#8884d8" stackId="a" />
        ); 
};

export default FunnelChart;