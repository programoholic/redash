import axiosClient from "../../core/axios";
import * as ACTION_TYPES from "./actionTypes";

function searchStarted(value) {
  return {
    type: ACTION_TYPES.SEARCH_STARTED,
    value,
  };
}
function searchCompleted(value) {
  return {
    type: ACTION_TYPES.SEARCH_COMPLETED,
    value,
  };
}
function searchFailed(value) {
  return {
    type: ACTION_TYPES.SEARCH_FAILED,
    value,
  };
}

function editStarted(value) {
  return {
    type: ACTION_TYPES.EDIT_STARTED,
    value,
  };
}
function editCompleted(value) {
  return {
    type: ACTION_TYPES.EDIT_COMPLETED,
    value,
  };
}
function editFailed(value) {
  return {
    type: ACTION_TYPES.EDIT_FAILED,
    value,
  };
}
function deleteStarted(value) {
  return {
    type: ACTION_TYPES.DELETE_STARTED,
    value,
  };
}
function deleteCompleted(value) {
  return {
    type: ACTION_TYPES.DELETE_COMPLETED,
    value,
  };
}
function deleteFailed(value) {
  return {
    type: ACTION_TYPES.DELETE_FAILED,
    value,
  };
}
export const searchKeys = (searchTerm) => {
  return (dispatch) => {
    dispatch(searchStarted(searchTerm));
    fetchRedisKeys(searchTerm)
      .then((keys) => {
        dispatch(searchCompleted(keys));
      })
      .catch((err) => {
        dispatch(searchFailed(err));
      });
  };
};
export const editKey = (key, value) => {
  return (dispatch) => {
    dispatch(editStarted(key));
    editRedisKeys(key, value)
      .then((result) => {
        dispatch(editCompleted(result));
      })
      .catch((err) => {
        dispatch(editFailed(err));
      });
  };
};

export const deleteKey = (key) => {
  return (dispatch) => {
    dispatch(deleteStarted(key));
    deleteRedisKeys(key)
      .then((result) => {
        dispatch(deleteCompleted(result));
      })
      .catch((err) => {
        dispatch(deleteFailed(err));
      });
  };
};

const fetchRedisKeys = async (pattern) => {
  try {
    const result = await axiosClient.get(`/redis_management/keys/${pattern}`);
    console.log("** result : ", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
const editRedisKeys = async (key, value) => {
  try {
    const result = await axiosClient.put(`/redis_management/keys`, {
      key: key,
      value: value,
    });
    console.log("** result : ", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
const deleteRedisKeys = async (key) => {
  try {
    const result = await axiosClient.delete(`/redis_management/keys/${key}`);
    console.log("** result : ", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
};
