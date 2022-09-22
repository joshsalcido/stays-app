import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import userSpots from "./spots";
import reviewReducer from "./reviews";
import allSpots from "./main";
import singleSpot from "./spot";
import bookingReducer from "./bookings";

const rootReducer = combineReducers({
  session: sessionReducer,
  userSpots, reviewReducer, allSpots, singleSpot, bookingReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
