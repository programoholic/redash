import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  pattern: "",
  keys: "",
  privateKey: "",
  appId: "",
  searchResult: [],
  url: "",
  loading: false,
  hasError: false,
};

const reducer = (state = initialState, action) => {
  let newState = null;
  switch (action.type) {
    case ACTION_TYPES.SEARCH_STARTED:
      newState = {
        ...state,
        pattern: action.value,
        loading: true,
        hasError: false,
      };
      return newState;
    case ACTION_TYPES.SEARCH_COMPLETED:
      newState = { ...state, loading: false, searchResult: action.value };
      return newState;
    case ACTION_TYPES.SEARCH_FAILED:
      newState = { ...state, loading: false, hasError: true };
      return newState;
    case ACTION_TYPES.DELETE_STARTED:
      newState = { ...state, loading: true, hasError: false };
      return newState;
    case ACTION_TYPES.DELETE_COMPLETED:
      newState = { ...state, loading: false, hasError: false };
      return newState;
    case ACTION_TYPES.DELETE_FAILED:
      newState = { ...state, loading: false, hasError: true };
      return newState;
    default:
      return state;
  }
};

export default reducer;
