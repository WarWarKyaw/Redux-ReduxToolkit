const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("./features/cake/cakeSlice");
const { getDefaultMiddleware } = require("@reduxjs/toolkit");
const reduxlogger = require("redux-logger");

const iceCreamReducer = require("./features/icecream/icecreamSlice");
// const store = configureStore({
//   reducer: { cake: cakeReducer, iceCream: iceCreamReducer },
// });
const logger = reduxlogger.createLogger();

const store = configureStore({
  reducer: { cake: cakeReducer, iceCream: iceCreamReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
