export const EDIT_USER_SETTINGS = "EDIT_USER_SETTINGS";




export const editUserSettings=(show)=>{
    return {
        type: EDIT_USER_SETTINGS,
        payload:{
            show:show
        }
    };
}

