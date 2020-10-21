import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {promotions} from './promotions';
import {leaders} from './leaders';
import {comments} from './comments';
import {favorites} from './favorite';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import storage from 'redux-persist/es/storage'; // local storage for persist redux

export const configStore = () => {
    const config ={
        key: 'root',
        storage:  AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            dishes: dishes,
            promotions: promotions,
            leaders: leaders,
            comments: comments,
            favorites : favorites
        }),
      applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store)
    return { persistor, store};
}