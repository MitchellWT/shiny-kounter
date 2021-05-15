const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Pokedex = require('pokedex-promise-v2');

// Setup function that creates the initial local
// database using the PokemonAPI.
exports.setup = () =>
{
    return new Promise((resolve: any, reject: any) =>
        {
            const pokemon = new Pokedex();
            const adapter = new FileSync('db.json');
            const db = low(adapter);

            // Sets up the default list in the database.
            db.defaults(
            {
                pokemon: [],
                currentKounter: []
            }
            ).write();

            let pokemonSize = db.get('pokemon').size().value();
            let pokemonList;
            let pokemonId = 0;

            // Checks size of database to see If the PokemonAPI
            // needs to be called.
            if (pokemonSize === 0)
            {
                // Gets pokemon list from PokemonAPI.
                pokemon.getPokemonsList().then((res: any) =>
                    {
                        pokemonList = res;

                        // Loop for getting all pokemon from the API response.
                        pokemonList.results.forEach((pokemon: any) =>
                            {
                                // Exclude all mega and gmax pokemon.
                                if (!(pokemon.name.includes('-mega') || pokemon.name.includes('-gmax')))
                                {
                                    //Write pokemon to database.
                                    pokemonId++;
                                    db.get('pokemon').push(
                                    {
                                        id: pokemonId,
                                        name: pokemon.name,
                                        caught: false,
                                        kounter: 0,
                                        timer: 0
                                    }
                                    ).write();
                                }
                            }
                        );

                        resolve(true);
                    }
                ).catch((error: any) =>
                    {
                        resolve(false);
                    }
                );
            }
            else
            {
                resolve(true);
            }
        }
    );
};

// Returns counters that have been saved
// in the database.
exports.kounterArr = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    // Gets 'currentKounter' list from database.
    let currentKounterWithId = db.get('currentKounter').value();
    let currentKounter: Array<number> = [];

    // Fill array with 'currentKounter' data.
    currentKounterWithId.forEach((kounter: any) =>
        {
            currentKounter.push(kounter.id);
        }
    );

    return currentKounter;
};

// Returns all pokemon in the database.
exports.pokemonArr = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    return db.get('pokemon').value();
};

// Returns all pokemon names that are in
// the database.
exports.pokemonName = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    // Gets 'pokemon' list from database.
    const pokemonArr = db.get('pokemon').value();
    const pokemonName:Array<any> = [];

    // Fill array with name column from 'pokemon' data.
    pokemonArr.forEach((pokemon:any) =>
        {
            pokemonName.push(pokemon.name);
        }
    );

    return pokemonName;
};

// Gets a pokemon from the database using
// a provided ID.
exports.pokemonFromID = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    return db.get('pokemon').find({"id": id}).value();
};

// Adds a pokemon to the 'currentKounter' list
// in the database using a provided ID.
exports.addPokemonKounter = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    return db.get('currentKounter').push({"id": id}).write();
};

// Removes a pokemon from the 'currentKounter' list
// using a provided ID.
exports.removePokemonKounter = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    db.get('currentKounter').remove({"id": id}).write();
};

// Updates a pokemon in the database.
exports.updateDatabase = (id: number, kount: number, time: number, caught: boolean) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    db.get('pokemon').find({id: id}).assign({kounter: kount, timer: time, caught: caught}).write();
    console.log(db.get('pokemon').find({id: id}).value());
};
