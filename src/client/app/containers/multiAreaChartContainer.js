import { connect } from 'react-redux'
import BaseChartContainer from './baseChartContainer.js'
import MultiAreaChart from '../components/charts/area/multiAreaChartComponent.jsx';


class MultiAreaContainer extends BaseChartContainer{
    constructor(name){
        super(name)
    }

    mapStateToProps = (state) => {
        const containerStates = state["multiArea"];
        return {
            data: containerStates.data,
            loading: containerStates.loading,
            error: containerStates.error,
            metric: containerStates.metric
        };
    }
}

let AreaChartContainerInstance = new MultiAreaContainer("multiArea")

export default connect(AreaChartContainerInstance.mapStateToProps, AreaChartContainerInstance.mapDispatchToProps)(MultiAreaChart);