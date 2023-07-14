import API from '../../API/API'
import {SET_SENT_CODE, INCREMENT_AUTH_STAGE, AUTH_USER, LOGOUT, SET_AUTH_ERROR, SET_AUTH_LOADING_FALSE, SET_AUTH_LOADING_TRUE, SET_USER_LOADING_TRUE, SET_USER_LOADING_FALSE} from '../types'

const initialState = {
    isAuth: false,
    stage: 1, 
    sent: {},
    error: {},
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SENT_CODE:
            return {...state, sent: action.payload, error: {}}
        case INCREMENT_AUTH_STAGE:
            return {...state, stage: state.stage + 1, error: {}}
        case AUTH_USER:
            return {...state, isAuth: true, error: {}, stage: 1}
        case LOGOUT:
            return {...state, isAuth: false}
        case SET_AUTH_ERROR:
            return {...state, error: action.payload}
        case SET_AUTH_LOADING_TRUE:
            return {...state, loading: true}
        case SET_AUTH_LOADING_FALSE:
            return {...state, loading: false}
        default:
            return state
    }                   
}   

export class AuthActinonCreators {
    static logout = () => ({type: LOGOUT})
    
    static resetPassword = email => async dispatch => {
        dispatch(this.setLoadingTrue())

            const response = await API.resetPassword(email)
            if(response.statusText === "OK") {
                dispatch({type: SET_SENT_CODE, payload: {type: "reset-password", message: 'Новый пароль отправлен на почту'}})
                setTimeout(() => dispatch({type: SET_SENT_CODE, payload: {}}), 5000)
            }else {
                dispatch(this.setError(response))   
            }

        dispatch(this.setLoadingFalse())
    }

    static confirmCode = code => async dispatch => {
        dispatch(this.setLoadingTrue())

            const response = await API.confirmCode(code)
            if(response.statusText === "OK") {
                dispatch({type: AUTH_USER})
            }else {
                dispatch(this.setError(response))   
            }

        dispatch(this.setLoadingFalse())
    }
    
    static signIn = body => async dispatch => {
        dispatch(this.setLoadingTrue())

            const response = await API.signIn(body)
            if(response.statusText === "OK") {
                console.log("Код доступа отправлен на почту")
                dispatch({type: SET_SENT_CODE, payload: {type: "sign-in", message: 'Код доступа отправлен на почту'}})
                setTimeout(() => dispatch({type: SET_SENT_CODE, payload: {}}), 5000)
                dispatch({type: INCREMENT_AUTH_STAGE})
            }else {
                dispatch(this.setError(response))   
            }

        dispatch(this.setLoadingFalse())
    }    

    static incrementAuthStage = () => ({type: INCREMENT_AUTH_STAGE})
    static setLoadingTrue = () => ({type: SET_AUTH_LOADING_TRUE})
    static setLoadingFalse = () => ({type: SET_AUTH_LOADING_FALSE})
    static setError = payload => ({type: SET_AUTH_ERROR, payload}) 
}

export default authReducer