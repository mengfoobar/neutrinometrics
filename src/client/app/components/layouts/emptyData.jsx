import React from 'react';
import FontAwesome from 'react-fontawesome'
import './styles/iconMessageLayout.css'

class EmptyData extends React.Component  {
    constructor(props) {
        super();
    }

    render () {

        return (
            <div className="icon-message-container">
                <div style={{width:'inherit', textAlign:'center'}}>
                    <FontAwesome name="battery-empty"
                                 className="icon"/>
                </div>
                <div className="message" style={{textAlign:'center', color:"#8c8c8c"}}>
                    No Data
                </div>
            </div>
        );
    }
}

export default EmptyData