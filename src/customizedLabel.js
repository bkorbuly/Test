import React from 'react';

class CustomizedLabel extends React.Component {    
  
  componentDidMount() {
    console.log('CustomizedLabel Component DidMount')
      this.props.getBarWidth(this.props.width)
    };

  componentDidUpdate(prevProps) {
    if(this.props.barWidths !== prevProps.barWidths){
    console.log('CustomizedLabel Component DidUpdate')
      this.props.getBarWidth(this.props.width)
    }
  }

    render(){
      const { x, y, width, height, value } = this.props;
      return (
        <g>
          <text x={x + width / 2} y={y + (height / 2)} fill="#000000" textAnchor="middle" dominantBaseline="middle" >
            {value.toFixed(2)}%
          </text>
        </g>
      );
    }
    
  };

  export default CustomizedLabel ;