import axios from 'axios';
import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
} from './ActionTypes';

/* MEMO POST */
export function memoPostRequest(contents) {
    return (dispatch) => {
        //
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