import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './comp/Navbar';
import Footer from './comp/Footer';

class App extends React.Component
{
  render()
  {
    return (
      <div id="app">
        <Navbar/>
        <div className="main">
        </div>

        <Footer/>
      </div>
    );
  }
}

class AppWrapper extends React.Component 
{
  render()
  {
    return (
      <Router>
        <Switch>
          <Route path="/" component={App}/>
        </Switch>
      </Router>
    );
  }
}

export default AppWrapper;