import { connect } from 'react-redux'
import FixedTable from '../components/charts/table/fixedTable.jsx'

import {getAggregatedDataSuccess,getAggregatedDataError, loadingData } from '../actions/baseTableActions';

import axios from 'axios'

class FixedTableContainer{
    constructor(name="") {
        this.name=name;
    }

    mapStateToProps = (state) => {
        const containerStates = state[this.name];
        return {
            data: containerStates.data,
            loading: containerStates.loading,
            error: containerStates.error
        };
    }


    mapDispatchToProps = (dispatch) => {
        return {
            getDataFromRequest:function(reqConfig, successCallBack=null){

                const {name} = this;
                dispatch(loadingData(name))
                axios(reqConfig)
                    .then(function(response){
                        const {data} =response
                        if(data && data.success){
                            dispatch(getAggregatedDataSuccess(name, data.data));
                        }else{
                            dispatch(getAggregatedDataError(name));
                        }
                    })
                    .catch(function(err){
                        dispatch(getAggregatedDataError(name));
                    })
            }
        }
    }
}

export default (name="")=>{
    let FixedTableContainerIns = new FixedTableContainer(name);
    return  connect(FixedTableContainerIns.mapStateToProps, FixedTableContainerIns.mapDispatchToProps)(FixedTable);
}
