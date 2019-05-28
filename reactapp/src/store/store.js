import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/emplyeeReducer';

export const store = createStore(rootReducer,applyMiddleware(thunk));
