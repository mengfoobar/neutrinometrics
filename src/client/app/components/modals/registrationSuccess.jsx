import React from 'react';
import './styles/modalForm.css'
import './styles/registrationSuccess.css'
import BaseModal from './baseModal.jsx'
import {browserHistory} from 'react-router'


class RegistrationSuccess extends React.Component  {
    constructor(props) {
        super();
    }

    render () {

        const {username="", password="", projectId=""} = this.props;

        const initCode =`EA.init("${projectId}");`

        return (
            <BaseModal title="Register" customClass="registration-success"  bsSize={"large"} disableClose={true}>
                <div className="modal-container">
                    <div style={{padding: 5,paddingTop: 15}}>
                        <p className="title" style={{textAlign:'left'}}>Registration was successful!</p>
                        <p className="message"  style={{ fontSize:15, color: "#595959",textAlign:'left'}}>
                            An email with your login info has been sent to you at {username}.</p>

                        <p className="body-text header" >Integrating NeutrinoMetrics</p>
                        <p className="body-text" style={{paddingBottom:12}}>
                            1. install <b>electron-analytics</b> via <b>npm</b><br/>
                            2. add the following lines to your <b>main process</b> entry file:
                        </p>
                        <pre style={{textAlign:"left", marginLeft:15}}>
                          <code>
                              const EA = require("electron-analytics");<br/>
                              {initCode}
                          </code>
                        </pre>

                        <p className="body-text header"  style={{fontSize:16, paddingTop:15}}>That's it! You can now start using NeutrinoMetrics!</p>
                        <p style={{paddingBottom: 10, paddingTop: 5}}>For more on usage, please visit <a href="https://github.com/NeutrinoMetrics/electron-analytics" target="_blank">electron-analytics</a>.</p>

                        <button style={{maxWidth:300, marginTop:10}} onClick={()=>{
                            browserHistory.push('/');
                        }}>
                            To the dashboard!
                        </button>
                    </div>
                </div>
            </BaseModal>

        );
    }
}

export default RegistrationSuccess