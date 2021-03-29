import { combineReducers } from 'redux';
//import user from './user_reducer';
import mapReducer from './map_reducer';
import shipReducer from './ship_reducer';

const rootReducer = combineReducers({
    // user,
    mapReducer,
    shipReducer
});

export default rootReducer;