import {FETCH_PEOPLE, ON_REFRESHED, PEOPLE_FAIL, PEOPLE_SUCCESS} from '../actions/types';

const initialState = {
    peopleResult: [],
    loading: true,
    error: '',
    page: 1,
    refreshing: false,
};

const people = (state = initialState, action) => {
    console.log('state reducing', state);
    switch (action.type) {
        case FETCH_PEOPLE:
            return {
                ...state,
                loading: true,
            };
        case PEOPLE_SUCCESS:
            return {...state, loading: false, peopleResult: action.payload.data.results.concat(state.peopleResult)};
        case PEOPLE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching star wars characters',
            };
        case ON_REFRESHED:
            return {
                ...state,
                page: state.page + 1,
            };
        default:
            return state;
    }
};

export function listOfPersons(index = 1) {
    return {
        types: [FETCH_PEOPLE, PEOPLE_SUCCESS, PEOPLE_FAIL],
        payload: {
            request: {
                url: `/people/?page=${index}`,
            },
        },
    };
}

export default people;
