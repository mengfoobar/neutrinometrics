import React from 'react'

import {Grid, Row, Dropdown,  MenuItem} from 'react-bootstrap'
import BaseAreaChart from './baseAreaChart.jsx'
import Loading from '../../layouts/loadingLayout.jsx'
import ErrorMsg from '../../layouts/errorLayout.jsx'
import EmptyData from '../../layouts/emptyData.jsx'



//TODO: put this in the constants section
const Metrics={
    "DAILY_SESSIONS":{
        title:"Daily user sessions",
        yLabel:"session"
    },
    "SESSIONS_DURATION":{
        title:"Avg. session duration",
        yLabel:"minutes"
    },
    "NEW_USERS":{
        title:"New Users",
        yLabel:"new users"
    },
    "DAILY_ACTIVE_USERS":{
        title:"Active daily users",
        yLabel:"unique users"
    }

}

class MultiAreaChart extends React.Component {

    //TODO: handle null when implmenting redux
    constructor() {
        super();
    }

    componentWillMount() {
        const { startDate, endDate, appId} = this.props;
        this.props.getAggregationData(appId, startDate, endDate, "DAILY_SESSIONS");
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.startDate!==this.props.startDate || nextProps.endDate!==this.props.endDate){
            const {startDate, endDate, appId, metric}=nextProps
            nextProps.getAggregationData(appId, startDate, endDate, metric);
        }
    }

    _handleAggregationToggle(aggKey){
        const { startDate, endDate, appId} = this.props;
        this.props.getAggregationData(appId, startDate, endDate,aggKey)
    }

    render () {
        const { loading, error, data, metric} = this.props;

        if(loading){
            return <Loading />
        }else if(error){
            return <ErrorMsg/>
        }else if(!data || data.length<=0){
            return <EmptyData />
        }

        return (
            <Grid style={{width:'100%'}}>
                <Row style={{ padding: "0px 0px 10px 45px"}}>

                    <Dropdown id="dropdownDataSelect" className="dropdown-select" style={{width:200}} >
                        <Dropdown.Toggle>
                            {Metrics[metric]?Metrics[metric].title :""}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{width:"inherit"}} >

                            {
                                Object.keys(Metrics).map((k)=>
                                    <MenuItem eventKey={k}
                                              onSelect={(key, e)=>{
                                                  this._handleAggregationToggle(key)
                                              }}>
                                        {Metrics[k].title}
                                    </MenuItem>
                                )
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
                <Row>
                    <BaseAreaChart data={data} loading={loading} error={error} yLabel={Metrics[metric]?Metrics[metric].yLabel:""}/>
                </Row>
            </Grid>

        );
    }
}

export default MultiAreaChart;
