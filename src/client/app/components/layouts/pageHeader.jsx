import React from 'react';

import { Col, ControlLabel} from 'react-bootstrap'

class PageHeader extends React.Component  {
    constructor(props) {
        super();
    }

    render () {
        let {id, title, colLength=12} = this.props;

        return (
            <Col key={id} md={colLength} className="main-header">
                <ControlLabel className="title">{title}</ControlLabel>
            </Col>
        );
    }
}

export default PageHeader