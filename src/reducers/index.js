// src/reducers/index.js
import { combineReducers } from 'redux';
import someReducer from './someReducer'; // Ensure this path is correct

const rootReducer = combineReducers({
  some: someReducer, // Add your reducers here
});

export default rootReducer;