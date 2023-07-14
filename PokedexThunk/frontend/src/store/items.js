import * as ItemApiUtil from '../util/item_api_util'

export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const createItem = (pokemonId, item) => async (dispatch) => {
  const res = await ItemApiUtil.addItem(pokemonId, item);
  if (res.ok) {
    const newItem = res.json();
    dispatch(add(newItem));
  }
}

export const deleteItem = (pokemonId, itemId) => async (dispatch) => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.ok) {
    dispatch(remove(itemId, pokemonId));
  }}

export const editItem = (item) => async (dispatch) => {
  const res = await ItemApiUtil.updateItem(item);
  const data = res.json();
  dispatch(update(data));
}

export const fetchItems = (pokemonId) => async (dispatch) => {
  const res = await fetch(`/api/pokemon/${pokemonId}/items`);

  if (res.ok) {
    const items = await res.json();
    // debugger
    dispatch(load(items, pokemonId));
  } 
}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
      return {
        ...state,
        [action.item.id]: action.item
      };
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;