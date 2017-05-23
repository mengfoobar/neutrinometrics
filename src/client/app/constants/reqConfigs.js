import {SERVER_ROOT_URL} from './config.js'
const SESSION_URL = `${SERVER_ROOT_URL}/session`
const USER_URL = `${SERVER_ROOT_URL}/user`
const PROJECT_URL = `${SERVER_ROOT_URL}/project`



export const getSessionActive=()=>{
    return  {
        method: 'get',
        url: SESSION_URL
    }
}

export const postSessionLoginUser=(email, password)=>{
    return {
        method: 'post',
        url: SESSION_URL,
        data: {
            email: email,
            password: password
        }
    }
}

export const postRegisterUser=(payload)=>{
    return {
        method: 'post',
        url: USER_URL,
        data: payload
    }
}

export const destroySession=()=>{
    return  {
        method: 'delete',
        url: SESSION_URL
    }
}


export const updateUserInfo=(userInfo)=>{
    return  {
        method: 'put',
        url: USER_URL,
        data: userInfo
    }
}

export const updateProjectInfo=(prjInfo)=>{
    return  {
        method: 'put',
        url: `${PROJECT_URL}`,
        params:{
            "appid":prjInfo.id
        },
        data: prjInfo
    }
}



export const getCustomEvents=(prjId)=>{
    return  {
        method: 'get',
        url: `${PROJECT_URL}/${prjId}/events`,
        params:{
            appid:prjId
        }
    }
}

export const getCustomEventsAggregation=(prjId, selectedEvents, startDate, endDate)=>{
    return  {
        method: 'get',
        url: `${PROJECT_URL}/events/data`,
        params: {
            appid:prjId,
            startDate: startDate,
            endDate: endDate,
            events:selectedEvents
        }

    }
}

export const getAppUserData=(prjId, startDate, endDate, limit)=>{
    return  {
        method: 'get',
        url: `${PROJECT_URL}/users/data`,
        params: {
            appid:prjId,
            startDate: startDate,
            endDate: endDate,
            limit:limit
        }

    }
}

export const getAggregateUserEvents=(prjId, startDate, endDate, selectedEvents, limit)=>{
    return  {
        method: 'get',
        url: `${PROJECT_URL}/events/users`,
        params: {
            appid:prjId,
            startDate: startDate,
            endDate: endDate,
            events:selectedEvents,
            limit:limit
        }

    }
}