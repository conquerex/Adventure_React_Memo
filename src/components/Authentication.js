import React, { Component } from 'react';

class Authentication extends Component {
    render() {
        return (
            <div>
                Auth
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