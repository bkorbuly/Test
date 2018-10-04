import React from 'react';
import * as ReCharts from 'recharts';

const {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} = ReCharts;

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

const FunnelChart = (props) => {
    return(
        //<ResponsiveContainer>
            <BarChart width={1200} height={600} data={data}
                      barGap="0"
                      barCategoryGap="0"
                      layout="vertical"
                      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <CartesianGrid visibility="hidden" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" stackId="a" />
                <Bar dataKey="uv" fill="#82ca9d" stackId="a" />
            </BarChart>           
        //</ResponsiveContainer>
    );
};

export default FunnelChart;