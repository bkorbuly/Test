import React from 'react';
import {BarChart,
        Bar,
        XAxis,
        YAxis,
        ResponsiveContainer,
        CartesianGrid,
        Tooltip,
        Cell,
        Legend,
        LabelList} from "recharts";
import { data } from './data';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import './barChart.post.css';

const colors = scaleOrdinal(schemeCategory10).range();


const FunnelChart = (props) => {
    return(
        <div className="bar-chart-wrapper">
        <ResponsiveContainer>
        <BarChart data={data} maxBarSize={10} margin={{ top: 25 }}>
            <XAxis type="number" dataKey="time" />
            <YAxis type="number" />
            <CartesianGrid />
            <Tooltip />
            <Bar dataKey="uv" maxBarSize={15} isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
              <LabelList position="top" />
            </Bar>
        </BarChart>
        </ResponsiveContainer>
        </div>        
    )
} 

export default FunnelChart;