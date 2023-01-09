import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  isLoggedHomeIn: false,
  userInfo: null,
  userHomeInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };

    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.USER_LOGIN_HOME_SUCCESS:
      return {
        ...state,
        isLoggedHomeIn: true,
        userHomeInfo: action.userHomeInfo,
      };

    case actionTypes.USER_LOGIN_HOME_FAIL:
      return {
        ...state,
        isLoggedHomeIn: false,
        userHomeInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedHomeIn: false,
        userInfo: null,
        userHomeInfo: null,
      };

    default:
      return state;
  }
};

export default appReducer;
