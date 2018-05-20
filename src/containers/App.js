import React, {Component } from 'react';
import { Header } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, Register } from 'containers';
import { getStatusRequest } from 'actions/authentication';
import { connect } from 'react-redux';

class App extends Component {
    render(){

        return (
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.suthentication.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
