export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const RESET = 'RESET';




export const loggingUserIn=()=>{
    return {
        type: LOGGING_IN
    };
}

export const loginUserFailed=(message)=>{
    return {
        type: LOGIN_FAILED,
        payload:{
            error: message
        }
    };
}

export const resetLoginModal=()=>{
    return {
        type: RESET
    };
}

