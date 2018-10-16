import React from 'react';

var calculateDataBasedOnConversionRate = (props, state) => {
    if(state.index == '') { return }
    if(!state.isOutOfIndex) { return }
    if(state.index == 0){
        return { green: props.data[state.index].green * 1,
                red: 0 };
    }    
    return { green: Math.round(props.data[state.index - 1].green * state.conversionRate/100),
            red: Math.round(props.data[state.index - 1].green * (1-state.conversionRate/100))
    };
}

var calculateDataBasedOnGreen = (props, state) => {
    if(state.index == '') { return }
    if(!state.isOutOfIndex) { return }
    console.log(state.green, (props.data[state.index - 1].green), state.green > (props.data[state.index - 1].green) );
    if((state.green > (props.data[state.index - 1].green)) || (state.green < 0)) {console.log(state.green, (props.data[state.index - 1].green)); return }
    if(state.red == '' || state.red == 0 ) {
        return { conversionRate: Math.round((state.green / (props.data[state.index - 1].green)) * 100),
                 red: ((props.data[state.index - 1].green) - state.green ) 
    }}
    return {
        conversionRate: Math.round((state.green / ((props.data[state.index].red + props.data[state.index].green)) * 100)),
        red: ((props.data[state.index - 1].green) - state.green)
    }
}

//Make a common function for basedonred and for basedon green
var calculateDataBasedOnRed = (props, state) => {
    let total;
    if(state.index == 0) { total = props.data[0].green }
    else { total = props.data[state.index - 1].green};
    console.log(total);
    if(state.index == '') { return }
    if(!state.isOutOfIndex) { return }
    if(state.red > (total) || state.red < 0) { return }
    if(state.green == '' || state.green == 0 ) {
        console.log('green == 0')
        return { conversionRate: Math.round((state.green / (total)) * 100),
                 green: (total - state.red ) 
    }}
    return {
        conversionRate: Math.round(( (total - state.red) / ((total)) * 100)),
        green: (total - state.red)
    }
}

var setDataBasedOnIndex = (props, state) => {
    return{
        green:props.data[state.index].green,
        red:props.data[state.index].red,
        name:props.data[state.index].name,
        conversionRate:props.data[state.index].conversionRate,
    }
}

var calculateValue = {
    conversionRate: (props, state) => calculateDataBasedOnConversionRate(props, state),
    green: (props, state) => calculateDataBasedOnGreen(props, state),
    red: (props, state) => calculateDataBasedOnRed(props, state),
    index: (props, state) => setDataBasedOnIndex(props, state),
};

class AddLvlButton extends React.Component {
    state = { 
              name: '',
              green:'',
              red: '',
              index: '',
              conversionRate:'',
              isOutOfIndex: false,
              eventTargetId:'',
    }
    
    upperLimitCheck = () => {
        return this.state.index < this.props.data.length
    };

    lowerLimitCheck = () => {
        return this.state.index >= 0
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Submit Form', this.state.name, this.state.green, this.state.red, this.state.index, this.state.conversionRate);
        this.props.onSubmit(this.state);
        this.setState({name: '', green:'', red: '', index: '', conversionRate:'',})
    }

    checkIndex = () => {
        this.setState( {isOutOfIndex:  (this.lowerLimitCheck())  && (this.upperLimitCheck()) ? true : false
            //setState ASNYC
        }, () => this.handleConversionRate())
    }

    handleConversionRate = () => {
        
        console.log(this.state.isOutOfIndex)
        if(this.state.isOutOfIndex){
            this.setState(calculateValue[this.state.eventTargetId](this.props, this.state));
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value = {this.state.name}
                    id="lvlName"
                    onChange = {(event) => this.setState({ name: event.target.value})}
                    placeholder = "Level Name" required />
                <input type="number" min="0" max="100"
                    value = {this.state.conversionRate}
                    id="conversionRate"
                    onChange = {(event) => this.setState({ conversionRate: event.target.value, eventTargetId: event.target.getAttribute('id')}, () => this.handleConversionRate())}
                    placeholder = "Conversion Rate(%)" required />
                <input type="number"
                    value = {this.state.green}
                    id="green"
                    onChange = {(event) => this.setState({ green: event.target.value, eventTargetId: event.target.getAttribute('id')}, () => this.handleConversionRate())}
                    placeholder = "Green Value" required />
                <input type="number"
                    value = {this.state.red}
                    id="red"
                    onChange = {(event) => this.setState({ red: event.target.value, eventTargetId: event.target.getAttribute('id')}, () => this.handleConversionRate())}
                    placeholder = "Red Value" required />
                <input type="number" min='0' max={this.props.datalength - 1}
                    value = {this.state.index}
                    id="index"
                    onChange = {(event) => this.setState({ index: event.target.value, eventTargetId: event.target.getAttribute('id')}, () => this.checkIndex())}
                    placeholder = "Index" required />
                <button type="submit" disabled={!this.state.isOutOfIndex}>Add new Level</button>
            </form>
        )
    };
};

export default AddLvlButton;