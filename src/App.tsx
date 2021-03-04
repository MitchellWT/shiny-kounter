import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './comp/Navbar';
import Kounter from './comp/Kounter';
import Footer from './comp/Footer';

class App extends React.Component<any, any>
{
  private nav: any;
  private currentKounter: any;

  constructor(props: any)
  {
    super(props);

    const database = require('./database');
    this.currentKounter = database.kounterArr();

    this.state = {
      kounter: null,
      renderKounter: false
    };

    this.nav = React.createRef();

    this.showKounter = this.showKounter.bind(this);
    this.hideKounter = this.hideKounter.bind(this);
  }

  showKounter(selectedSuggestion: any)
  {
    let newKounter = (
      <Kounter id={selectedSuggestion.id} name={selectedSuggestion.name} caught={selectedSuggestion.caught} kount={(selectedSuggestion.kounter)} time={selectedSuggestion.timer} hideKounter={this.hideKounter}/>
    );
    
    this.setState((prevstate: any) => (
      {
        kounter: newKounter,
        renderKounter: !prevstate.renderKounter
      }
    ));
  }

  hideKounter(id: number)
  {
    this.setState((prevstate: any) => (
      {
        renderKounter: !prevstate.renderKounter
      }
    ));

    this.nav.current.removeKounter(id);
  }

  render()
  {
    return (
      <div id="app">
        <Navbar kounters={this.currentKounter} showKounter={this.showKounter} ref={this.nav}/>
        {this.state.renderKounter ? this.state.kounter : (<div className="main"></div>)}
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