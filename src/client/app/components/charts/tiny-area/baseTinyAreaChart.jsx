import React from 'react'
import {AreaChart, Area, ResponsiveContainer} from 'recharts';


class BaseTinyAreaChart extends React.Component {

    //TODO: handle null when implmenting redux
    constructor() {
        super();
    }

    render () {
        const { data} = this.props

        return (

            <ResponsiveContainer>
                <AreaChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                    <Area type="linear" dataKey="value"  stroke='#8884d8' fill='#c7c5ed' />
                </AreaChart>
            </ResponsiveContainer>

        );
    }
}

export default BaseTinyAreaChart
