import React from 'react';

import {ResponsiveContainer, PieChart, Pie,Cell, Legend} from 'recharts';

import {genRandomSubset} from '../../../utils/colorHelper.jsx';

import './style.css'

class BasePieChart extends React.Component  {

    constructor(props) {
        super(props);
    }

    render () {
        const data = this.props.data;
        // const total = this.props.data.reduce(function(a, b) {
        //     return a.value+b.value;
        // }, 0);
        //console.log(`Total value of piechart is ${total}`);
        const colorsSubset = genRandomSubset(data.length)

        return (
            <ResponsiveContainer>
                <PieChart style={{ paddingTop: 40}} className="chart pie container">
                    <Pie
                        startAngle={90} endAngle={-270}
                        data={data} fill="#8884d8" label={modifyLegend} innerRadius={'40%'} outerRadius={'75%'}>
                        {
                            data.map((entry, index) => <Cell fill={colorsSubset[index % colorsSubset.length]}/>)
                        }
                    </Pie>
                    <Legend verticalAlign="top" align="left" layout="horizontal"  wrapperStyle={{ left:40 }} />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default BasePieChart



const modifyLegend=(datum)=>{
    return `${Math.floor(datum.percent*100)}%`
}

