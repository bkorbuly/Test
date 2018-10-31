import React from 'react';
import { data } from './data.js'

class BarSlider extends React.Component {   
    min = 90;
    max = this.props.width + this.props.x;
    conversionRate = this.props.value;
    circlePosition = this.props.x;
    isDraggable = false;
    eX = 0;

    state= { isDraggable: false,
             };

    consoling = () =>{
        console.log('$$$$$$$$')
        console.log('min', this.min)
        console.log('max', this.max)
        console.log('circleposition: ', this.circlePosition)
        console.log('conversionRate: ', this.conversionRate)
        console.log('props.x', this.props.x)
        console.log('props.width', this.props.width)
        console.log('eX', this.eX)
    }
    
    componentDidMount() {
        this.x = 0
        this.y = 0
        this.elem.addEventListener("mousemove", this.handleMouseMove)
        this.elem.addEventListener("mouseup", this.handleMouseUp)
      }
    
      componentWillUnmount() {
        this.elem.removeEventListener("mousemove", this.handleMouseMove)
        this.elem.removeEventListener("mouseup", this.handleMouseUp)
      }
    
      handleMouseUp = () => {
        this.setState({ isDraggable: false })
        
      };
    
      handleMouseDown = (e) => {        
        e.preventDefault()    
        const { left, top, width, height } = this.elem.getBoundingClientRect()    
        this.x = e.pageX - (left)
        //this.y = (top + height / 2) - e.pageY        
        this.setState({ isDraggable: true })
      };
    
      handleMouseMove = (e) => {
        if (this.state.isDraggable) {
          const { left, top, width, height } = this.elem.getBoundingClientRect()
    
          const x = e.pageX - (left)
          //const y = (top + height / 2) - e.pageY
    
          const dx = (x - this.x)
          //const dy = (y - this.y) / 100
          console.log("x", x)
          console.log("this.x", this.x)
          console.log("dx", dx)
          const dxInPercentage = (dx/width) * 100;
          console.log("dxInPercentage",dxInPercentage);
    
          this.x = x
          //this.y = y
          if (this.props.onChange) {
            console.log(this.props.value);
            console.log(dxInPercentage);
            console.log(this.props.value + dxInPercentage);
            let xValue = this.conversionRate + dxInPercentage
            //let yValue = this.props.value + dy
            
            if (xValue < 0) {
                xValue = 0
            }
            
            if (xValue > 100) {
                xValue = 100
            }

            console.log("MIVANMAR",xValue);
            
            //if (yValue < 0) {
            //  yValue = 0
            //}
            
            //if (yValue > 1) {
            //  yValue = 1
            //}
            this.conversionRate = xValue;
            this.props.onChange(this.conversionRate, this.props.index)            
          }
        }
      }

    render(){

        return (
            <g ref={ elem => this.elem = elem}>
                <rect fill="red" x={90} y={this.props.y + this.props.height * 1.3 - (this.props.height / 4) /2 } width={this.props.width + this.props.barWidth[this.props.index] } height={this.props.height / 4}
                />                
                <circle r={this.props.height / 4 / 2} fill="black" cx={this.circlePosition} cy={this.props.y + this.props.height * 1.3}
                onMouseDown={(e) => this.handleMouseDown(e)}        
                /> 
            </g>);

        if(this.props.barWidth){
           
        }
        else{
            return null;
        }
    }
};

export default BarSlider;