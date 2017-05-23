export const LOADING_DATA = 'LOADING_DATA';
export const SERVER_CALL_FAILED = 'SERVER_CALL_FAILED';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const RESET = 'RESET';






export const loadData=()=>{
    return {
        type: LOADING_DATA
    };
}

export const loadUserInfoSuccess=(data=null)=>{
    return {
        type: LOAD_USER_INFO_SUCCESS,
        payload:{
            data:data
        }
    };
}

export const updateUserInfoSuccess=()=>{
    return {
        type: UPDATE_USER_INFO_SUCCESS
    };
}


export const serverCallFailed=(message)=>{
    return {
        type: SERVER_CALL_FAILED,
        payload:{
            error: message
        }
    };
}

export const reset=()=>{
    return {
        type: RESET
    };
}

