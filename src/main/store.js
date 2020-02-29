import axios from 'axios';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import people from './reducers/people';
import axiosMiddleware from 'redux-axios-middleware';

const rootReducer = combineReducers({
    people: people,
});

const axiosInterceptor = axios.create({
    baseURL: 'https://swapi.co/api',
    responseType: 'json',
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(axiosInterceptor)));
export default store;
