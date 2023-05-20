import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(blockchainReducer, composeEnhancers);
};

const store = configureStore();

export default store;