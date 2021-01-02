import {
  GET_ALL_ASSIGNMENTS,
  SUBMIT_ASSIGNMENT,
  EVALUATE_ASSIGNMENT,
  GET_ALL_STD,
} from '../actions/actionTypes';

const initialState = {
  assignments: [],
  students: [],
  success: null,
  error: null,
};

export default function assignment(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.assignments,
      };
    case SUBMIT_ASSIGNMENT:
      return {
        ...state,
        success: action.message,
      };
    case EVALUATE_ASSIGNMENT:
      return {
        ...state,
        success: action.message,
      };
    case GET_ALL_STD:
      return {
        ...state,
        students: action.std,
      };
    default:
      return state;
  }
}
