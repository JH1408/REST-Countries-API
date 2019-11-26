import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';

const Home = ({clicked, switchMode, isDark, checkPreferences}) => {

  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getCountries();
    checkPreferences();
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

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const countriesList = isLoading ? <Spinner/> : countries!==null && filteredCountries===null ? countries.map(country => {
    return <Card
                key={country.code}
                name={country.name}
                capital={country.capital}
                flag={country.flag}
                population={formatNumber(country.population)}
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
      <Header isDark={isDark} switchMode={switchMode}/>
      <div className="form">
        <input
          placeholder="Search for a country..."
          onChange={inputChangeHandler}
          onKeyUp={submitHandler}
          value={inputValue}/>
        <div className="dropdown">
          <Dropdown select={selectChangeHandler} />
        </div>

      </div>
      <div className="card-container">
        {countriesList}
      </div>
    </div>
  );
}

export default Home;
