import React from 'react';

const handleClick = (element) => {
  console.log('Gottcha!!!!', element);
}

class BarSlider extends React.Component {
    state = {
        percentage: this.props.value,
        min: 0,
        max: 100
    }

    handleChange = () => {
        this.props.onChange(this.state)
    }

    handleMouseDown(e) {
        console.log('MouseDown');
        this.setState({ isDragging: true });
        e.stopPropagation();
        e.preventDefault();
    }

    handleMouseUp(e) {
        console.log('MouseUP');
        this.setState({ isDragging: false });
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        return (
        <g onChange={this.handleChange}>
            <text x={this.props.x + this.props.width} y={this.props.y + (this.props.height / 2)} fill="#000000" textAnchor="middle" dominantBaseline="middle" 
            //onClick={(element)=> handleClick(element)}
            onMouseDown={(e) => this.handleMouseDown(e)}
            onMouseUp={(e) => this.handleMouseUp(e)}         
            >
            {this.state.percentage}
            </text>
        </g>
        );
    }
  };

  export default BarSlider;