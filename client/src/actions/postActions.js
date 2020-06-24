import { 
    FETCH_IN_PROGRESS,
    CREATE_IN_PROGRESS,
    UPDATE_IN_PROGRESS,
    DELETE_IN_PROGRESS,
    FETCH_POSTS, 
    NEW_POST, 
    UPDATE_POST,
    DELETE_POST 
} from './types';
import  axiosConfig from '../axiosConfig';

export const fetchPosts = () => dispatch=> {
    dispatch({ type: FETCH_IN_PROGRESS });
    axiosConfig.get('/api/posts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(posts => dispatch({
            type: FETCH_POSTS,
            payload: posts.data.data
        }));
}

export const createPost = postData => dispatch => {
    dispatch({ type: CREATE_IN_PROGRESS });
    axiosConfig.post('/api/post', postData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(post => dispatch({
            type: NEW_POST,
            payload: post.data.data
        }));
}

export const updatePost = (postId, postCurrentContent) => dispatch => {
    dispatch({ type: UPDATE_IN_PROGRESS });
    const data = {
        'content': postCurrentContent
    } 
    axiosConfig.put('/api/post/' + postId, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(post => dispatch({
            type: UPDATE_POST,
            payload: post.data.data
        }));
}

export const deletePost = postId => dispatch => {
    dispatch({ type: DELETE_IN_PROGRESS });
    axiosConfig.delete('/api/post/' + postId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(
            dispatch({
                type: DELETE_POST,
                postId: postId
            })
        );
}