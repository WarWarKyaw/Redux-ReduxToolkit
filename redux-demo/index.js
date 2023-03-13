const redux = require("redux");
const createStore = redux.createStore;

// action type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// action creator that returns action
function orderCake() {
  // action object
  return {
    type: CAKE_ORDERED,
    payload: 1, // redux convention to name payload any additional information that want to add
  };
}

// action creator that returns action
function restockCake(qty = 1) {
  // action object
  return {
    type: CAKE_RESTOCKED,
    payload: qty, // redux convention to name payload any additional information that want to add
  };
}

// Declare the initial state
const initialState = {
  numOfCakes: 10,
};

// (previousState, action) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

// Allow access to state via getState()
console.log("Initial State ", store.getState());

// Register listener via subscribe(listener)
const unsubscribe = store.subscribe(() => {
  console.log("Updated State ", store.getState());
});

// Allow state to be updated via dispatch(action)
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));

// Remove the listener
unsubscribe();
