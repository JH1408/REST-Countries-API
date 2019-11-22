import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import Dropdown from '../../components/Dropdown/Dropdown';

const Home = ({clicked}) => {

  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getCountries();
  }, [])

  useEffect(() => {
    if(inputValue === '') {
      setFilteredCountries(null);
    }
  }, [inputValue])

  const getCountries = () => {
    setIsLoading(true);
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      const countryData = res.data.map(result => {
        return {
          name: result.name,
          region: result.region,
          population: result.population,
          capital: result.capital,
          flag: result.flag,
          code: result.alpha3Code
        }
      })
      setCountries(countryData);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  }

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
    searchCountry(e.target.value);
  }

  const submitHandler = (e) => {
    if(e.which === 13) {
      searchCountry();
    } else {
      inputChangeHandler(e);
    }
  }

  const searchCountry = () => {
    const search = countries.filter((country) => {
      return country.name.includes(inputValue)
    })
    setFilteredCountries(search);
  }

  const selectChangeHandler = (e) => {
    const filter = countries.filter(country => {
      return country.region.includes(e.target.value);
    })
    setFilteredCountries(filter);
  }

  const countriesList = isLoading ? <Spinner/> : countries!==null && filteredCountries===null ? countries.map(country => {
    return <Card
                key={country.code}
                name={country.name}
                capital={country.capital}
                flag={country.flag}
                population={country.population}
                region={country.region}
                clicked={clicked}/>
            }) : filteredCountries !== null ? filteredCountries.map( filteredCountry => {
              return  <Card
                          key={filteredCountry.code}
                          name={filteredCountry.name}
                          capital={filteredCountry.capital}
                          flag={filteredCountry.flag}
                          population={filteredCountry.population}
                          region={filteredCountry.region}
                          clicked={clicked}/>
                      }) : <Spinner/>

  return (
    <div className="App">
      <div>
        <h1>Where in the world?</h1>
      </div>
      <div>
        <input
          placeholder="Search for a country..."
          onChange={inputChangeHandler}
          onKeyUp={submitHandler}
          value={inputValue}/>
        <Dropdown select={selectChangeHandler} />
      </div>
      <div>
        {countriesList}
      </div>
    </div>
  );
}

export default Home;
