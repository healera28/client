import rootReducer from './reducers/rootReducer'
import { applyMiddleware, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'

const store = legacy_createStore(rootReducer, compose(
    applyMiddleware(thunk)
))
export default store