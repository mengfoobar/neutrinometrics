import React, {Component} from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import moment from 'moment'
import axios from 'axios'

import MultiSelect from 'react-select';

import {getAggregateUserEvents, getCustomEvents} from '../constants/reqConfigs'

import PageHeader from '../components/layouts/pageHeader.jsx'
import {DateRangePicker} from '../components/widgets/dateRangePicker.jsx'
import FixedTableContainer from '../containers/fixedTableContainer'





import style from './styles/userExplorerEvents.css';

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




class UserEventsExplorer extends Component {

    constructor() {
        super();

        this.handleDateRangeChange=this.handleDateRangeChange.bind(this);

        this.state={
            startDate: moment().subtract(14, 'days').format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            dataCols: [],
            selectedDataCols: "",
            topRowsShown:100
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return !Object.is(this.state, nextState)
    }

    componentDidMount() {

        if(!this.props.appId){
            return;
        }


        const self=this;
        axios(getCustomEvents(this.props.appId)) //TODO; turn this into a container
            .then(function(result){
                if(result.status!==200 || !result.data && !result.data.data){
                    throw new Error("unable to retrieve events data")
                }
                const eventsList=result.data.data;
                const selectedEvents=eventsList.map(function(event){
                    return event.value;
                }).join(",");

                eventsList.unshift({"label":"Total Events", "value":"totalEvents", width:180});
                eventsList.unshift({"label":"Custom ID", "value":"customId", width:225});
                eventsList.unshift({"label":"Generated ID", "value":"userId"});

                self.setState({
                    dataCols:eventsList,
                    selectedDataCols:selectedEvents
                })
            })
            .catch(function(err){
                console.log(err.message)
            })
    }


    handleDateRangeChange(startDate, endDate) {
        this.setState({
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate:moment(endDate).format("YYYY-MM-DD") ,
        });
    }

    render() {
        const FixedDataTable = FixedTableContainer("fixedTableUserEvents")

        const {topRowsShown,dataCols, selectedDataCols, startDate, endDate} = this.state;

        return (
            <Grid className={style.userEventsContainer}>
                <Row className="header-row">
                    <PageHeader   title="User Events" />
                </Row>
                <Row className="dateRange-row">
                    <Col  className="label" md={1} >
                        <span style={{
                            fontSize: 23, fontFamily: "'Quicksand', sans-serif",
                            fontWeight: 'bold', color: '#666666'}}>Date Range: </span>
                    </Col>
                    <Col md={5} style={{margin:0, padding:0}}>
                        <DateRangePicker ref="dateRangePicker" onChange={this.handleDateRangeChange}/>
                    </Col>
                </Row>
                <Row className="show-rows-select" style={{padding: "5px 0px 0px 70px", height:60}}>
                    <Col md={1} className="label">
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
                            placeholder="Select Rows to Show"
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
                    <FixedDataTable  name="fixedTableUserEvents"
                                     columns={dataCols}
                                     req={getAggregateUserEvents(this.props.appId, startDate, endDate, selectedDataCols, topRowsShown)}/>
                </Row>
            </Grid>
        )
    };
}


export default UserEventsExplorer;