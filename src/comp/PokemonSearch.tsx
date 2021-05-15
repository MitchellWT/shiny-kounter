import React from 'react';
import '../App.global.scss';
import Autosuggest from 'react-autosuggest';

interface PokemonSearchProp 
{
    createKounter: any
}

interface PokemonSearchState
{
    value: String,
    suggestions: Array<any>,
    selectedSuggestion: any,
    createKounter: any
}

// Pokemon search used to find pokemon in the database.
// Most of the code used here was in reference to 
// https://github.com/moroshko/react-autosuggest#installation
// in order to provide auto suggest capabilities.
class PokemonSearch extends React.Component<PokemonSearchProp, PokemonSearchState>
{
    private pokemonArr: any;

    constructor(props: PokemonSearchProp)
    {
        super(props);

        const database = require('../database');
        this.pokemonArr = database.pokemonArr();

        this.state = {
            value: "",
            suggestions: [],
            selectedSuggestion: null,
            createKounter: this.props.createKounter
        };

        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    getSuggestions = (input: any) => 
    {
        let cleanInput = input.trim().toLowerCase();
        let inputLength = cleanInput.length;

        return inputLength === 0 ? [] : this.pokemonArr.filter((lang: any) => lang["name"].toLowerCase().slice(0, inputLength) === cleanInput);
    };

    getSuggestionValue = (suggestion: any) => suggestion["name"];

    renderSuggestion = (suggestion: any) => 
    {
        return (
            <div>
                {suggestion["name"]}
            </div>
        );
    };

    onChange = (event: any, {newValue}: any) => 
    {
        this.setState(
            {
                value: newValue
            }
        );
    };

    onSuggestionsFetchRequested = ({value}: any) => 
    {
        this.setState(
            {
                suggestions: this.getSuggestions(value)
            }
        );
    };

    onSuggestionsClearRequested = () =>
    {
        this.setState(
            {
                suggestions: []
            }
        );
    };

    onSuggestionSelected(event: any, {suggestion}: any)
    {
        this.setState(
            {
                selectedSuggestion: suggestion
            }
        );
    }

    render()
    {
        const value = this.state.value;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder: "Pokemon",
            value,
            onChange: this.onChange
        };

        /*
        let caughtStatus = "Not Caught";
        
        if (this.state.selectedSuggestion.caught != null)
        {
            caughtStatus = this.state.selectedSuggestion.caught ? "Caught" : "Not Caught";
        }
        */

        return (
            <div id="pokemon-search">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}/>
                {this.state.selectedSuggestion == null ? [] : 
                <div className="results-container">
                    <p>{this.state.selectedSuggestion.id} | {this.state.selectedSuggestion.name}</p>
                    <p>{this.state.selectedSuggestion.caught ? "Caught" : "Not Caught"}</p>
                    <table> 
                        <tr>
                            <td>Kounter</td>
                            <td>{this.state.selectedSuggestion.kounter}</td>
                        </tr>
                        <tr>
                            <td>Timer</td>
                            <td>{this.state.selectedSuggestion.timer}</td>  
                        </tr>
                    </table>

                    <button className="results-button" onClick={() => this.state.createKounter(this.state.selectedSuggestion)}>Create Kounter!</button>
                </div>
                }
            </div>
        );
    }
}

export default PokemonSearch;
