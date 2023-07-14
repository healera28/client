import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./usersTableReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

export default rootReducer