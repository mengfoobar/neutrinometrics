import {loadUserInfoSuccess, loadData, serverCallFailed, updateUserInfoSuccess, reset} from '../actions/settingsModalActions.js';
import { connect } from 'react-redux'
import EditUserSettings from '../components/modals/editUserSettings.jsx'

import {getSessionActive, updateUserInfo, updateProjectInfo} from '../constants/reqConfigs.js'

import axios from 'axios'
import Promise from 'bluebird'

const  mapStateToProps = (state) => {
    const {settingsModal} = state;

    return {
        loading: settingsModal.loading,
        error: settingsModal.error,
        data: settingsModal.data,
        updateSuccess: settingsModal.updateSuccess
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSessionUserInfo:()=>{
            dispatch(loadData())
            axios(getSessionActive())
                .then(function(result){
                    if(result.status===200){
                        if(result && result.data && result.data.apps && result.data.apps[0]){
                            dispatch(loadUserInfoSuccess(result.data))
                        }
                    }else{
                        dispatch(serverCallFailed("Error: was unable to retrieve user info"))
                    }
                })

        },
        updateSettings:(userInfo, appInfoArr)=>{
            dispatch(loadData())

            let promiseArr=[];
            promiseArr.push(axios(updateUserInfo(userInfo)))
            for(let i =0; i<appInfoArr.length; i++){
                promiseArr.push( axios(updateProjectInfo(appInfoArr[i])))
            }

            Promise.all(promiseArr)
                .then(function(results){
                    if(results){
                        dispatch(updateUserInfoSuccess())
                    }else{
                        dispatch(serverCallFailed("unable to update settings"))
                    }
                })


        },
        reset:()=>{
            dispatch(reset())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserSettings);
