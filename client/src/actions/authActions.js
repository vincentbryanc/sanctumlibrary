import { LOGIN, LOGOUT } from './types';
import  axiosConfig from '../axiosConfig';

export const authenticate = postData => dispatch => {
    axiosConfig.post('/api/login', postData)
        .then(user => dispatch({
            type: LOGIN,
            payload: user.data
        }));
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}