import actionTypes from "../actions/actionTypes";

const INITIAL_AUTH_STATUS = {
  isSignedIn: null,
  userId: null
};

const authReducer = (state = INITIAL_AUTH_STATUS, action) => {
  switch(action.type){
    case actionTypes.SIGN_IN:
      return {...state, isSignedIn: true, userId: action.payload};
    case actionTypes.SIGN_OUT:
      return {...state, isSignedIn: false, userId: null};
    default:
      return state;
  }
}

export default authReducer;