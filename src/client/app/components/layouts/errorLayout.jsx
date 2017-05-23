import React from 'react';
import FontAwesome from 'react-fontawesome'
import './styles/iconMessageLayout.css'

class ErrorMessage extends React.Component  {
    constructor(props) {
        super();
    }

    render () {

        return (
            <div className="icon-message-container">
                <div style={{width:'inherit', textAlign:'center'}}>
                    <FontAwesome name="exclamation-circle"
                                 className="icon"/>
                </div>
                <div className="icon-message">
                    error encountered
                </div>
            </div>
        );
    }
}

export default ErrorMessage