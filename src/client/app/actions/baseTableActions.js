export const GET_AGGREGATED_DATA_SUCCESS = 'GET_AGGREGATED_DATA_SUCCESS';
export const GET_AGGREGATED_DATA_ERROR= 'GET_AGGREGATED_DATA_ERROR';
export const LOADING_DATA= 'LOADING_DATA';


export const getAggregatedDataSuccess=(name, dataSet)=>{
    return {
        type: GET_AGGREGATED_DATA_SUCCESS,
        name: name,
        payload: {
            data: dataSet
        }
    };
}

export const getAggregatedDataError=(name, error="")=>{
    return {
        type: GET_AGGREGATED_DATA_ERROR,
        name: name,
        payload: {
            error: error
        }
    };
}

export const loadingData=(name)=>{
    return {
        type: LOADING_DATA,
        name: name
    };
}