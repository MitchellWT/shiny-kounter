import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import './App.global.scss';

class PreLoader extends React.Component<any, any>
{
    render()
    {
        return (
            <div id="app">
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
            <div>
                <h1>Connetion Error</h1>
            </div>
        );
    }
}

ReactDOM.render(<PreLoader/>, document.getElementById('root'));

const database = require('./database');
database.setup().then((res: any) => 
    {
        console.log(res);

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