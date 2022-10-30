import { combineReducers } from 'redux';
import alertReducer from './alertReducer'

const allReducers = combineReducers({
    // alertInitialState: alertReducer
    alertReducer,

});
export default allReducers;