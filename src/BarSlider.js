import React from 'react';

class BarSlider extends React.Component{   
    constructor(props){
        super(props);
        this.state.circlePosition = this.props.x + (this.props.width) * (this.props.value / 100)
        console.log(this.state.circlePosition);
    }

    state = {
        min:this.props.x,
        max:this.props.width + this.props.x,
        conversionRate: this.props.value,
        circlePosition: '',
    }

    handleMouseDown = (e) =>{
        console.log('MouseDown');
        this.setState({ isDragging: true }, () => console.log(this.state.isDragging));
        e.stopPropagation();
        e.preventDefault();
    }

    handleMouseUp(e) {
        console.log('MouseUP');
        this.setState({ isDragging: false }, () => console.log(this.state.isDragging));
        e.stopPropagation();
        e.preventDefault();
    }

    handleMouseMove(e) {        
        if (this.state.isDragging) {
            console.log('eclintX', e.clintX);          
          let newCirclePosition = ( e.clientX );
          if (newCirclePosition < this.state.min) newCirclePosition = this.props.x;
          if (newCirclePosition > this.state.max) newCirclePosition = this.props.width + this.props.x;
    
          this.setState({ circlePosition: newCirclePosition, conversionRate: (this.state.circlePosition - this.state.min) / (this.state.max - this.state.min) * 100 }, console.log(this.state.conversionRate))
          console.log(this.props);
          this.props.onChanged(this.state.conversionRate, this.props.index);
        }
        
        e.stopPropagation();
        e.preventDefault();
    }
        

    render() {
        return (
            <g>
               <rect fill="red" x={this.props.x} y={this.props.y + this.props.height / 2 - 5 } width={this.props.width} height={10}
               onMouseDown={(e) => this.handleMouseDown(e)}
               onMouseUp={(e) => this.handleMouseUp(e)}
               onMouseMove={(e) => this.handleMouseMove(e)}
               />                
               <circle r={5} fill="black" cx={this.state.circlePosition} cy={this.props.y + this.props.height / 2}
               onMouseUp={(e) => this.handleMouseUp(e)}
               onMouseDown={(e) => this.handleMouseDown(e)}
               /> 
            </g>

        );
    }
};

export default BarSlider;