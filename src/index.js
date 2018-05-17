import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App, Home, Login, Register } from 'containers';

/* Check whether current route is login or register using regex */
// let re = /(login|register)/;
// let isAuth = re.test(this.props.location.pathname);

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    </Router>, rootElement
);