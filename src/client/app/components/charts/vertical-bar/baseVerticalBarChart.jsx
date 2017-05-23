import React from 'react';

import {ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class BaseVerticalBarChart extends React.Component  {

    constructor(props) {
        super(props);
    }

    render () {
        const {data, barColor, yAxisWidth} = this.props;

        if(data.length>10){
            data.length=10;
        }

        return (
            <ResponsiveContainer>
                <ComposedChart layout="vertical"
                               margin={{top: 20, right: 20, bottom: 20, left: 20}}
                               data={
                                   this.props.yAxisCustom?
                                       data.map((d)=>{
                                           return this.props.yAxisCustom(d.name)
                                       }) : data
                               }>
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category" width={yAxisWidth}/>
                    <Tooltip/>
                    <CartesianGrid stroke='#f5f5f5'/>
                    <Bar dataKey='value' barSize={20} fill={barColor}>

                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        );
    }
}


export default BaseVerticalBarChart
