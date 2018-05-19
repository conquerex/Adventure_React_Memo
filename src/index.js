import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { App, Home, Login, Register } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

/* Check whether current route is login or register using regex */
// let re = /(login|register)/;
// let isAuth = re.test(this.props.location.pathname);

/**
 * How can I output the header from a specified component?
 * https://goo.gl/aPDmJw
 */

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    </Provider>, rootElement
);