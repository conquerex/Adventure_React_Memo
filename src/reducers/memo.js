import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    }
};

export default function memo(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.MEMO_POST:
            return update(state, {
                post: {
                    status: {$set: 'WAITING'},
                    error: {$set: -1}
                }
            });
        case types.MEMO_POST_SUCCESS:
            return update(state, {
                post: {
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.MEMO_POST_FAILURE:
            console.log("----- MEMO_POST_FAILURE :", action.error)
            return update(state, {
                post: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.MEMO_LIST:
            return update(state, {
                list: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.MEMO_LIST_SUCCESS:
            if(action.isInitial) {
                return update(state, {
                    list: {
                        status: {$set: 'WAITING'},
                        data: {$set: action.data},
                        isLast: {$set: action.data.length < 6}, // isLast : 현재 로딩된 페이지가 마지막페이지인지 아닌지
                    }
                });
            }
            // loading older or newer memo
            // to be implement
            return  state;
        case types.MEMO_LIST_FAILURE:
            return update(state, {
                list: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;          
    }
}