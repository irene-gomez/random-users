import React from 'react';
import './Checkbox.css';

class Checkbox extends React.Component {
    render() {
        return (
            <div>
                <input 
                    type="checkbox" 
                    className="input__check"
                    name={this.props.name} 
                    id={this.props.id}
                    value={this.props.value}
                    onClick={this.props.listener}
                />
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        );
    }
}

export default Checkbox;