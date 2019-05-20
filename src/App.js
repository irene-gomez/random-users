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
        this.getData();
        this.getFiltersFromData = this.getFiltersFromData.bind(this);
        this.pushDataFilterGender = this.pushDataFilterGender.bind(this);
        this.pushDataFilterCities = this.pushDataFilterCities.bind(this);
    }

    getData() {
        fetch('https://randomuser.me/api/?results=50')
            .then(res => res.json())
            .then(data => {
                this.setState(prevState => {
                    return {
                        userData: data.results
                    }
                });
            });
    }

    getFiltersFromData() {
        this.setState(() => {
            const gendersFromData = this.state.userData.map(item => item.gender);
            const uniqueGenders = gendersFromData.filter((item, index) => 
                gendersFromData.indexOf(item) === index
            );

            const citiesFromData = this.state.userData.map(item => item.location.city);
            const uniqueCities = citiesFromData.filter((item, index) => 
                citiesFromData.indexOf(item) === index
            );

            return {
                filtersData: {
                    allCities: uniqueCities,
                    allGenders: uniqueGenders
                }
            };
        });
    }

    pushDataFilterGender(e) {
        const target = e.target;
        const { genders } = this.state.filters;
        let index;

        if(target.checked) {
            genders.push(target.value);
        } else {
            index = genders.indexOf(target.value);
            genders.splice(index, 1);
        }
        this.setState({
            filters: {
                ...this.state.filters,
                genders: genders,
            }
        });
    }

    pushDataFilterCities(e) {
        const target = e.target;
        const { cities } = this.state.filters;
        let index;

        if(target.checked) {
            cities.push(target.value);
        } else {
            index = cities.indexOf(target.value);
            cities.splice(index, 1);
        }
        this.setState({
            filters: {
                ...this.state.filters,
                cities: cities,
            }
        });
    }

    render() {
        const { filtersData, userData, filters } = this.state;
        return (
            <div className="App">
                {/* <button onClick={this.getData}>Get data</button> */}
                <button onClick={this.getFiltersFromData}>Paint checks</button>
                <form>
                    <fieldset>
                        {filtersData.allGenders.map((gender, index) => (
                            <Checkbox
                                id={`checkGenders${index}`}
                                key={index}
                                name="gender"
                                value={gender}
                                checkedFilter={filters.genders}
                                label={gender}
                                listener={this.pushDataFilterGender}
                            />
                        ))}
                    </fieldset>
                    <fieldset>
                        {filtersData.allCities.map((cities, index) => (
                            <Checkbox
                                id={`checkCities${index}`}
                                key={index}
                                name="cities"
                                value={cities}
                                checkedFilter={filters.cities}
                                label={cities}
                                listener={this.pushDataFilterCities}
                            />
                        ))}
                    </fieldset>
                    <ul>
                        {userData
                            // si en mi objeto filters.gender está el género (true) que viene de la API se filtra
                            // si no hay longitud en mi array (false) no se filtra
                            .filter((user) => 
                                filters.genders.includes(user.gender) || filters.genders.length === 0
                            )
                            .filter((user) => 
                                filters.cities.includes(user.location.city) || filters.cities.length === 0
                            )
                            .map((user, index) => (
                                <UserCard
                                    img={user.picture.thumbnail}
                                    name={`${user.name.first} ${user.name.last}`}
                                    city={user.location.city}
                                    age={user.dob.age}
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
