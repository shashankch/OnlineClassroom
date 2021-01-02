import {
  GET_ALL_ASSIGNMENTS,
  SUBMIT_ASSIGNMENT,
  EVALUATE_ASSIGNMENT,
  LOG_OUT,
  CREATE_ASSIGNMENT,
  GET_ALL_STD,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';
//import axios from 'axios';
export function getAssignments() {
  return (dispatch) => {
    const url = APIUrls.getAllAssignments();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // dispatch action to save user

          dispatch(getAllAssignments(data.data.assignments));

          return;
        }
      });
  };
}

export function getAllStudents() {
  return (dispatch) => {
    const url = APIUrls.getAllStudents();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // dispatch action to save user

          dispatch(getStudents(data.data.students));

          return;
        }
      });
  };
}

export function submit(somedata) {
  console.log('data^^^^', somedata);
  return (dispatch) => {
    const url = APIUrls.submitAssignment();
    const token = getAuthTokenFromLocalStorage();
    console.log('are yeh url:', url);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: somedata,
    };
    // delete options.headers['Content-Type'];
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('are idhar :', data);

        dispatch(submitAssignment(data.message));
      });
  };
}
export function evaluate(aid, sid, grade) {
  return (dispatch) => {
    const url = APIUrls.evaluateAssignment();
    const token = getAuthTokenFromLocalStorage();
    console.log('are yeh url:', url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ aid, sid, grade }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('are idhar :', data);

        dispatch(evaluateAssignment(data.message));
        dispatch(getAssignments());
      });
  };
}

export function create(title, description, id) {
  console.log('eyah id dd', id);
  return (dispatch) => {
    const url = APIUrls.createAssignment();
    const token = getAuthTokenFromLocalStorage();
    console.log('are yeh url:', url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ title, description, id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('are idhar :', data);

        dispatch(createAssignment(data.message));
        dispatch(getAssignments());
      });
  };
}

export function getAllAssignments(assignments) {
  return {
    type: GET_ALL_ASSIGNMENTS,
    assignments,
  };
}
export function submitAssignment(message) {
  return {
    type: SUBMIT_ASSIGNMENT,
    message,
  };
}
export function evaluateAssignment(message) {
  return {
    type: EVALUATE_ASSIGNMENT,
    message,
  };
}
export function createAssignment(message) {
  return {
    type: CREATE_ASSIGNMENT,
    message,
  };
}
export function getStudents(std) {
  return {
    type: GET_ALL_STD,
    std,
  };
}
