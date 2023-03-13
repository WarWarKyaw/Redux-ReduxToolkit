const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const initialState = {
  name: "Ye Kyaw",
  address: {
    street: "123 Main St",
    city: "Yangon",
    state: "YNG",
  },
};

// action type
const STREET_UPDATED = "STREET_UPDATED";

// action cretor
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      // need two arguments, current state and draft copy of state
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

// create store
const store = createStore(reducer);
console.log("Initial State ", store.getState());

// attach listener to store
const unsubscribe = store.subscribe(() => {
  console.log("Updated State ", store.getState());
});

store.dispatch(updateStreet("456 Main St"));

// remove listener
unsubscribe();
