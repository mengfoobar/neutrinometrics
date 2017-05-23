import React from 'react'

import {Grid, Row, ControlLabel} from 'react-bootstrap'
import BaseTinyAreaChart from './baseTinyAreaChart.jsx'
import Loading from '../../layouts/loadingLayout.jsx'
import ErrorMsg from '../../layouts/errorLayout.jsx'



import {sumValueFromArray, averageValueFromArray} from '../../../utils/dataOps.jsx'




class TinyAreaChartWithAgg extends React.Component {

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
        const { loading, error, data} = this.props;
        const {aggregation, title} = this.props

        if(loading){
            return <Loading />
        }else if(error){
            return <ErrorMsg/>
        }else if(!data || data.length<=0){
            return (
                <Grid style={{width:'100%'}}>
                    <Row style={{paddingLeft:15}}>
                        <ControlLabel className="header">0</ControlLabel>
                        <ControlLabel className="subHeader" >{title}</ControlLabel>
                    </Row>

                    <Row style={{height:45}}/>
                </Grid>

            );
        }

        return (
            <Grid style={{width:'100%'}}>
                <Row style={{paddingLeft:15}}>
                    <ControlLabel className="header">{getSummaryState(aggregation, data)}</ControlLabel>
                    <ControlLabel className="subHeader" >{title}</ControlLabel>
                </Row>

                <Row style={{height:45}}>
                    <BaseTinyAreaChart data={data} loading={loading} error={error} />
                </Row>
            </Grid>

        );
    }
}


export default TinyAreaChartWithAgg;


const getSummaryState=(aggregation, data)=>{

    let summaryStat;
    switch(aggregation){
        case "sum":
            summaryStat=sumValueFromArray(data);
            break;
        case "average":
            summaryStat=averageValueFromArray(data);
            break;
        default:
            summaryStat=0;
    }

    if(summaryStat % 1 !== 0){
        summaryStat = +summaryStat.toFixed(2)
    }
    return summaryStat;
}