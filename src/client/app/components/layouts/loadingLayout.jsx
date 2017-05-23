import React from 'react';
import FontAwesome from 'react-fontawesome'
import './styles/iconMessageLayout.css'

class Loading extends React.Component  {
    constructor(props) {
        super();
    }

    render () {

        return (
            <div className="icon-message-container">
                <div style={{width:'inherit', textAlign:'center'}}>
                    <FontAwesome name="circle-o-notch"
                                 className="icon"
                                 spin
                                 />
                </div>
                <div className="icon-message" >
                    loading...
                </div>
            </div>
        );
    }
}

export default Loading