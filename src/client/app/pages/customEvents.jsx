import moment from 'moment'
import React, {Component} from 'react';
import { Grid, Row,Col} from 'react-bootstrap';

import LineChartGen from '../containers/lineChartContainer'
import PageHeader from '../components/layouts/pageHeader.jsx'
import {DateRangePicker} from '../components/widgets/dateRangePicker.jsx'
import {getCustomEvents, getCustomEventsAggregation} from '../constants/reqConfigs'
import axios from 'axios'

import MultiSelect from 'react-select';
import 'react-select/dist/react-select.css';

import style from './styles/customEvents.css';


class CustomEventsDash extends Component {

    constructor() {
        super();
        this.handleDateRangeChange=this.handleDateRangeChange.bind(this);
        this.handleEventsSelectChange=this.handleEventsSelectChange.bind(this);

        this.state={
            startDate: moment().subtract(14, 'days').format("YYYY-MM-DD"),
            endDate: moment().format("YYYY-MM-DD"),
            totalEvents: [],
            selectedEvents: "",
        }
    }

    componentDidMount() {
        if(!this.props.appId ){
            return;
        }
        console.log("custom events mounted")
        const self=this;
        axios(getCustomEvents(this.props.appId)) //TODO; turn this into a container
            .then(function(result){
                if(result.status!==200 || !result.data && !result.data.data){
                    throw new Error("unable to retrieve events data")
                }

                self.setState({
                    totalEvents:result.data.data
                })
            })
            .catch(function(err){
                console.log(err.message)
            })
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(`comparing custom events states ${!Object.is(this.state, nextState)}`)
        return !Object.is(this.state, nextState)
    }

    handleEventsSelectChange (value) {
        this.setState({
            selectedEvents:value
        });
    }

    handleDateRangeChange(startDate, endDate) {
        this.setState({
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate:moment(endDate).format("YYYY-MM-DD") ,
        });
    }

    render() {
        const {startDate, endDate, selectedEvents, totalEvents} =this.state;
        const LineChart = LineChartGen("lineChartCustomEvents");

        return (
            <Grid className={style.eventsContainer} >
                <Row className="header-row" >
                    <PageHeader id="customEventsHeader" title="Custom Events" />
                </Row>
                <Row className="dateRange-container" >
                    <Col className={"label"} md={1}>
                        <span>Date Range: </span>
                    </Col>
                    <Col className={"widget"} md={5}>
                        <DateRangePicker ref="dateRangePicker" onChange={this.handleDateRangeChange}/>
                    </Col>
                </Row>
                <Row className={"events-multiSelect-container"} >
                    <Col md={1} className="label">
                        <span>Custom Events: </span>
                    </Col>
                    <Col md={3} className={"widget"} >
                        <MultiSelect
                            name="form-field-name"
                            multi
                            simpleValue
                            value={selectedEvents}
                            placeholder="Select custom events"
                            options={totalEvents}
                            onChange={this.handleEventsSelectChange}
                        />
                    </Col>
                </Row>
                <Row className={"chart-container"}>
                    <Col md={12}>
                        <LineChart name="lineChartCustomEvents" id="eventsLineChart" title="Overview"
                                   req={getCustomEventsAggregation(this.props.appId, selectedEvents, startDate, endDate)}/>
                    </Col>
                </Row>
            </Grid>
        )
    };
}

CustomEventsDash.propTypes = {
    label: React.PropTypes.string
};

export default CustomEventsDash;
