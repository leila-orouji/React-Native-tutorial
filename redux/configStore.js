import {createStore, combineReducers, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {dishes} from './dishes';
import {promotions} from './promotions';
import {leaders} from './leaders';
import {comments} from './comments';

export const configStore = () => {
    const store = createStore(
        combineReducers({
            dishes: dishes,
            promotions: promotions,
            leaders: leaders,
            comments: comments
        }),
    //  applyMiddleware(thunk, logger)
    )
    return store;
}