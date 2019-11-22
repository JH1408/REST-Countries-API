import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

const SingleCountry = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const url = props.history.location.pathname;
    getCountry(url.substring(url.lastIndexOf('/')+1));
  }, [])



  const getCountry = (country) => {
    setIsLoading(true);
    axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => {
      setCountryData({
        name: country,
        flag: res.data[0].flag,
        capital: res.data[0].capital,
        native: res.data[0].nativeName,
        population: res.data[0].population,
        region: res.data[0].region,
        subregion: res.data[0].subregion,
        domain: res.data[0].topLevelDomain,
        currency: res.data[0].currencies,
        languages: res.data[0].languages,
        border: res.data[0].borders
      })
      setIsLoading(false);
    }).catch(err => console.log(err))
  }

  let singleCountry = <Spinner/>

  if(countryData !== null && !isLoading) {
    console.log(countryData.border)
    const currency = [];
    for (let i = 0; i < countryData.currency.length; i++) {
      currency.push(countryData.currency[i].name)
    }
    const languages = [];
    for (let i = 0; i < countryData.languages.length; i++) {
      languages.push(countryData.languages[i].name)
    }
    const border = countryData.border.join(', ');

    singleCountry = (
      <React.Fragment>
        <div>
          <div>
            <img src={countryData.flag}/>
          </div>
          <div>
            <div>
              <h1>{countryData.name}</h1>
              <p><span>Native Name: </span>{countryData.native}</p>
              <p><span>Population: </span>{countryData.population}</p>
              <p><span>Region: </span>{countryData.region}</p>
              <p><span>Subregion: </span>{countryData.subregion}</p>
              <p><span>Capital: </span>{countryData.capital}</p>
            </div>
            <div>
              <p><span>Top-Level Domain: </span>{countryData.domain}</p>
              <p><span>Currencies: </span>{currency.join(', ')}</p>
              <p><span>Languages: </span>{languages.join(', ')}</p>
            </div>
          </div>
        </div>
        <div>
          {border.length ? <p><span>Border Countries: </span>{border}</p> : null}
        </div>
      </React.Fragment>
    )
  }

  return (
    <div>
      {singleCountry}
    </div>
  )
}

export default withRouter(SingleCountry);
