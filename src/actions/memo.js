import axios from 'axios';
import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';

/* MEMO POST */
export function memoPostRequest(contents) {
    console.log("----- memoPostRequest :", contents);
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(memoPost());

        return axios.post('/api/memo/', { contents} )
            .then((response) => {
                dispatch(memoPostSuccess());
            }).catch((error) => {
                console.log("----- memoPostRequest error:", contents);
                dispatch(memoPostFailure(error.response.data.code));
            })
    }
}

export function memoPost() {
    return {
        type: MEMO_POST
    }
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    }
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    }
}