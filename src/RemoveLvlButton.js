import React from 'react';

class RemoveLvlButton extends React.Component {
    state = { name: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Submit Form', this.state.name,);
        this.props.onSubmit(this.state);
        this.setState({name: '',})
    };

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value = {this.state.name}
                    onChange = {(event) => this.setState({ name: event.target.value})}
                    placeholder = "Level Name" required />
                <button type="submit">Remove Level</button>
            </form>
        )
    };
};

export default RemoveLvlButton;