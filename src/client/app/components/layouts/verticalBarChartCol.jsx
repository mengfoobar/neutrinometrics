import React from 'react';

import {Col, ControlLabel} from 'react-bootstrap'
import VerticalBarChartGen from '../../containers/verticalBarChartContainer.js'

class VerticalBarChartCol extends React.Component  {
    constructor(props) {
        super(props);
    }

    render () {
        const {id, title, name} = this.props;

        const VerticalBarChart = VerticalBarChartGen(name)

        return (
            <Col key={id} md={6}>
                <ControlLabel className="component-title">{title}</ControlLabel>
                <p style={{    marginTop: -25, paddingLeft: 45, color: '#808080'}}><i>(showing top 10)</i></p>
                <VerticalBarChart {...this.props}/>
            </Col>
        );
    }
}

export default VerticalBarChartCol
