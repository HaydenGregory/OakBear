import { combineReducers, createStore } from 'redux';
import authenticated from './reducers/authenticated';


const rootReducer = combineReducers({
    authenticated
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;