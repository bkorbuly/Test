import React from 'react';

var calculateDataBasedonConversionRate = (props, state) => {
    if(state.index == ''){
        return;
    }
    console.log(state.isMaxIndex);
    if(state.isMaxIndex){
        return;
    }
    console.log(props.data[state.index].green);
    console.log(state.conversionRate);
    console.log(props.data[state.index].green * state.conversionRate/100);
    console.log(1-state.conversionRate/100);
    if(state.index == 0){
        return { green: props.data[state.index].green * 1,
                red: 0 };
    }    
    return { green: props.data[state.index - 1].green * state.conversionRate/100,
            red: props.data[state.index - 1].green * (1-state.conversionRate/100)
    };
}

class AddLvlButton extends React.Component {
    state = { 
              name: '',
              green:'',
              red: '',
              index: '',
              conversionRate:'',
              isMaxIndex: false,

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
        //console.log('Before check index', this.state.index);
        //console.log('Before check isMaxIndex',this.state.isMaxIndex);
        //console.log('Before check datalength', this.props.datalength);
        //console.log('Before check :', this.state.index > this.props.datalength ? true : false);
        console.log('CheckIndex',this.upperLimitCheck());
        console.log('ture or false', ((this.state.index >= 0)  && (this.upperLimitCheck())));
        this.setState( {isMaxIndex:  ((this.state.index >= 0)  && (this.upperLimitCheck())) ? false : true
            //setState ASNYC
        }, () => this.handleConversionRate(), console.log('checkindex', this.state.isMaxIndex));
        
    }

    handleConversionRate = () => {
        //console.log('GOTTCA');
        //console.log(this.props.data);
        //console.log('Current value of index of state:', this.state.index);
        //console.log(this.props.data[this.state.index].green);
        //console.log('calclated percentage:', this.state.conversionRate/100);
        this.setState( calculateDataBasedonConversionRate(this.props, this.state),
            () => console.log('new calculated vale of green:', this.state.green));
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value = {this.state.name}
                    onChange = {(event) => this.setState({ name: event.target.value})}
                    placeholder = "Level Name" required />
                <input type="number" min="0" max="100"
                    value = {this.state.conversionRate}
                    onChange = {(event) => this.setState({ conversionRate: event.target.value})}
                    placeholder = "Conversion Rate(%)" required />
                <input type="number"
                    value = {this.state.green}
                    onChange = {(event) => this.setState({ green: event.target.value})}
                    placeholder = "Green Value" required />
                <input type="number"
                    value = {this.state.red}
                    onChange = {(event) => this.setState({ red: event.target.value})}
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