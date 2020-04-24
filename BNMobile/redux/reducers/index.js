import {combineReducers} from 'redux'
import changePageReducer from './changePageReducer'
import loginReducer from './loginReducer'
import beaconListReducer from './beaconListReducer'
import beaconDetailReducer from './beaconDetailReducer';
import beaconEditReducer from './beaconEditReducer';
import profileReducer from './profileReducer';
import profileEditReducer from './profileEditReducer';
import lostBeaconListReducer from './lostBeaconListReducer';
import lostBeaconReducer from './lostBeaconReducer';
import changePassReducer from './changePassReducer';
import logoutReducer from './logoutReducer';
import beaconRangeReducer from './beaconRangeReducer';
const appReducer = combineReducers({
    changePageReducer,
    loginReducer,
    beaconListReducer,
    beaconDetailReducer,
    beaconEditReducer,
    profileReducer,
    profileEditReducer,
    lostBeaconListReducer,
    lostBeaconReducer,
    changePageReducer,
    changePassReducer,
    logoutReducer,
    beaconRangeReducer
})
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action)
  }
export default rootReducer

//tüm reducer'lar toplandı