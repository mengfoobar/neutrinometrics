import React from 'react'

import BaseVerticalBarChart from './baseVerticalBarChart.jsx'
import Loading from '../../layouts/loadingLayout.jsx'
import ErrorMsg from '../../layouts/errorLayout.jsx'
import EmptyData from '../../layouts/emptyData.jsx'




class BaseVerticalBarComponent extends React.Component {

    //TODO: handle null when implmenting redux
    constructor() {
        super();
    }

    componentWillMount() {
        const { startDate, endDate, appId, metric} = this.props;
        this.props.getAggregationData(appId, startDate, endDate, metric);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.startDate!==this.props.startDate || nextProps.endDate!==this.props.endDate){
            const {startDate, endDate, appId, metric}=nextProps
            nextProps.getAggregationData(appId, startDate, endDate, metric);
        }
    }



    render () {
        const { loading, error, data, barColor} = this.props;
        let yAxisWidth= this.props.yAxisWidth ||80;


        if(loading){
            return <Loading/>
        }else if(error){
            return <ErrorMsg/>
        }else if(!data || data.length<=0){
            return <EmptyData />
        }


        return <BaseVerticalBarChart barColor={barColor} data={data} yAxisWidth={yAxisWidth}/>

    }
}


export default BaseVerticalBarComponent;