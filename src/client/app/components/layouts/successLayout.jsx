import React from 'react';
import FontAwesome from 'react-fontawesome'
import './styles/iconMessageLayout.css'

class ShowSuccess extends React.Component  {
    constructor(props) {
        super();
    }

    render () {

        return (
            <div className="icon-message-container">
                <div style={{width:'inherit', textAlign:'center'}}>
                    <FontAwesome name="check-circle"
                                 className="icon"
                                 style={{fontSize: 145, color:"#2abb67"}}
                                 />
                </div>
                <div className="icon-message">
                    Success!
                </div>
            </div>
        );
    }
}

export default ShowSuccess