import React from 'react';

const BarSlider = (props) => {   

    const min = props.x;
    const max = props.width + props.x;
    let conversionRate = props.value;
    let circlePosition = props.x + (props.width) * (props.value / 100);
    let isDragging = false;
    let eX = 0;   

    const consoling = () =>{
        console.log('$$$$$$$$')
        console.log('min', min)
        console.log('max', max)
        console.log('circleposition: ',circlePosition)
        console.log('conversionRate: ',conversionRate)
    }    

    const handleMouseDown = (e) =>{
        isDragging = true;
        e.stopPropagation();
        e.preventDefault();
    }

    const handleMouseUp = (e) => {
        isDragging= false;
        e.stopPropagation();
        e.preventDefault();
    }

    const handleMouseMove = (e) => {        
        if (isDragging) {          
          let newCirclePosition = ( eX );
          if (newCirclePosition < min) newCirclePosition = min;
          if (newCirclePosition > max) newCirclePosition = max;
          circlePosition = newCirclePosition
          conversionRate = ((circlePosition - min) / ((max - min)) * 100 )
          consoling();
          props.onChanged(conversionRate, props.index);
          e.stopPropagation();
          e.preventDefault();
        }        
    }
        if(props.barWidth){
            return (<g>
                <rect fill="red" x={90} y={props.y + props.height * 1.3 - (props.height / 4) /2 } width={props.width + props.barWidth[props.index] } height={props.height / 4}
                onMouseDown={(e) => handleMouseDown(e)}
                onMouseUp={(e) => handleMouseUp(e)}
                onMouseMove={(e) => (handleMouseMove(e), eX = e.clientX)}
                />                
                <circle r={props.height / 4 / 2} fill="black" cx={circlePosition} cy={props.y + props.height * 1.3}
                onMouseUp={(e) => handleMouseUp(e)}
                onMouseDown={(e) => handleMouseDown(e)}
                /> 
            </g>);
        }
        else{
            return null;
        }
        
    
};

export default BarSlider;