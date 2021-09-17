import { combineReducers, createStore } from 'redux'
import { user } from './reducers/user'
import { message } from './reducers/message'
import { seller } from './reducers/seller'

const rootReducer = combineReducers({
    user,
    message,
    seller
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;