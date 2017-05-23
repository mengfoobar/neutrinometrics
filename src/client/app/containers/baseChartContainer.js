import {getAggregationData, getAggregatedDataSuccess,getAggregatedDataError, loadingData } from '../actions/baseChartActions.js';

import axios from 'axios'

import {SERVER_ROOT_URL} from '../constants/config.js'
const ROOT_URL=`${SERVER_ROOT_URL}/project`

export default class BaseChartContainer {
    constructor(name) {
        this.name=name
    }

    mapStateToProps = (state) => {
        const containerStates = state[this.name];
        return {...containerStates};
    }

    mapDispatchToProps = (dispatch) => {
        return {
            getAggregationData: (appId, startDate, endDate, metric) => {
                const {name} = this;

                if(!appId || !metric){
                    dispatch(getAggregatedDataSuccess(name, [])) //TODO: add error handling
                    return;
                }


                const reqConfig={
                    method: 'get',
                    url: ROOT_URL,
                    headers: [],
                    params: {
                        appid: appId,
                        startDate: startDate,
                        endDate: endDate,
                        metric: metric
                    }
                }


                dispatch(getAggregationData(name, metric))

                axios(reqConfig)
                    .then(function(response){
                        const {data} =response
                        if(data && data.success){
                            dispatch(getAggregatedDataSuccess(name, data.data)) //TODO: add error handling
                        }else{
                            dispatch(getAggregatedDataError(name)) //TODO: add error handling
                        }
                    })
                    .catch(function(err){
                        dispatch(getAggregatedDataError(name)) //TODO: add error handling
                    })

            },
            getDataFromRequest:function(reqConfig, successCallBack=null){
                const {name} = this;
                dispatch(loadingData(name))
                axios(reqConfig)
                    .then(function(response){
                        const {data} =response;
                        if(data && data.success){
                            setTimeout(dispatch(getAggregatedDataSuccess(name, data.data)) //TODO: add error handling
                            , 5000)
                        }else{
                            dispatch(getAggregatedDataError(name)) //TODO: add error handling
                        }
                    })
                    .catch(function(err){
                        dispatch(getAggregatedDataError(name)) //TODO: add error handling
                    })
            }
        }
    }
}
