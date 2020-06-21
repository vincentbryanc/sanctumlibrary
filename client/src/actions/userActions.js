import { FETCH_USERS } from './types';
import  axiosConfig from '../axiosConfig';

export const fetchUsers = () => dispatch => {
    axiosConfig.get('/api/users', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(users => dispatch({
            type: FETCH_USERS,
            payload: users.data.data
        }));
}