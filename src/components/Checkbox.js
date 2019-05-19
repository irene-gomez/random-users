import React from 'react';

class Checkbox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <input type="checkbox" name={this.props.name} id={this.props.id}/>
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </React.Fragment>
        );
    }
}

export default Checkbox;