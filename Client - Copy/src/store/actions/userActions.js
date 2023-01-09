import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) =>({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})
export const userLoginHomeSuccess = (userHomeInfo) =>({
    type: actionTypes.USER_LOGIN_HOME_SUCCESS,
    userHomeInfo: userHomeInfo
})

export const userLoginHomeFail = () => ({
    type: actionTypes.USER_LOGIN_HOME_FAIL
})

export const userRegisterSuccess = (userInfo) =>({ //new
    type: actionTypes.USER_REGISTER_SUCCESS,
    userInfo: userInfo
})
export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
})