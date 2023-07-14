export const updateItem = (item) => {
    return fetch(`/api/items/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }); 
};

export const addItem = (pokemonId, item) => {
    return fetch(`/api/pokemon/${pokemonId}/items`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

