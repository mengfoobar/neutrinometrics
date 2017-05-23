import React, {Component} from 'react';

import MainDashBoard from './overviewDash.jsx'
import RegisterModal from '../containers/registerModalContainer.js'
import Header from '../components/layouts/navbar.jsx'


class LoginScreen extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <RegisterModal />
                <Header appId={""} appName={""} />
                <MainDashBoard/>
            </div>
        )
    };
}

export default LoginScreen;