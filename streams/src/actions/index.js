import streams from "../api/streams";
import actionTypes from "./actionTypes";
import browserHistory from "../browserHistory";

export const signIn = (userId) => {
  return {
    type: actionTypes.SIGN_IN,
    payload: userId
  };
}
export const signOut = () => {
  return {
    type: actionTypes.SIGN_OUT
  };
}

/*Creating a post request to create a stream */
/*using redux thunk here so passing directly to dispatch function and getState to access the state */
export const createStream = formValues => async (dispatch, getState) => {

  const userId = getState().auth.userId;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({
    type: actionTypes.CREATE_STREAM,
    payload: response.data
  });

  /*Programmatically Navigating user to home screen after creating a stream */
  browserHistory.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: actionTypes.FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: actionTypes.FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: actionTypes.EDIT_STREAM, payload: response.data });

  /*Programmatically Navigating user to home screen after creating a stream */
  browserHistory.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: actionTypes.DELETE_STREAM, payload: id });

  /*Programmatically Navigating user to home screen after creating a stream */
  browserHistory.push('/');
};

