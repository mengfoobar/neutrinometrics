import React, {Component} from 'react';
import { Grid, Row, Col} from 'react-bootstrap';

import {getAppUserData} from '../constants/reqConfigs'


import PageHeader from '../components/layouts/pageHeader.jsx'
import {DateRangePicker} from '../components/widgets/dateRangePicker.jsx'
import FixedTableContainer from '../containers/fixedTableContainer'

import MultiSelect from 'react-select';



import './styles/userExplorerContainer.css';

const ShowRowsDropdown=[
    {
        label:"100 Rows",
        value:100
    },
    {
        label:"500 Rows",
        value:500
    },
    {
        label:"1000 Rows",
        value:1000
    },
    {
        label:"2500 Rows",
        value:2500
    }
]


const DataColumns=[
    {
        label:"Generated Id",
        value:"_id",
        width:180
    }, {
        label:"Custom User ID",
        value:"customId",
        width:225
    }, {
        label:"Sessions",
        value:"sessions",
        width:115
    }, {
        label:"Avg. Min/Session",
        value:"avgSession"
    }, {
        label:"Version",
        value:"version",
        width:115
    }, {
        label:"OS",
        value:"os",
        width:115
    }, {
        label:"Language",
        value:"language"
    }, {
        label:"Country",
        value:"country"
    }
]

import moment from 'moment'

class UserExplorerDash extends Component {

    constructor() {
        super();

        this.handleDateRangeChange=this.handleDateRangeChange.bind(this);
        this.handleSelectedColumnsChange=this.handleSelectedColumnsChange.bind(this);

        this.state={
            startDate: moment().subtract(14, 'days').format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            dataCols: DataColumns,
            selectedDataCols: "id,customId,os,avgMinSession,version,country,language,NEW_NOTE,NEW_NOTEBOOK",
            topRowsShown:100
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !Object.is(this.state, nextState)
    }

    handleSelectedColumnsChange (value) {

        this.setState({
            selectedDataCols:value
        });
    }

    handleDateRangeChange(startDate, endDate) {
        this.setState({
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate:moment(endDate).format("YYYY-MM-DD") ,
        });
    }

    render() {
        const FixedDataTable = FixedTableContainer("fixedTableUserStats")

        const {topRowsShown, startDate, endDate} = this.state;

        return (
            <Grid style={{width:'100%'}} id="userExplorerContainer">
                <Row className="header-row" style={{padding: "30px 0px 20px 50px", height:100}}>
                    <PageHeader  id="customEventsHeader" title="User Statistics" />
                </Row>
                <Row className="dateRange-row" style={{padding: "5px 0px 0px 70px", height:60}}>
                    <Col md={1} style={{margin:0, padding:"5px 0px 0px", minWidth:185}}>
                        <span style={{
                            fontSize: 23, fontFamily: "'Quicksand', sans-serif",
                            fontWeight: 'bold', color: '#666666'}}>Date Range: </span>
                    </Col>
                    <Col md={5} style={{margin:0, padding:0}}>
                        <DateRangePicker ref="dateRangePicker" onChange={this.handleDateRangeChange}/>
                    </Col>
                </Row>
                <Row className="show-rows-select" style={{padding: "5px 0px 0px 70px", height:60}}>
                    <Col md={1} style={{margin:0, padding:"5px 0px 0px", minWidth:185}}>
                        <span style={{
                            fontSize: 23, fontFamily: "'Quicksand', sans-serif",
                            fontWeight: 'bold', color: '#666666'}}>Show Top: </span>
                    </Col>
                    <Col md={5} style={{margin:0, padding:0}}>
                        <MultiSelect
                            className="show-rows-select"
                            style={{width:340}}
                            name="show-top-rows"
                            value={this.state.topRowsShown}
                            placeholder="Select columns for table"
                            options={ShowRowsDropdown}
                            onChange={(item)=>{
                                this.setState({
                                    topRowsShown:item.value
                                })}
                            }
                        />
                    </Col>
                </Row>
                <Row style={{padding: "30px 80px 20px", width:'100%'}}>
                    <FixedDataTable  name="fixedTableUserStats"
                                     columns={DataColumns}
                                     req={getAppUserData(this.props.appId,startDate, endDate,topRowsShown)}/>
                </Row>
            </Grid>
        )
    };
}


export default UserExplorerDash;