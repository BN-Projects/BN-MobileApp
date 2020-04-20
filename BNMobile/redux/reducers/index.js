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
const rootReducer = combineReducers({
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
    changePassReducer
})
export default rootReducer

//tüm reducer'lar toplandı