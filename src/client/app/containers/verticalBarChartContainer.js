import { connect } from 'react-redux'
import VerticalBarChart from '../components/charts/vertical-bar/verticalBarComponent.jsx'
import BaseChartContainer from './baseChartContainer.js'


class VerticalBarContainer extends BaseChartContainer{
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

export default (name)=>{
    let VerticalBarContainerIns = new VerticalBarContainer(name);
    return  connect(VerticalBarContainerIns.mapStateToProps, VerticalBarContainerIns.mapDispatchToProps)(VerticalBarChart);
}
