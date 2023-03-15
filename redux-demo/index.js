const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// action type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

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

// action creator that returns action
function orderIceCream(qty = 1) {
  // action object
  return {
    type: ICECREAM_ORDERED,
    payload: qty, // redux convention to name payload any additional information that want to add
  };
}

// action creator that returns action
function restockIceCream(qty = 1) {
  // action object
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty, // redux convention to name payload any additional information that want to add
  };
}

// Declare the initial state
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamstate = {
  numOfIceCreams: 20,
};

// (previousState, action) => newState
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - action.payload,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - action.payload,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamstate, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    case CAKE_ORDERED:
      return { ...state, numOfIceCreams: state.numOfIceCreams - 1 };
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// Create the store
const store = createStore(rootReducer, applyMiddleWare(logger));

// Allow access to state via getState()
console.log("Initial State ", store.getState());

// Register listener via subscribe(listener)
const unsubscribe = store.subscribe(() => {});

// Allow state to be updated via dispatch(action)
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

// bind action creators
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

// Remove the listener
unsubscribe();
