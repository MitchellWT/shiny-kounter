import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import './App.global.scss';

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