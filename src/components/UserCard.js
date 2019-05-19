import React from 'react';

class UserCard extends React.Component {
    render(){
        return(
            <div>
                <img src= {this.props.img} alt=""/>
                <h2>{this.props.name}</h2>
                <p>{this.props.city}</p>
                <p>{this.props.age}</p>
            </div>
        );
    }
}

export default UserCard;