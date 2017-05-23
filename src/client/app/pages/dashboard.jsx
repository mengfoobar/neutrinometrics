import React from 'react';
import Navbar from '../containers/navbarContainer.js'
import {getSessionActive} from '../constants/reqConfigs.js'
import { hashHistory } from 'react-router';
import NestedProperty from 'nested-property'
import axios from 'axios'

class DashboardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            appId:"",
            appName:""
        }
    }

    componentWillMount() {
        const self=this;
        axios(getSessionActive())
            .then(function(result){
                if(result.status===200){
                    const appInfo=NestedProperty.get(result, "data.apps.0");
                    if(appInfo){
                        self.setState({
                            appId: appInfo.id,
                            appName: appInfo.name
                        })
                    }

                }else{
                    hashHistory.push('login');
                }
            })
    }

    render() {
        const {appId, appName}= this.state
        return (
            <div className="dashboard">
                <Navbar appId={appId} appName={appName} />
                <div>
                    {this.props.children}
                </div>

            </div>
        );
    }

}

export default DashboardContainer;