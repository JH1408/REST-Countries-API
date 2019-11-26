import React, {Suspense, useState} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Home from './container/Home/Home';
import SingleCountry from './container/SingleCountry/SingleCountry';

const App = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const showSingleCountry = (countryName) => {
    props.history.push(`/countries/${countryName}`)
  }

  const switchModeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <div className={'App theme ' + (isDarkTheme ? 'theme--dark' : 'theme--default')}>
      <Suspense fallback={'Loading...'}>
        <Switch>
          <Route path="/countries" render={() => <SingleCountry
                                                    switchMode={switchModeHandler}
                                                    isDark={isDarkTheme}/>} />
          <Route path="/" exact render={() => <Home
                                                clicked={showSingleCountry}
                                                switchMode={switchModeHandler}
                                                isDark={isDarkTheme}/>} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);
