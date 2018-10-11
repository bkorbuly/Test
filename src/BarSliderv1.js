import React from 'react';

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
            console.log('xdistance', this.state.xDistance);
            console.log('eclintX', e.clintX);          
          let xMovment = ( e.clientX );
            console.log('XDISTANCE variable', this.state.xDistance)
          if (xMovment < this.state.min) xMovment = this.props.x;
          if (xMovment > this.state.max) xMovment = this.props.width;
    
          this.setState({ xDistance: xMovment },() => console.log('xdistance', this.state.xDistance))
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        console.log(this.props);
        return (
        <g ref={c => { this.rootDOM = c; } } width={150}>
            <text x={this.state.xDistance} y={this.props.y + (this.props.height / 2)} fill="#000000" textAnchor="middle" dominantBaseline="middle"
            height={this.props.height} width={150}
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