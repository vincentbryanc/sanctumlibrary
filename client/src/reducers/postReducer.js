import { 
    FETCH_IN_PROGRESS,
    CREATE_IN_PROGRESS,
    UPDATE_IN_PROGRESS,
    DELETE_IN_PROGRESS,
    FETCH_POSTS, 
    NEW_POST, 
    UPDATE_POST,
    DELETE_POST
} from '../actions/types'

const initialState = {
    items: [],
    item: {},
    fetchInProgress: false,
    createInProgress: false,
    updateInProgress: false,
    deleteInProgress: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_IN_PROGRESS:
            return {
                ...state,
                fetchInProgress: true,
            }
        case CREATE_IN_PROGRESS:
            return {
                ...state,
                createInProgress: true,
            }
        case UPDATE_IN_PROGRESS:
            return {
                ...state,
                updateInProgress: true,
            }
        case DELETE_IN_PROGRESS:
            return {
                ...state,
                deleteInProgress: true,
            }
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload,
                fetchInProgress: false,
            }
        case NEW_POST:
            return {
                ...state,
                item: action.payload,
                createInProgress: false
            }
        case UPDATE_POST:
            return {
                ...state,
                // item: action.payload,
                items: state.items.filter(post => post.id !== action.payload.id).concat(action.payload),
                updateInProgress: true,
            }
        case DELETE_POST:
            return {
                ...state,
                items: state.items.filter(post => post.id !== action.postId),
                deleteInProgress: false,
            }
        default:
            return state;

    }
}