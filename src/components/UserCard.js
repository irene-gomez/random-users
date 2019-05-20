import React from 'react';
import './UserCard.css';


class UserCard extends React.Component {
    render(){
        return(
            <div className="card">
                <img className="card__img" src= {this.props.img} alt=""/>
                <div>
                    <p className="card__name">{this.props.name}</p>
                    <p className="card__city">{this.props.city}</p>
                    <p className="card__age">{this.props.age}</p>
                </div>
            </div>
        );
    }
}

export default UserCard;