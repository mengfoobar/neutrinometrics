import React, {PropTypes} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {randomFlatUIColor} from '../../../utils/colorHelper.jsx';
import Loading from '../../layouts/loadingLayout.jsx';
import ErrorMsg from '../../layouts/errorLayout.jsx'
import EmptyData from '../../layouts/emptyData.jsx'


class BaseLineChart extends React.Component {

    //TODO: handle null when implmenting redux
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getDataFromRequest(this.props.req)
    }

    render () {

        let { data,  loading, error} = this.props;

        if(loading) {
            return <Loading />
        } else if(error){
            return <ErrorMsg/>
        } else if(!data || data.length<=0){
            return <EmptyData />
        }else{
            return (

                <ResponsiveContainer>
                    <LineChart  data={data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        {
                            Object.keys(data[0]).map((key, index) => {
                                if(key!=="date"){
                                    const lineColor=randomFlatUIColor()
                                    return (
                                        <Line type="monotone" dataKey={key} stroke={lineColor} activeDot={{r: 6}}/>
                                    )
                                }
                            })
                        }
                    </LineChart>

                </ResponsiveContainer>

            );
        }


    }
}

export default BaseLineChart