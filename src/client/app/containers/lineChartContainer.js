import { connect } from 'react-redux'
import LineChart from '../components/charts/line/lineChart.jsx'
import BaseChartContainer from './baseChartContainer.js'


class LineChartContainer extends BaseChartContainer{
    constructor(name="") {
        super(name)
    }

    mapStateToProps = (state) => {
        const containerStates = state[this.name];
        return {
            data: containerStates.data,
            loading: containerStates.loading,
            error: containerStates.error
        };
    }
}

export default (name="")=>{
    let LineChartContainerIns = new LineChartContainer(name);
    return  connect(LineChartContainerIns.mapStateToProps, LineChartContainerIns.mapDispatchToProps)(LineChart);
}
