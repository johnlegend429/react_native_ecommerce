import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  addItem: ['item'],
  removeItem: ['itemId'],
  changeItemQuantity: ['itemId', 'quantity'],
});

export const CartTypes = Types;
export default Creators;

const INITIAL_STATE = Immutable({
  items: [],
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ITEM]: (state, { item }) => ({ items: [...state.items, { ...item, quantity: 1 }] }),
  [Types.REMOVE_ITEM]: (state, { itemId }) => ({
    items: [...state.items.filter(item => item.id !== itemId)],
  }),
  [Types.CHANGE_ITEM_QUANTITY]: (state, { itemId, quantity }) => ({
    items: state.items.map(item => (item.id === itemId ? { ...item, quantity } : item)),
  }),
});
