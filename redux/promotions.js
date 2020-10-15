import * as actionTypes from './actionTypes';

export const promotions = (state={
    isLoading: true,
    errMess: null,
    promotions: []
}, action) =>{
    switch (action.type) {
        case actionTypes.ADD_PROMOTIONS:
            return { ...state, promotions: action.payload, isLoading: false, errMess: null}
        case actionTypes.PROMOTIONS_LOADING:
            return { ...state, promotions: [], isLoading: true, errMess: null}
        case actionTypes.PROMOTIONS_FAILED:
            return { ...state, promotions: [], isLoading: false, errMess: action.payload}        
        default:
            return state;
    }

}