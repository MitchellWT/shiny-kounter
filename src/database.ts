const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Pokedex = require('pokedex-promise-v2');

exports.setup = () =>
{
    return new Promise((resolve: any, reject: any) =>
        {
            const pokemon = new Pokedex();
            const adapter = new FileSync('db.json');
            const db = low(adapter);

            db.defaults(
            {
                pokemon: [],
                currentKounter: []
            }
            ).write();

            let pokemonSize = db.get('pokemon').size().value();
            let pokemonList;
            let pokemonId = 0;

            if (pokemonSize === 0)
            {
                pokemon.getPokemonsList().then((res: any) =>
                    {
                        pokemonList = res;

                        pokemonList.results.forEach((pokemon: any) => 
                            {
                                if (!(pokemon.name.includes('-mega') || pokemon.name.includes('-gmax')))
                                {
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

exports.kounterArr = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    let currentKounterWithId = db.get('currentKounter').value();
    let currentKounter: Array<number> = [];

    currentKounterWithId.forEach((kounter: any) => 
        {
            currentKounter.push(kounter.id);
        }
    );

    return currentKounter;
};

exports.pokemonArr = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    return db.get('pokemon').value();
};

exports.pokemonName = () =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);
    const pokemonArr = db.get('pokemon').value();
    const pokemonName:Array<any> = [];

    pokemonArr.forEach((pokemon:any) => 
        {
            pokemonName.push(pokemon.name);
        }
    );

    return pokemonName;
};

exports.pokemonFromID = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);
    
    return db.get('pokemon').find({"id": id}).value();
};

exports.addPokemonKounter = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    return db.get('currentKounter').push({"id": id}).write();
};

exports.removePokemonKounter = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    db.get('currentKounter').remove({"id": id}).write();
};

exports.updateDatabase = (id: number) =>
{
    const adapter = new FileSync('db.json');
    const db = low(adapter);

    console.log(db.get('pokemon').find({id: id}).value());
};