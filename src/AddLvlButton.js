import React from 'react';

var calculateDataBasedOnConversionRate = (props, state) => {
    if(state.index == '') { return }
    if(state.isMaxIndex) { return }
    if(state.index == 0){
        return { green: props.data[state.index].green * 1,
                red: 0 };
    }    
    return { green: props.data[state.index - 1].green * state.conversionRate/100,
            red: props.data[state.index - 1].green * (1-state.conversionRate/100)
    };
}

var calculateDataBasedOnGreen = (props, state) => {
    console.log(props);
    if(state.index == '') { return }
    if(state.isMaxIndex) { return }
    if(state.red == '' || state.red == 0) {
        return { conversionRate: (props.data[state.index].green/(props.data[state.index].green + 0))*100,}
    }
}

var calculateValue = {
    conversionRate: (props, state) => calculateDataBasedOnConversionRate(props, state),
    green: (props, state) => calculateDataBasedOnGreen(props, state),
    //{id:"red", handler:''},
};

class AddLvlButton extends React.Component {
    state = { 
              name: '',
              green:'',
              red: '',
              index: '',
              conversionRate:'',
              isMaxIndex: false,
              eventTargetId:'',
    }
    
    upperLimitCheck = () => {
        return this.state.index  < this.props.datalength
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Submit Form', this.state.name, this.state.green, this.state.red, this.state.index, this.state.conversionRate);
        this.props.onSubmit(this.state);
        this.setState({name: '', green:'', red: '', index: '', conversionRate:'',})
    }

    checkIndex = () => {
        this.setState( {isMaxIndex:  ((this.state.index >= 0)  && (this.upperLimitCheck())) ? false : true
            //setState ASNYC
        }, () => this.handleConversionRate());
        
    }

    handleConversionRate = () => {
        this.setState(calculateValue[this.state.eventTargetId](this.props, this.state));
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
                <input type="number" min='0' max={this.props.datalength}
                    value = {this.state.index}
                    onChange = {(event) => this.setState({ index: event.target.value}, () => this.checkIndex())}
                    placeholder = "Index" required />
                <button type="submit" disabled={this.state.isMaxIndex}>Add new Level</button>
            </form>
        )
    };
};

export default AddLvlButton;