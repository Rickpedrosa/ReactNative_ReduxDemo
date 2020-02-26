import {DELETE_PERSON, FETCH_PEOPLE} from '../actions/types';

const initialState = {
    peopleResult: [],
};

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PEOPLE:
            break;
        case DELETE_PERSON:
            break;
        default:
            return state;
    }
};
