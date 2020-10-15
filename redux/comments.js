import * as actionTypes from './actionTypes';

export const comments = (state={
    isLoading: true,
    errMess: null,
    comments: []
}, action) =>{
    switch (action.type) {
        case actionTypes.ADD_COMMENTS:
            return { ...state, comments: action.payload, isLoading: false, errMess: null}
        case actionTypes.COMMENTS_FAILED:
            return { ...state, comments: [], isLoading: false, errMess: action.payload}        
        default:
            return state;
    }
}
