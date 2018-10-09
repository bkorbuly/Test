import React from 'react';
import * as ReCharts from 'recharts';


const {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} = ReCharts;

const handleClick = (element) => {
    console.log('Gottcha!!!!', element);
}

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
    console.log(props);
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      </g>
    );
  };

var roundedBars = (entry) => {
    console.log('Toucheee');
    console.log(entry);
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
                    <Tooltip cursor={false}/>
                    <Legend />
                    <Bar dataKey="green" fill="#80C25D" stackId="a" padding="50" margin="0" onClick={(element)=> handleClick(element)}>
                       {
                            props.data.map((entry, index) => (
                                <ReCharts.Cell cursor="pointer" key={`cell-${index}`} radius={[0, roundedBars(entry), roundedBars(entry), 0]} />
                         ))
                        }
                        <ReCharts.LabelList dataKey="conversionRate" content={renderCustomizedLabel} />
                    </Bar>
                    <Bar dataKey="red" fill="#C92E25" stackId="a" radius={[0, 15, 15, 0]} />
                </BarChart>           
            </ResponsiveContainer>
            //<Bar dataKey="Red" fill="#8884d8" stackId="a" />
        ); 
};

export default FunnelChart;