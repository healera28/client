import API from "../../API/API"
import { ADD_USER, DELETE_USER, SET_USER_ERROR, SET_USERS, SET_USER_LOADING_FALSE, SET_USER_LOADING_TRUE } from "../types"

const initialState = {
    users: [],
    loading: false,
    error: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {...state, users: action.payload}
        case ADD_USER:
            return {...state, users: [...state.users, action.payload]}
        case DELETE_USER:
            return {...state, users: [...state.users].filter(item => item.id !== action.payload)}
        case SET_USER_LOADING_TRUE:
            return {...state, loading: true}
        case SET_USER_LOADING_FALSE:
            return {...state, loading: false}
        case SET_USER_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}

export class UserActionCreators {
    static addUser = body => async dispatch => {
        dispatch(this.setLoadingTrue())

            const response = await API.createUser(body)
            if(response.statusText === "OK") {  
                dispatch(this.getUsers())
            }else {
                dispatch(this.setError(response))
            }

        dispatch(this.setLoadingFalse())
    }

    static deleteUser = userId => async dispatch => {
        dispatch(this.setLoadingTrue())

        const response = await API.deleteUser(userId)
        if(response.statusText === "OK") {  
            dispatch({type: DELETE_USER, payload: userId})
        }else {
            dispatch(this.setError(response))
        }

        dispatch(this.setLoadingFalse())
    }

    static getUsers = () => async dispatch => {
        dispatch(this.setLoadingTrue())

        const response = await API.getUsers()
        if(response.statusText === "OK") {  
            dispatch({type: SET_USERS, payload: response.data})
        }else {
            dispatch(this.setError(response))
        }

        dispatch(this.setLoadingFalse())
    }

    static setLoadingTrue = () => ({type: SET_USER_LOADING_TRUE})
    static setLoadingFalse = () => ({type: SET_USER_LOADING_FALSE})
    static setError = payload => ({type: SET_USER_ERROR, payload})
}



export default userReducer