import React from 'react';
import './styles/navbar.css'
import FontAwesome from 'react-fontawesome'
import {destroySession} from '../../constants/reqConfigs.js'
import axios from 'axios'
import { browserHistory } from 'react-router';

import EditUserSettings from '../../containers/settingsModalContainer'


import { Image, Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap'


class MainHeader extends React.Component  {
    constructor(props) {
        super(props);

        this.logOutSession=this.logOutSession.bind(this);
    }

    logOutSession(){
        axios(destroySession())
            .then(function(result){
                if(result.status==200){
                    //TODO: show logout message
                    browserHistory.push('login');
                }
            })
    }


    render () {
        const {appId="", appName="", showEditSettingsModal} = this.props;

        return (
            <div style={{width:"100%"}}>
                <Navbar className="main-navbar" collapseOnSelect
                        style={{
                            backgroundColor: '#fcfcfc', boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
                            position: 'fixed', top: 0,height: 70,paddingTop: 10,zIndex: 100,
                            width: '100%',  verticalAlign: 'middle',
                            borderWidth: '0 0 1px',borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.12)'
                        }}>
                    <Navbar.Header>
                        <Navbar.Brand >
                            <Image src="https://s3.amazonaws.com/deskop/resources/neutrino_icon.png" style={{padding:0}} />
                        </Navbar.Brand>
                        <Navbar.Brand>
                            <span className="app-name">{appName}</span> <span className="app-id">{`(ID: ${appId})`}</span>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>

                            <NavDropdown eventKey={"settings"} title={<FontAwesome name="cog"/>} className="dropdown">
                                <MenuItem eventKey={"settings"} onSelect={()=>this.props.toggleEditSettingsModal(true)}>
                                    <FontAwesome className="icon" name="user"/>User Settings
                                </MenuItem>
                                <MenuItem eventKey={"signOut"} onSelect={this.logOutSession}><FontAwesome className="icon" name="sign-out"/>Sign out</MenuItem>
                            </NavDropdown >

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {showEditSettingsModal ?
                    <EditUserSettings toggleEditSettingsModal={this.props.toggleEditSettingsModal}/>
                    : null
                }
            </div>

        );
    }
}




/**
 *

 *
 * **/


export default MainHeader