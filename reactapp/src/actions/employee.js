import {EMPLYEE_LIST} from '../constants/emplyeeActionTypes';
import axios from 'axios';

const apiUrl ="http://localhost:4000";

export const fetchEmplyees = (employeeList) => {
    return {
      type: EMPLYEE_LIST,
      employeeList
    }
};

export const fetchAllEmplyees = () => {
    const fetchAllEmplyeesEndpoint = apiUrl + '/users'
    return (dispatch) => {
      return axios.get(fetchAllEmplyeesEndpoint)
        .then(response => {
          dispatch(fetchEmplyees(response.data));
        })
        .catch(error => {
          throw(error);
        });
    };
};

  export const addEmplyee = (emplyee) => {
    const newEmplyeesEndpoint = apiUrl + '/users/new'
    return (dispatch) => {
      return axios.post(newEmplyeesEndpoint,emplyee)
        .then(response => {
          dispatch(fetchAllEmplyees());
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const editEmplyee = (emplyee) => {
    const editEmplyeesEndpoint = apiUrl + '/users/edit'
    return (dispatch) => {
      return axios.patch(editEmplyeesEndpoint,emplyee)
        .then(response => {
          dispatch(fetchAllEmplyees());
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  

  export const deleteEmplyees = (rows) => {
    const deleteEmplyeesEndpoint = apiUrl + '/users/delete'
    return (dispatch) => {
      return axios.delete(deleteEmplyeesEndpoint,rows)
        .then(response => {
          dispatch(fetchAllEmplyees());
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  