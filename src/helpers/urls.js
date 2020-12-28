const API_ROOT = 'http://localhost:8000/api/v1';
export const APIUrls = {
  login: () => `${API_ROOT}/user/login`,
  signup: () => `${API_ROOT}/user/register`,
  update: () => `${API_ROOT}/user/update`,
  createAllAssignment: () => `${API_ROOT}/assignment/create`,
  submitAssignment: () => `${API_ROOT}/assignment/submit`,
  evaluateAssignment: () => `${API_ROOT}/assignment/evalutate`,
  getAllAssignment: () => `${API_ROOT}/assignment/all-assignments`,
};
