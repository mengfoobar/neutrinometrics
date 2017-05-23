import React from 'react';

import {Col} from 'react-bootstrap'
import TinyAreaChartWithAggGen from '../../containers/tinyAreaChartContainer.js'

class TinyAreaChartCol extends React.Component  {
    constructor() {
        super();
    }

    render () {
        const {id, name} = this.props;

        const TinyAreaChartWithAgg = TinyAreaChartWithAggGen(name)

        return (
            <Col key={id} md={3} className="tinyArea-col">
                <TinyAreaChartWithAgg  {...this.props} />
            </Col>
        );
    }
}

export default TinyAreaChartCol