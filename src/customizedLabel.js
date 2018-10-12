import React from 'react';

const handleClick = (element) => {
  console.log('Gottcha!!!!', element);
}

const customizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <text x={x + width / 2} y={y + (height / 2)} fill="#000000" textAnchor="middle" dominantBaseline="middle" onClick={(element)=> handleClick(element)}>
          {value}
        </text>
      </g>
    );
  };

  export default customizedLabel ;