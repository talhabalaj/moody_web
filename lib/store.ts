import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './reducers';

const reducers = {
    auth
};

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const configureStore = () =>
    createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)))