import { combineReducers, createStore } from 'redux'
import { user } from './reducers/user'
import { message } from './reducers/message'

const rootReducer = combineReducers({
    user,
    message
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;