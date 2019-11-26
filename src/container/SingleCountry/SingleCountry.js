import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Header/Header';
import Arrow from '../../assets/img/icons8-long-arrow-left-32.png';

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

  const goBack = () => {
    props.history.goBack()
  }

  let singleCountry = <Spinner/>

  if(countryData !== null && !isLoading) {
    const currency = [];
    for (let i = 0; i < countryData.currency.length; i++) {
      currency.push(countryData.currency[i].name)
    }
    const languages = [];
    for (let i = 0; i < countryData.languages.length; i++) {
      languages.push(countryData.languages[i].name)
    }
    const border = countryData.border.map(border => {
      return <span>{border}</span>
    })

    singleCountry = (
      <React.Fragment>
        <div className="flex-container">
          <div>
            <img src={countryData.flag}/>
          </div>
          <div>
            <h2>{countryData.name}</h2>
            <div className="flex-container__flex">
              <div>
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
            <div className="flex-container__border">
              {border.length ? <p><span>Border Countries: </span>{border}</p> : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className="single-country">
      <Header isDark={props.isDark} switchMode={props.switchMode}/>
      <div className="single-country__container">
        <button onClick={goBack}>
          <img src={Arrow} alt=""/>Back</button>
        {singleCountry}
      </div>
    </div>
  )
}

export default withRouter(SingleCountry);
