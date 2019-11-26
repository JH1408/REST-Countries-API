import React, {Suspense, useState, useEffect} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './container/Home/Home';
import SingleCountry from './container/SingleCountry/SingleCountry';

const App = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    checkPreferences();
  }, [])

  const showSingleCountry = (countryName) => {
    props.history.push(`/countries/${countryName}`)
  }

  const switchModeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('isDark', !isDarkTheme);
  }

  const checkPreferences = () => {
    setIsDarkTheme(localStorage.getItem('isDark'));
  }

  return (
    <div className={'App theme ' + (isDarkTheme ? 'theme--dark' : 'theme--default')}>
      <Suspense fallback={'Loading...'}>
        <Switch>
          <Route path="/countries" render={() => <SingleCountry
                                                    switchMode={switchModeHandler}
                                                    isDark={isDarkTheme}
                                                    checkPreferences={checkPreferences}/>} />
          <Route path="/" exact render={() => <Home
                                                clicked={showSingleCountry}
                                                switchMode={switchModeHandler}
                                                isDark={isDarkTheme}
                                                checkPreferences={checkPreferences}/>} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);
