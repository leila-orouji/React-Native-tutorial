import * as actionTypes from './actionTypes';

export const dishes = (state={
    isLoading: true,
    errMess: null,
    dishes: []
}, action) =>{
    switch (action.type) {
        case actionTypes.ADD_DISHES:
            return { ...state, dishes: action.payload, isLoading: false, errMess: null}
        case actionTypes.DISHES_LOADING:
            return { ...state, dishes:[], isLoading: true, errMess: null}
        case actionTypes.DISHES_FAILED:
            return { ...state, dishes:[], isLoading: false, errMess: action.payload}        
        default:
            return state;
    }
}
