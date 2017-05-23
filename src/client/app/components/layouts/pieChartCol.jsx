import React from 'react';

import {Col, ControlLabel} from 'react-bootstrap'
import BasePieChartGen from '../../containers/pieChartContainer.js'

class PieChartCol extends React.Component  {
    constructor(props) {
        super(props);
    }

    render () {
        const {id, name, title} = this.props

        const BasePieChart = BasePieChartGen(name)

        return (
            <Col key={id} md={3}>
                <ControlLabel className="component-title">{title}</ControlLabel>
                <BasePieChart {...this.props}/>
            </Col>
        );
    }
}

export default  PieChartCol
