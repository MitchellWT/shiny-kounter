import React from 'react';
import '../App.global.scss';
import {Trash} from 'react-bootstrap-icons';

interface KounterProps
{
    id: number,
    name: String,
    caught: boolean,
    kount: number,
    time: number,
    hideKounter: any
}

interface KounterState
{
    id: number,
    name: String,
    caught: boolean,
    kount: number,
    time: number,
    hideKounter: any,
    formattedTime: String,
    timerOn: boolean
}

class Kounter extends React.Component<KounterProps, KounterState>
{
    private timer: any = null;
    private database: any;

    constructor(props: KounterProps)
    {
        super(props);

        this.database = require('../database');

        let second = props.time % 60;
        let minute = Math.floor(props.time / 60);
        minute = minute % 60;
        let hour = Math.floor(minute / 60);

        this.state = {
            id: props.id,
            name: props.name,
            caught: props.caught,
            kount: props.kount,
            time: props.time,
            hideKounter: props.hideKounter,
            formattedTime: hour + ':' + minute + ':' + second,
            timerOn: false
        };

        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
        this.timeConvert = this.timeConvert.bind(this);
        this.timerStart = this.timerStart.bind(this);
        this.timerStop = this.timerStop.bind(this);
        this.changeCaught = this.changeCaught.bind(this);
    }

    decrement()
    {
        this.setState(prevstate => (
            {
                kount: prevstate.kount - 1
            }
        ));

        this.updateDatabase(false);
    }

    increment()
    {
        this.setState(prevstate => (
            {
                kount: prevstate.kount + 1
            }
        ));

        this.updateDatabase(false);
    }

    timeConvert()
    {
        let time = this.state.time;

        let second = time % 60;
        let minute = Math.floor(time / 60);
        minute = minute % 60;
        let hour = Math.floor(minute / 60);

        this.setState(() => (
            {
                formattedTime: hour + ':' + minute + ':' + second
            }
        ));
    }

    timerStart()
    {
        if (!this.state.timerOn)
        {
            this.timer = setInterval(() =>
                {
                    this.setState(prevstate => (
                        {
                            time: prevstate.time + 1
                        }
                    ));
                    this.timeConvert();
                }
            , 1000);

            this.setState(prevstate => (
                {
                    timerOn: !prevstate.timerOn,
                }
            ));
        }
    }

    timerStop()
    {
        clearInterval(this.timer);

        this.setState(prevstate => (
            {
                timerOn: !prevstate.timerOn
            }
        ));

        this.updateDatabase(false);
    }

    changeCaught()
    {
        this.setState(prevstate => (
            {
                caught: !prevstate.caught
            }
        ));

        this.updateDatabase(true);
    }

    updateDatabase(caughtChange: boolean)
    {
        if (caughtChange)
        {
            this.database.updateDatabase(this.state.id, this.state.kount + 1, this.state.time, !this.state.caught);
        }
        else
        {
            this.database.updateDatabase(this.state.id, this.state.kount + 1, this.state.time, this.state.caught);
        }
    }

    render()
    {
        return (
            <div className="main">
                <div className="trash-container">
                    <Trash className="main-trash" size={25} onClick={() => this.state.hideKounter(this.state.id)}/>
                </div>
                <h1 className="main-name">{this.state.name}</h1>
                <div className="main-kounter-container">
                    <button className="minus-button" onClick={this.decrement}>-</button>
                    <h2 className="kounter-value">{this.state.kount}</h2>
                    <button className="plus-button" onClick={this.increment}>+</button>
                </div>
                <div className="main-timer-container">
                    <h2 className="timer-value">{this.state.formattedTime}</h2>
                    {!this.state.timerOn ? <button className="kounter-general-button" onClick={this.timerStart}>Start</button> : <button className="kounter-general-button" onClick={this.timerStop}>Stop</button>}
                </div>

                <div className="main-caught-container">
                    {!this.state.caught ? <button className="kounter-general-button" onClick={this.changeCaught}>Not Caught</button> : <button className="kounter-general-button" onClick={this.changeCaught}>Caught</button>}
                </div>
            </div>
        );
    }
}

export default Kounter;