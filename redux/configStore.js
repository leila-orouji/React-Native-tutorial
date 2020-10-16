import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {promotions} from './promotions';
import {leaders} from './leaders';
import {comments} from './comments';
import {favorites} from './favorite'

export const configStore = () => {
    const store = createStore(
        combineReducers({
            dishes: dishes,
            promotions: promotions,
            leaders: leaders,
            comments: comments,
            favorites : favorites
        }),
     applyMiddleware(thunk, logger)
    )
    return store;
}