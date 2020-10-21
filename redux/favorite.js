import * as actionTypes from './actionTypes';

export const favorites = (state=[], action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE:
            if(state.some (el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        case actionTypes.DELETE_FAVORITE:
            return state.filter((favorite)=> favorite !== action.payload )

        default:
            return state;
    }
}