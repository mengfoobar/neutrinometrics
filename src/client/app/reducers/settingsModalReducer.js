import {LOADING_DATA, SERVER_CALL_FAILED, LOAD_USER_INFO_SUCCESS, UPDATE_USER_INFO_SUCCESS, RESET} from '../actions/settingsModalActions';

const INITIAL_STATE = {error:null, loading: false, data:null, updateSuccess:false};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOADING_DATA:
            return { ...state, error:null, loading: true, };
        case LOAD_USER_INFO_SUCCESS:  //loading retrieved info on screen
            return { ...state, data:action.payload.data, loading: false};
        case SERVER_CALL_FAILED:
            return { ...state, error:action.payload.error, loading: false, data:null}
        case UPDATE_USER_INFO_SUCCESS:
            return { ...state, error:null, loading: false, data:null, updateSuccess:true}
        case RESET:
            return { ...state, error:null, loading: false, data:null, updateSuccess:false}
        default:
            return state;
    }
}