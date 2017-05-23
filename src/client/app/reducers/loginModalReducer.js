
import { LOGGING_IN, LOGIN_FAILED, RESET} from '../actions/loginActions.js';

const INITIAL_STATE = {error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOGGING_IN:
            return { ...state, error:null, loading: true};
        case LOGIN_FAILED:
            return { ...state, error:action.payload.error, loading: false};
        case RESET:
            return { ...state, error:null, loading: false}
        default:
            return state;
    }
}