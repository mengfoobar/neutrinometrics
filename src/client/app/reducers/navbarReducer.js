
import { EDIT_USER_SETTINGS} from '../actions/navbarActions.js';

const INITIAL_STATE = {showEditSettingsModal:false};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case EDIT_USER_SETTINGS:
            return { ...state, showEditSettingsModal:action.payload.show};
        default:
            return state;
    }
}