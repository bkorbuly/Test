import React from 'react';

class EditLvlButton extends React.Component {
    state = { 
              name: '',
              green:'',
              red: '',
              index: '',
    }

    handleSubmit = (event) => {
        //TODO
        //validation
        //if(this.state.green > this.props.data.){
        //}
        event.preventDefault();
        console.log('Event: Submit Form', this.state.name, this.state.green, this.state.red, this.state.index);
        this.props.onSubmit(this.state);
        this.setState({name: '', green:'', red: '', index: ''})
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value = {this.state.name}
                    onChange = {(event) => this.setState({ name: event.target.value})}
                    placeholder = "Level Name" required />
                <input type="number"
                    value = {this.state.green}
                    onChange = {(event) => this.setState({ green: event.target.value})}
                    placeholder = "Green Value" required />
                <input type="number"
                    value = {this.state.red}
                    onChange = {(event) => this.setState({ red: event.target.value})}
                    placeholder = "Red Value" required />
                <input type="number" min='0'
                    value = {this.state.index}
                    onChange = {(event) => this.setState({ index: event.target.value})}
                    placeholder = "Index" required />
                <button type="submit">Edit Level</button>
            </form>
        )
    };
};

export default EditLvlButton;