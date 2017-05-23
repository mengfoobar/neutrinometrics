import React from 'react';
import BaseModal from './baseModal.jsx'
import {Form, FormGroup, InputGroup, FormControl, ControlLabel, Dropdown,  MenuItem} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {Link} from 'react-router'


import Loading from '../layouts/loadingLayout.jsx'
import Success from '../layouts/successLayout.jsx'


import './styles/iconMessageModal.css'
import './styles/settingsModal.css'

class SettingsModal extends React.Component  {


    constructor(props) {
        super(props);

        this._handleSaveSettingsClick=this._handleSaveSettingsClick.bind(this);
        props.getSessionUserInfo();
    }


    _handleSaveSettingsClick(appId){
        const userInfo={
            email: ReactDOM.findDOMNode(this.refs.email).value,
            fullName:ReactDOM.findDOMNode(this.refs.fullName).value
        }

        let appInfoArr=[];
        appInfoArr.push({
            id:appId,
            name: ReactDOM.findDOMNode(this.refs.appName).value,
            website:ReactDOM.findDOMNode(this.refs.appWebsite).value
        })

        this.props.updateSettings(userInfo, appInfoArr)

    }


    render(){

        let selectedAppIndex = 0
        const { loading, error, data, updateSuccess} = this.props;
        let layout;

        if(loading){
            layout= <Loading/>
        }
        else if(updateSuccess){
            layout= (
                <div style={{padding: '30px 0px'}}>
                    <Success style={{width:'100%'}}/>
                    <div style={{padding: 5, paddingTop: 30}}>
                        <button
                            style={{ width: 325, margin: '0 auto'}}

                            onClick={ ()=>{
                                this.props.reset();
                                this.props.toggleEditSettingsModal(false);

                                window.location.reload(true);

                            }}>
                            Close Window
                        </button>

                    </div>
                </div>

            )
        }
        else if(!data){
            layout =(<div></div>)
        }
        else {
            const {apps} = data;

            layout= (
                <div id="settingsModal">
                    <FormGroup>
                        <ControlLabel className="modal-header-1">Settings</ControlLabel>
                    </FormGroup>
                    <div style={{width:"100%", height:50}}></div>

                    <FormGroup>
                        <ControlLabel className="modal-header-2">User Settings</ControlLabel>
                        <div style={{width:"100%", height:40}}></div>

                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>User Email:</ControlLabel>
                        <InputGroup>
                            <FormControl ref="email" type="text" placeholder="Email" defaultValue={data.email}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Full Name:</ControlLabel>
                        <InputGroup>
                            <FormControl ref="fullName" type="text" placeholder="Full Name (First Last)" defaultValue={data.fullName}/>
                        </InputGroup>
                    </FormGroup>


                    <FormGroup>
                        <ControlLabel className="modal-header-2">App Settings</ControlLabel>
                        <div style={{width:"100%", height:40}}></div>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Select Application</ControlLabel>
                        <InputGroup>
                            <Dropdown id="dropdownDataSelect" className="dropdown-select" style={{width:300}}>
                                <Dropdown.Toggle>
                                    {apps[selectedAppIndex]?apps[selectedAppIndex].name :""}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width:"inherit"}} >

                                    {
                                        Object.keys(apps).map((k)=>
                                            <MenuItem eventKey={k}
                                                      onSelect={(key, e)=>{
                                                      }}>
                                                {apps[k].name}
                                            </MenuItem>
                                        )
                                    }

                                </Dropdown.Menu>
                            </Dropdown>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>App Name:</ControlLabel>
                        <InputGroup>
                            <FormControl ref="appName" type="text" placeholder="App Name" defaultValue={apps[selectedAppIndex].name}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>App Website:</ControlLabel>
                        <InputGroup>
                            <FormControl ref="appWebsite" type="text" placeholder="App Website" defaultValue={apps[selectedAppIndex].website}/>
                        </InputGroup>
                    </FormGroup>

                    <div style={{width:"100%", height:35}}></div>

                    <div style={{padding: 5, paddingTop: 15}}>
                        <button
                            onClick={ ()=>{
                            this._handleSaveSettingsClick(apps[selectedAppIndex].id)
                        }}>
                            Save Settings
                        </button>

                    </div>
                </div>
            )
        }
        //TODO: checkout where this this.props.toggleEditSettingsModal comes from
        return (
            <BaseModal title="Settings" bsSize={"large"} onClose={()=>{this.props.toggleEditSettingsModal(false)}}>
                <div className="settings modal-container">
                    {layout}
                </div>
            </BaseModal>
        )
    }
};

export default SettingsModal;