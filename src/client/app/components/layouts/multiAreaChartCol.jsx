import React from 'react';

import {Col, ControlLabel} from 'react-bootstrap'
import MultiAreaChart from '../../containers/multiAreaChartContainer.js'

class MultiAreaChartCol extends React.Component  {
    constructor(props) {
        super();
    }

    render () {
        const {id, title, startDate, endDate, appId} = this.props;

        return (
            <Col key={id} md={12}>
                <ControlLabel className="component-title">{title}</ControlLabel>
                <MultiAreaChart startDate={startDate} endDate={endDate} appId={appId}/>
            </Col>
        );
    }
}

export default MultiAreaChartCol