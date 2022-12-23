import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementOrder: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    decrementOrder: (state, action) => {
      state.items = (() => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        let newBasket = [...state.items];
        if (index >= 0) {
          newBasket.splice(index, 1);
        }
        return newBasket;
      })();
    },
    clearCart: (state, action) => {
      state.items = (() => initialState.items)();
    }
  }
});

export const { incrementOrder, decrementOrder, clearCart } = cartSlice.actions;
export const getItems = (state) => state.cart.items;
export const getItemWithId = (state, id) => {
  if (state.cart.items.length > 0) {
    return state.cart.items.filter((item) => item.payload.id === id);
  } else {
    return initialState.items;
  }
};
export const getTotal = (state) => {
  total = state.cart.items.reduce((curr, acc) => {
    curr += acc.payload.price;
    return curr;
  }, 0);
  return total;
};
export const getRestaurant = (state) => {
  return state.cart.items[0];
};
export default cartSlice.reducer;
