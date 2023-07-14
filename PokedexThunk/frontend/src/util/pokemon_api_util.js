export const postPokemon = (pokemon) => {
    return fetch('/api/pokemon', {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    });
};

export const updatePokemon = (pokemon) => {
    return fetch(`/api/pokemon/${pokemon.id}`, {
        method: 'PATCH',
        body: JSON.stringify(pokemon),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }); 
};