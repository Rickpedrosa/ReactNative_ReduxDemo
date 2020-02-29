import {FETCH_PEOPLE, PEOPLE_FAIL, PEOPLE_SUCCESS} from '../actions/types';

const initialState = {
    peopleResult: [],
};

const people = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PEOPLE:
            return {
                ...state,
                loading: true,
            };
        case PEOPLE_SUCCESS:
            return {...state, loading: false, peopleResult: action.payload.data};
        case PEOPLE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching star wars characters',
            };
        default:
            return state;
    }
};

export function listOfPersons() {
    return {
        types: [FETCH_PEOPLE, PEOPLE_SUCCESS, PEOPLE_FAIL],
        payload: {
            request: {
                url: `/people`,
            },
        },
    };
}

export default people;
