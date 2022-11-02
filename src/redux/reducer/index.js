import {combineReducers} from 'redux';
import getContactReducer from './getContact';

const reducers = combineReducers({
  getContact: getContactReducer,
});

export default reducers;
