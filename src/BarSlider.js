import React from 'react';

const BarSlider = (props) => {   

    const min = props.x;
    const max = props.width + props.x;
    let conversionRate = props.value;
    let circlePosition = props.x + (props.width) * (props.value / 100);
    let isDragging = false;
    let eX = 0;   
    
    console.log();
    const consoling = () =>{
        console.log('$$$$$$$$')
        console.log('min', min)
        console.log('max', max)
        console.log('circleposition: ',circlePosition)
        console.log('conversionRate: ',conversionRate)
    }
    

    const handleMouseDown = (e) =>{
        isDragging = true;
        console.log(isDragging);
        e.stopPropagation();
        e.preventDefault();
    }

    const handleMouseUp = (e) => {
        isDragging= false;
        console.log(isDragging);
        e.stopPropagation();
        e.preventDefault();
    }

    const handleMouseMove = (e) => {        
        if (isDragging) {          
          let newCirclePosition = ( eX );
          console.log(newCirclePosition)
          consoling();
          
          if (newCirclePosition < min) newCirclePosition = min;
          if (newCirclePosition > max) newCirclePosition = max;
          console.log(newCirclePosition)
          circlePosition = newCirclePosition
          console.log('/////////')
          console.log('circlePostion - min: ',circlePosition, min, circlePosition-min)
          console.log('max, min, max-min: ', max, min, max-min)
          console.log('calculating new converesion rate:', ((circlePosition - min) / (max - min)) * 100 )
          console.log('/////////')
          conversionRate = ((circlePosition - min) / ((max - min)) * 100 )
          consoling();
          props.onChanged(conversionRate, props.index);
          e.stopPropagation();
          e.preventDefault();
        }        
    }

    return (
        <g>
            <rect fill="red" x={props.x} y={props.y + props.height / 0.77 - 5 } width={props.width} height={10}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseMove={(e) => (handleMouseMove(e), eX = e.clientX)}
            />                
            <circle r={5} fill="black" cx={circlePosition} cy={props.y + props.height / 0.77}
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            /> 
        </g>
    );
};

export default BarSlider;