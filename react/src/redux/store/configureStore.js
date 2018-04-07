import { createStore, applyMiddleware } from 'redux'
import allReducers from '../reducers/index.js'
import thunk from 'redux-thunk'
export default function configureStore (initialState) {
    const store = createStore(allReducers, initialState, applyMiddleware(thunk))
    return store
}