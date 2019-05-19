import React from 'react';
import Checkbox from './components/Checkbox';
import UserCard from './components/UserCard';
// import { fetch } from './utils/DataAPI';
import './App.css';
import { arrayExpression } from '@babel/types';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                cities: [],
                genders: []
            },
            userData: [],
            filtersData: {
                allCities: [],
                allGenders: []
            }
        };
        this.getData = this.getData.bind(this);
        this.getFiltersFromData = this.getFiltersFromData.bind(this);
    }

    getData() {
        fetch('https://randomuser.me/api/?results=50')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userData: data.results
                });
            });
    }
    getFiltersFromData() {
        this.setState(prevState => {
            const gendersFromData = this.state.userData.map(
                item => item.gender
            );
            const uniqueGenders = gendersFromData.filter(
                (item, index) => gendersFromData.indexOf(item) === index
            );

            const citiesFromData = this.state.userData.map(
                item => item.location.city
            );
            const uniqueCities = citiesFromData.filter(
                (item, index) => citiesFromData.indexOf(item) === index
            );

            return {
                filtersData: {
                    allCities: uniqueCities,
                    allGenders: uniqueGenders
                }
            };
        });
    }

    render() {
        const { filtersData, userData } = this.state;
        return (
            <div className="App">
                <button onClick={this.getData}>Get data</button>
                <button onClick={this.getFiltersFromData}>Get Genders</button>
                <form>
                    <fieldset>
                        {filtersData.allGenders.map((gender, index) => (
                            <Checkbox
                                id={`checkGenders${index}`}
                                key={index}
                                name="gender"
                                label={gender}
                            />
                        ))}
                    </fieldset>
                    <fieldset>
                        {filtersData.allCities.map((cities, index) => (
                            <Checkbox
                                id={`checkCities${index}`}
                                key={index}
                                name="cities"
                                label={cities}
                            />
                        ))}
                    </fieldset>
                    <ul>
                        {userData.map((user, index) => (
                            <UserCard
                                img={user.picture.thumbnail}
                                name={`${user.name.first} ${user.name.last}`}
                                city={user.location.city}
                                age={user.registered.age}
                                key={index}
                            />
                        ))}
                    </ul>
                </form>
            </div>
        );
    }
}

export default App;
