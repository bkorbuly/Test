import React from 'react';

const handleClick = (element) => {
  console.log('Gottcha!!!!', element);
}

class BarSlider extends React.Component {
    state = {
        percentage: this.props.value,
        min: this.props.x, 
        max: this.props.width,
        data: this.props.data,
        isDragging: false,
        xDistance: this.props.x + this.props.width,
        totalGreen: this.props.x + this.props.width,
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

    handleMouseMove(e) {        
        if (this.state.isDragging) {
            console.log('xdistance', xDistance);
          
          let xDistance = ( e.clientX );
          if (xDistance < this.state.min) xDistance = this.props.x;
          if (xDistance > this.state.max) xDistance = this.props.width;
    
          this.setState({ xDistance },() => console.log('xdistance', xDistance));
          
          //if (onChange) onChange(xDistance);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        console.log(this.props);
        return (
        <g ref={c => { this.rootDOM = c; } } >
            <text x={this.state.xDistance} y={this.props.y + (this.props.height / 2)} fill="#000000" textAnchor="middle" dominantBaseline="middle" height={this.props.height} width={50}
            onMouseDown={(e) => this.handleMouseDown(e)}
            onMouseUp={(e) => this.handleMouseUp(e)}
            onMouseMove={(e) => this.handleMouseMove(e)}
            onChange={(e) => this.setState({xDistance: e.target.value},() => this.props.onChange())}         
            >
            {Math.round(this.state.xDistance / this.state.totalGreen *100)}
            </text>
        </g>
        );
    }
  };

  export default BarSlider;