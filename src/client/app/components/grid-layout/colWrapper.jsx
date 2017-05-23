import React from 'react';

import {Col, ControlLabel} from 'react-bootstrap'

class ColLayout extends React.Component  {
    constructor(props) {
        super();
    }

    render () {
        let {id, title, colSpan} = this.props;

        return (
            <Col key={id} md={colSpan}>
                {title ? <ControlLabel className="component-title">{title}</ControlLabel>:null}
                {this.props.children}
            </Col>
        );
    }
}

export default ColLayout