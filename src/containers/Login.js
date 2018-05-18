import React, { Component } from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        // Use loginRequest (actions/authentication.js)
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };
    
                    /**
                     * 로그인이 성공하면, 세션 데이터를 쿠키에 저장
                     * btoa는 JavaScript의 base64 인코딩 함수
                     */
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    
                    Materialize.toast('Welcome ' + id + '!', 2000);
    
                    /**
                     * v3 :
                     * browserHistory.push('/');
                     */
                    this.props.history.push('/');
                    return true;
                } else {
                    let $toastContent =$(<span style="color: #ffb4ba">Incorrect username or password</span>);
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={true}
                    onLogin={this.handleLogin}/>
            </div>
        );
    }
}

// 로그인 요청 상태인 status 를 authentication 컴포넌트에 매핑
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
}

// 로그인 요청을하는 loginRequest 를 authentication 컴포넌트에 매핑
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw))
        }
    }
}

// react-redux 를 통하여 Login 컴포넌트를 Redux에 연결
export default connect(mapStateToProps, mapDispatchToProps)(Login);