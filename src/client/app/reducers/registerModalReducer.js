
import { REGISTERING, REGISTER_SUCCESS, REGISTER_FAILED, RESET} from '../actions/registerActions.js';

const INITIAL_STATE = {error:null, loading: false, success:false, username:"", password:"", projectId:"", accountInfo:null};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTERING:
            return { ...state, error:null, loading: true};
        case REGISTER_FAILED:
            return { ...state, error:action.payload.error, loading: false};
        case REGISTER_SUCCESS:
            console.log(action.payload)
            const {username, password, projectId} = action.payload.accountInfo
            return {
                ...state, error:null, loading: false, success:true,
                username:username, password:password, projectId:projectId,
                accountInfo:action.payload.accountInfo
            };
        case RESET:
            return { ...state, error:null, loading: false, success:false}
        default:
            return state;
    }
}