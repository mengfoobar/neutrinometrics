import {GET_AGGREGATION, GET_AGGREGATED_DATA_SUCCESS, GET_AGGREGATED_DATA_ERROR, LOADING_DATA} from '../actions/baseChartActions.js'

const INITIAL_STATE = {data:[], error:null, loading:false, metric:"", startDate:"", endDate:""}

export const createChartReducerInstance=(chartName = '') => {
    return function(state = INITIAL_STATE, action) {
        let error;

        const {name} = action;
        if(name !== chartName) return state;

        switch(action.type) {

            case GET_AGGREGATION:// start fetching posts and set loading = true
                return { ...state, loading:true, error:null, metric:action.payload.metric};
            case GET_AGGREGATED_DATA_SUCCESS:// return list of posts and make loading = false
                return { ...state, loading:false, error:null, data:action.payload.data };
            case GET_AGGREGATED_DATA_ERROR:// return list of posts and make loading = false
                return { ...state, loading:false, error:true};
            case LOADING_DATA:// return list of posts and make loading = false
                return { ...state, loading:true, error:null};
            default:
                return state;
        }
    }
}
