import './loader.jsx'

import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import AppContainer from './pages/appContainer.jsx'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';



const store = configureStore();

import DashboardContainer from './pages/dashboard.jsx'
import Login from './pages/loginScreen.jsx'
import Register from './pages/registerScreen.jsx'
import Home from './pages/home.jsx'




class App extends React.Component {
    render () {
        return(
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path='/' component={AppContainer}>
                        <IndexRoute component={Login}/>
                        <Route path='login' component={Login}/>
                        <Route path='register' component={Register}/>
                        <Route path='/:appid' component={DashboardContainer}>
                            <IndexRoute  component={Home} />
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}


render(<App/>, document.getElementById('app'));