import _ from 'lodash';
import actionTypes from "../actions/actionTypes";

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STREAMS:
      /* returns an object after merging all the object using the 'id' as key for each object */
      return {...state, ..._.mapKeys(action.payload, 'id')};

    case actionTypes.FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case actionTypes.EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload};

    case actionTypes.CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload};

    case actionTypes.DELETE_STREAM:
      return _.omit(state, action.payload.id); /*delete a object by key */

    default:
      return state;
  }
}

export default streamsReducer;