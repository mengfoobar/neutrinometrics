import { editUserSettings} from '../actions/navbarActions';
import { connect } from 'react-redux'
import NavbarComponent from '../components/layouts/navbar.jsx'

const  mapStateToProps = (state) => {
    const {navbar} = state;
    return {
        showEditSettingsModal: navbar.showEditSettingsModal
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleEditSettingsModal: (show) => {
            dispatch(editUserSettings(show))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
