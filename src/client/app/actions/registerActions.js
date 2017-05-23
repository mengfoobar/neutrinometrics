export const REGISTERING = 'REGISTERING';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const RESET = 'RESET';


export const registeringUser=()=>{
    return {
        type: REGISTERING
    };
}

export const registerUserFailed=(message)=>{
    return {
        type: REGISTER_FAILED,
        payload:{
            error: message
        }
    };
}

export const registerUserSuccess=(accountInfo)=>{
    return {
        type: REGISTER_SUCCESS,
        payload:{
            accountInfo:accountInfo
        }
    };
}

export const resetRegisterModal=()=>{
    return {
        type: RESET
    };
}


