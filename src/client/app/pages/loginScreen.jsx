import React, {Component} from 'react';

import MainDashBoard from './overviewDash.jsx'
import LoginModal from '../containers/loginModalContainer.js'
import Header from '../components/layouts/navbar.jsx'

class LoginScreen extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <LoginModal allowClose={false} />
                <Header appId={""} appName={""} />
                <MainDashBoard/>
            </div>
        )
    };
}

export default LoginScreen;