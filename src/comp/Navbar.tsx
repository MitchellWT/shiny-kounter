import React from 'react';
import '../App.global.scss';
import {PlusCircleFill, Journal, X} from 'react-bootstrap-icons';
import PokemonSearch from './PokemonSearch';

const database = require('../database');

interface NavbarProps
{
    kounters: Array<number>,
    showKounter: any
}

interface NavbarState
{
    kounters: Array<number>,
    JSXKounters: Array<any>,
    showAdd: boolean,
    showList: boolean,
    showKounter: any
}

// Navigation bar that presents all the current counters
// and a button to add additional counters.
class Navbar extends React.Component<NavbarProps, NavbarState>
{
    constructor(props: NavbarProps)
    {
        super(props);

        let JSXKounters: any = [];

        this.props.kounters.forEach((kounter: any) =>
            {
                JSXKounters.push(<button onClick={() => this.props.showKounter(database.pokemonFromID(kounter))} id={kounter}>{kounter}</button>);
            }
        );

        this.state = {
            kounters: props.kounters,
            JSXKounters: JSXKounters,
            showAdd: false,
            showList: false,
            showKounter: props.showKounter
        };

        this.modalKounter = this.modalKounter.bind(this);
        this.modalList = this.modalList.bind(this);
        this.createKounter = this.createKounter.bind(this);
        this.removeKounter = this.removeKounter.bind(this);
    }

    // Shows a model for adding a new counter.
    modalKounter()
    {
        this.setState(prevstate => (
            {
                showAdd: !prevstate.showAdd
            }
        ));
    }

    // Shows a model that presents a list of pokemon.
    modalList()
    {
        this.setState(prevstate => (
            {
                showList: !prevstate.showList
            }
        ));
    }

    // Creates a new counter using the underlying
    // database.
    createKounter(selectedSuggestion: any)
    {
        // Creates new JSX component.
        let newJSXKounter = (
            <button onClick={() => this.props.showKounter(database.pokemonFromID(selectedSuggestion.id))}>
                {selectedSuggestion.id}
            </button>
        );

        // Adds new component and data
        // to the component and counter list.
        this.setState(prevstate => (
            {
                showAdd: !prevstate.showAdd,
                kounters: [...prevstate.kounters, selectedSuggestion.id],
                JSXKounters: [...prevstate.JSXKounters, newJSXKounter]
            }
        ));

        database.addPokemonKounter(selectedSuggestion.id);
    }

    // Removes a counter from the navigation bar and database.
    removeKounter(id: number)
    {
        database.removePokemonKounter(id);

        let kounterArray = this.state.kounters;
        let JSXArray = this.state.JSXKounters;

        // Searches and removes counter from counter array.
        for (let i = 0; i < kounterArray.length; i++)
        {
            let kounter = kounterArray[i];

            if (kounter == id)
            {
                kounterArray.splice(i, 1);
                i = kounterArray.length;
            }
        }

        // Searches and removes JSX from JSX array.
        for (let i = 0; i < JSXArray.length; i++)
        {
            let JSX = JSXArray[i];

            if (JSX.id == id)
            {
                JSXArray.splice(i, 1);
                i = JSXArray.length;
            }
        }

        this.setState = (() => (
            {
                kounters: kounterArray,
                JSXKounters: JSXArray
            }
        ));
    }

    render()
    {
        const addModal = (
            <div id="add-modal-container">
                <div id="add-modal">
                    <div className="modal-cross-container">
                        <X onClick={this.modalKounter} size={35} className="modal-cross"/>
                    </div>
                    <h1 className="modal-heading">Add Kounter</h1>
                    <PokemonSearch createKounter={this.createKounter}/>
                </div>
            </div>
        );

        const listModal = (
            <div id="list-modal-container">
                <div id="list-modal">
                    <div className="modal-cross-container">
                        <X onClick={this.modalList} size={25} className="modal-cross"/>
                    </div>
                </div>
            </div>
        );


        return (
            <div id="navbar">
                <div id="kounter-container">
                    {this.state.JSXKounters}
                </div>

                <div id="icon-container">
                    <PlusCircleFill onClick={this.modalKounter} size={25} className="icon"/>
                    {/* <Journal onClick={this.modalList} size={25} className="icon"/> */}
                </div>

                {this.state.showAdd ? addModal : []}
                {this.state.showList ? listModal : []}
            </div>
        );
    }
}

export default Navbar;
