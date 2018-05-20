import React, {Component } from 'react';
import { Header } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Register } from 'containers';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { connect } from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    };

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if(parts.length == 2) return parts.pop().split(";").shift();
        };

        // get loginData from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        
        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;
        
        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                // if session is not valid
                if(!this.props.status.valid) {
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #ffb4ba">Your session is expired, please log in again</span>');
                    Materialize.toast($toastContent, 4000);
                }
            }
        );
    };
        
    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!!!', 2000);
                
                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                }

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        )
    }

    render(){
        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(location.pathname);
        
        // todo 2018.05.21
        // 로그인 버튼을 포함한 링크가 정상적으로 작동하고 있지 않음
        return (
                <div>
                    {isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                                    onLogout={this.handleLogout} /> }
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/home" component={Home} />
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </Router>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);