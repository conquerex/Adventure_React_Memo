import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // input 의 값을 state 로 설정하기
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        console.log("----- Authentication.js : handleLogin start -----");
        let id = this.state.username;
        let pw = this.state.password;

        // props로 전달받은 onLogin 을 실행
        this.props.onLogin(id, pw).then(
            // success : Login 컴포넌트의 handleLogin 에서 리턴한 true/false 값
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    };

    handleRegister() {
        console.log("----- Authentication.js : handleRegister start -----");
        let id = this.state.username;
        let pw = this.state.password;

        // props로 전달받은 onRegister 을 실행
        this.props.onRegister(id, pw).then(
            // success : Register 컴포넌트의 handleRegister 에서 리턴한 true/false 값
            (success) => {
                if(!success) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    };

    handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render() {

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.username}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="validate"
                        onChange={this.handleChange}
                        value={this.state.password}/>
                </div>
            </div>
        )

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>
                            SUBMIT
                        </a>
                    </div>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/">MEMOPAD</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
}

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.log("Login function not defined!!!")},
    onRegister: (id, pw) => { console.log("Register function not defined!!!")}
}

export default Authentication;