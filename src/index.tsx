import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import './App.global.scss';

// Pre loader component that currently only shows
// a 'Loading...' text using a H1 tag.
class PreLoader extends React.Component<any, any>
{
    render()
    {
        return (
            <div id="pre-error-container">
                <h1>Loading...</h1>
            </div>
        );
    }
}

// Error component that is called when a connection
// error occurs. This can happen when the application
// is not able to interact with the PokemonAPI.
class ConnectionError extends React.Component<any, any>
{
    render()
    {
        return (
            <div id="pre-error-container">
                <h1>Connetion Error</h1>
            </div>
        );
    }
}

ReactDOM.render(<PreLoader/>, document.getElementById('root'));

// Gets database file and attempts the setup procedure.
// Depending on the outcome the application will render
// or the error component will be shown.
const database = require('./database');
database.setup().then((res: any) =>
    {
        if (res)
        {
            ReactDOM.render(<AppWrapper/>, document.getElementById('root'));
        }
        else
        {
            ReactDOM.render(<ConnectionError/>, document.getElementById('root'));
        }
    }
);
