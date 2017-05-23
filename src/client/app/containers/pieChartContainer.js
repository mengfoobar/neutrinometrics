import { connect } from 'react-redux'
import PieChart from '../components/charts/pie/pieChartComponent.jsx'
import BaseChartContainer from './baseChartContainer.js'


class PieChartContainer extends BaseChartContainer{
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
    let PieChartContainerIns = new PieChartContainer(name);
    return  connect(PieChartContainerIns.mapStateToProps, PieChartContainerIns.mapDispatchToProps)(PieChart);
}
