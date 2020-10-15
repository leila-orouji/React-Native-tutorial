import * as actionTypes from './actionTypes';

export const leaders = (state={
    isLoading: true,
    errMess: null,
    leaders: []
}, action) =>{
    switch (action.type) {
        case actionTypes.ADD_LEADERS:
            return { ...state, leaders: action.payload, isLoading: false, errMess: null}
        case actionTypes.LEADERS_LOADING:
            return { ...state, leaders: [], isLoading: true, errMess: null}
        case actionTypes.LEADERS_FAILED:
            return { ...state, leaders: [], isLoading: false, errMess: action.payload}        
        default:
            return state;
    }
}
