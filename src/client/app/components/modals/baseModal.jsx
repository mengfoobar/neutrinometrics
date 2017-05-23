import React from 'react';
import {Modal} from 'react-bootstrap'

import './styles/baseModal.css'


class BaseModal extends React.Component  {

    constructor(props) {
        super();
        this.close=this.close.bind(this);

        this.state={
            show: true
        }
    }

    close(){

        if(this.props.onClose){
            this.props.onClose()
        }

        this.setState({
            show: false
        });
    }


    render(){

        console.log("props in modal")

        const {disableClose=false, bsSize="small"} = this.props;

        return (
            <div id="modal-window" >
                <Modal
                    bsSize={bsSize}
                    show={this.state.show}
                       onHide={this.close}
                       className={this.props.customClass}
                       keyboard={!disableClose}
                       backdrop={disableClose?'static':true}>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

export default BaseModal;