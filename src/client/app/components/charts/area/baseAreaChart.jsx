import React, {PropTypes} from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './toolTip.css'

const CustomTooltip  = React.createClass({
    render() {
        const { active } = this.props;

        if (active) {
            const { date, value } = this.props;
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Date: ${date}`}</p>
                    <p className="intro">{`Value: ${value}`}</p>
                </div>
            );
        }

        return null;
    }
});



class BaseAreaChart extends React.Component {

    //TODO: handle null when implmenting redux
    constructor() {
        super();
    }


    render () {

        const { data,  loading, error, yLabel } = this.props;

        if(loading) {
            return <div className="container"><h1>Loading...</h1></div>
        } else if(error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        } else if(!data || data.length<=0){
            return <div className="container"><h1>Empty data</h1></div>
        }

        return (

            <ResponsiveContainer>
                <AreaChart data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{left: 50}} height={30} width={120}
                            content={
                                <div>
                                    <svg height="12" width="12" >
                                        <circle  cx="6" cy="6" r="6" stroke="rgb(130, 202, 157)" fill="rgb(49, 130, 189)" fillOpacity="0.6" />
                                    </svg>
                                    <span style={{paddingLeft:8}}>{yLabel}</span>
                                </div>
                            } />

                    <Area type="linear" dataKey="value" stroke="#82ca9d" dot={{r: 3}}/>
                </AreaChart>
            </ResponsiveContainer>

        );
    }
}

export default BaseAreaChart
