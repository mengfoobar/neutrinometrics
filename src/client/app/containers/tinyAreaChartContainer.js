import { connect } from 'react-redux'
import TinyAreaChart from '../components/charts/tiny-area/tinyAreaChartComponent.jsx'
import BaseChartContainer from './baseChartContainer.js'

class TinyAreaWithAggContainer extends BaseChartContainer{
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
    let TinyAreaWithAgg = new TinyAreaWithAggContainer(name);
    return  connect(TinyAreaWithAgg.mapStateToProps, TinyAreaWithAgg.mapDispatchToProps)(TinyAreaChart);
}
