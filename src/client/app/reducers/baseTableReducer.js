import {GET_AGGREGATED_DATA_SUCCESS, GET_AGGREGATED_DATA_ERROR, LOADING_DATA} from '../actions/baseTableActions'

const INITIAL_STATE = {data:[], columns:[], error:null, loading:false}

export default (chartName = '') => {
    return function(state = INITIAL_STATE, action) {
        const {name} = action;
        if(name !== chartName) return state;

        switch(action.type) {
            case GET_AGGREGATED_DATA_SUCCESS:// return list of posts and make loading = false
                return { ...state, loading:false, error:null, data:action.payload.data };
            case GET_AGGREGATED_DATA_ERROR:// return list of posts and make loading = false
                return { ...state, loading:false, error:true, data:[]};
            case LOADING_DATA:// return list of posts and make loading = false
                return { ...state, loading:true, error:null, data:[]};
            default:
                return state;
        }
    }
}
