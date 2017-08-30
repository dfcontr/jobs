import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk),
        autoRehydrate() // Store enhancer
    )
);

// Use .purge() to clear the piece of state saved
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

// State shape changes? redux-persist-migration

export default store;
