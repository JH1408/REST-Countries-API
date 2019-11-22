import React, {Suspense} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import './App.scss';
import Home from './container/Home/Home';
import SingleCountry from './container/SingleCountry/SingleCountry';

const App = (props) => {

  const showSingleCountry = (countryName) => {
    props.history.push(`/countries/${countryName}`)
  }

  return (
    <div className="App">
      <Suspense fallback={'Loading...'}>
        <Switch>
          <Route path="/countries" render={() => <SingleCountry />} />
          <Route path="/" exact render={() => <Home clicked={showSingleCountry} />} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default withRouter(App);
