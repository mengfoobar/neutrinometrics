import React, { Component } from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import ColLayout from '../grid-layout/colWrapper.jsx'
import {FormControl} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import 'react-day-picker/lib/style.css';
import './styles/range.css';


const overlayStyle = {
    position: 'absolute',
    background: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};

export class DateRangePicker extends Component {

    constructor(props) {
        super(props);

        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleGlobalMouseDown = this.handleGlobalMouseDown.bind(this);
        this.handleInputClick=this.handleInputClick.bind(this);
        let fromDate=moment().subtract(14, 'days').toDate();
        let toDate=new Date();
        let textVal = `${moment(fromDate).format("MMM D, YYYY")} - ${moment(toDate).format("MMM D, YYYY")}`

        this.state = {
            showOverlay: false,
            value:textVal ,
            isSelectingLastDay: false,
            from: fromDate,
            to: toDate,
            mouseInDateRange:false
        };

    }

    handleGlobalMouseDown(e){
        if(this.state.showOverlay && !this.state.mouseInDateRange &&!this.state.mouseInInput){
            this.setState({
                showOverlay:false
            })
        }
    }

    componentDidMount(){
        window.addEventListener("mousedown", this.handleGlobalMouseDown);
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.handleGlobalMouseDown);
    }

    handleDayClick(e, day) {
        const { from, isSelectingLastDay } = this.state;
        // Enable day selection on mouse enter
        if (!isSelectingLastDay) {

            this.setState({
                isSelectingLastDay: true,
                from: day,
                to: null,
            });
        }
        if (isSelectingLastDay && from && day < from) {
            // Reset the from-day if the clicked day is before the current from-day
            this.setState({
                from: day,
                to: null,
            });
        }

        if (isSelectingLastDay) {
            const {from,to}= this.state;
            // Unset the day selection on mouse enter
            this.setState({
                isSelectingLastDay: false,
                showOverlay:false,
                value: `${moment(from).format("MMM D, YYYY")} - ${moment(to).format("MMM D, YYYY")}`
            });

            this.props.onChange(this.state.from, this.state.to)
        }
    }

    handleMouseEnter(e, day) {
        const { isSelectingLastDay, from } = this.state;
        if (!isSelectingLastDay || (from && day < from) || DateUtils.isSameDay(day, from)) {
            return;
        }
        this.setState({
            to: day
        });
    }

    handleInputClick (e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showOverlay:!this.state.showOverlay})
    }

    render() {
        const { from, to } = this.state;

        return (
            <div className="dateRangePicker">
                <FormControl
                    id="formControlsText"
                    type="text"
                    ref={ (el) => { this.input = el; } }
                    style={{ color : 'transparent', textShadow : '0 0 0 #555', cursor:"pointer",display:'inline-block'}}
                    placeholder="Select date range"
                    value={this.state.value}
                    onClick={this.handleInputClick}
                    onMouseEnter={ ()=>{this.setState({mouseInInput:true})}}
                    onMouseLeave={ ()=>{this.setState({mouseInInput:false})}}
                />
                <FontAwesome name="calendar" style={{display:'inline-block', fontSize: 22, marginLeft: -30, color: '#666666',cursor:"pointer"}}
                             onClick={this.handleInputClick}
                             onMouseEnter={ ()=>{this.setState({mouseInInput:true})}}
                />

                { this.state.showOverlay &&
                <div style={ { position: 'relative', zIndex:100} }
                     onMouseEnter={ ()=>{this.setState({mouseInDateRange:true})}}
                     onMouseLeave={ ()=>{this.setState({mouseInDateRange:false})}}>
                    <div style={ overlayStyle }>
                        <DayPicker className="Range"
                            numberOfMonths={ 2 }
                            toMonth={ new Date() }
                            selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                            disabledDays={ day => day > new Date() }
                            modifiers={ {
                                from: day => DateUtils.isSameDay(day, from),
                                to: day => DateUtils.isSameDay(day, to),
                            } }
                            initialMonth={this.state.from}
                            onDayClick={ this.handleDayClick }
                            onDayMouseEnter={ this.handleMouseEnter }
                        />
                    </div>
                </div>
                }
            </div>
        );
    }
}


export class DateRangePickerCol extends React.Component  {
    render () {
        return(
            <ColLayout colSpan={12} id="mainDateRangePicker" >
                <DateRangePicker/>
            </ColLayout>
        )
    }
}
