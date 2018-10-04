import React from 'react';

class AddLvlButton extends React.Component {
    state = { name: '',
              green:'',
              red: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Submit Form', this.state.name, this.state.green, this.state.red,);
        this.props.onSubmit(this.state);
        this.setState({name: '', green:'', red: ''})
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
                <button type="submit">Add new Level</button>
            </form>
        )
    };
};

export default AddLvlButton;