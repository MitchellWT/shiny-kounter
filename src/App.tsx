import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Footer from './comp/Footer';

class App extends React.Component
{
  render()
  {
    return (
      <div>
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