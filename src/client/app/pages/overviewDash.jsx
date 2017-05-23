import React, {Component} from 'react';
import { Grid, Row,Col} from 'react-bootstrap';

import RowLayout from '../components/grid-layout/rowLayout.jsx'

import MultiAreaChartCol from '../components/layouts/multiAreaChartCol.jsx'
import PieChartCol from '../components/layouts/pieChartCol.jsx'
import VerticalBarChartCol from '../components/layouts/verticalBarChartCol.jsx'
import TinyAreaChartCol from '../components/layouts/tinyAreaChartCol.jsx'
import PageHeader from '../components/layouts/pageHeader.jsx'
import {DateRangePicker} from '../components/widgets/dateRangePicker.jsx'



import moment from 'moment'


const RowLayouts=[
    {
        customStyle:{
            height: 155,
            padding: "25px 50px 50px 50px"
        },
        contents:[
            <TinyAreaChartCol id="summarySessions" name="tinyAreaAggA" title="sessions" aggregation={"sum"} metric={"DAILY_SESSIONS"}/>,
            <TinyAreaChartCol id="summaryAvgSessions" name="tinyAreaAggB" title="avg. mins/session" aggregation={"average"} metric={"SESSIONS_DURATION"}/>,
            <TinyAreaChartCol id="summaryNewUserData" name="tinyAreaAggC" title="new users"  aggregation={"sum"} metric={"NEW_USERS"}/>,
            <TinyAreaChartCol id="summaryGrowthRate" name="tinyAreaAggD" title="% user growth"  aggregation={"average"} metric={"DAILY_ACTIVE_USERS"}/>
        ]
    },
    {
        customStyle: {
            padding: "25px 25px 50px 25px",
            height: 325
        },
        contents: [
            <MultiAreaChartCol id="dataOverview" title="Overview"/>
        ]
    },
    {
        customStyle:{
            height: 425,
            padding: "100px 25px 110px 20px"
        },
        contents: [
            <PieChartCol id="newOldUsers" title="New vs Old Users" name="pieChartA" metric={"NEW_OLD_USERS"}/>,
            <PieChartCol id="usersRetained" title="Retained Users" name="pieChartB"  metric={"RETAINED_BOUNCED_USERS"}/>,
            <PieChartCol id="osPlatform" title="Operating Systems" name="pieChartC"  metric={"OS"}/>,
            <PieChartCol id="appVersion" title="App Version" name="pieChartD"  metric={"VERSION"}/>
        ]
    },
    {
        customStyle:{
            height: 480,
            padding:"50px 25px"
        },
        contents: [
            <VerticalBarChartCol id="userPerLanguage" name="vBarChartA" title="Language"  barColor={"#e74c3c"}  metric={"LANGUAGE"}/>,
            <VerticalBarChartCol id="userPerCountry" name="vBarChartB" title="Region" yAxisWidth={100} barColor={"#3498db"}  metric={"COUNTRY"}/>
        ]
    }
]

class MainDashBoard extends Component {
    constructor() {
        super();
        this.handleDateRangeChange=this.handleDateRangeChange.bind(this);

        this.state={
            startDate: moment().subtract(14, 'days').format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD")
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !Object.is(this.state, nextState)
    }

    handleDateRangeChange(startDate, endDate) {
        this.setState({
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate:moment(endDate).format("YYYY-MM-DD") ,
        });
    }

    render() {
        const {startDate, endDate} = this.state

        return (
            <Grid style={{width:'100%'}}>
                <Row className="header-row" style={{padding: "30px 0px 0px 60px", height:100}}>
                    <PageHeader  id="mainDashHeader" title="Analytics Overview" />
                </Row>
                <Row className="dateRange-row" >
                    <Col md={1}  className="widget-label" >
                        <span className="widget-label" >Date Range: </span>
                    </Col>

                    <Col md={5} style={{margin:0, padding:0}}>
                        <DateRangePicker ref="dateRangePicker" onChange={this.handleDateRangeChange}/>
                    </Col>
                </Row>

                {
                    RowLayouts.map((row)=>
                        <RowLayout customStyle={row.customStyle} appId={this.props.appId}
                                   startDate={startDate}
                                   endDate={endDate}>
                            {row.contents}
                        </RowLayout>
                    )
                }
            </Grid>
        )
    };
}

export default MainDashBoard;

