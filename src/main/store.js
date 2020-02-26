import axios from 'axios';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import peopleReducer from './reducers/peopleReducer';
import axiosMiddleware from 'redux-axios-middleware';

const rootReducer = combineReducers({
    people: peopleReducer,
});

const axiosInterceptor = axios.create({
    baseURL: 'https://swapi.co/api',
    responseType: 'json',
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(axiosInterceptor)));
export default store;
