import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  authData: authReducer,
});

export default rootReducer;
