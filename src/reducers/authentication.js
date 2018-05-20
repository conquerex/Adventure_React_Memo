import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        isLoggedIn: false,
        isLoggedIn: false,
        currentUser: ''
    }
}

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    // thunk 를 리턴하는 loginRequest는 리듀서에서 따로 case를 지정해주지 않아도 됨
    switch(action.type) {
        /****** LOGIN ******/
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });

        /****** REGISTER ******/
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /****** STATUS ******/
        case types.AUTH_GET_STATUS:
            return update(state, {
                register: {
                    isLoggedIn: { $set: true }
                }
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                register: {
                    valid: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
                register: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false },
                }
            });
        default:
            return state;
    }
}