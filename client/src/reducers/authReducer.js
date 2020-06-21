import { LOGIN, LOGOUT } from '../actions/types';
import history from "../history";

const initialState = {
    item: {},
    isLoggedIn: !!localStorage.getItem("user"),
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            if (action.payload.user) {
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                history.push('/users');
                return {
                    ...state,
                    isLoggedIn: true,
                    item: action.payload
                }
            }
            else if (action.payload.message) {
                alert('Invalid Login Credentials');
                return {
                    ...state,
                    isLoggedIn: false,
                    item: action.payload
                }
            }
            break;
        case LOGOUT:
            localStorage.clear();
            history.push('/login');
            return {
                ...state,
                isLoggedIn: false
            }
        default:    
            return state;
    }
}