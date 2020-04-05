import {combineReducers} from 'redux'
import changePageReducer from './changePageReducer'
import loginReducer from './loginReducer'
import beaconListReducer from './beaconListReducer'
import beaconDetailReducer from './beaconDetailReducer';
import beaconEditReducer from './beaconEditReducer';
import profileReducer from './profileReducer';
const rootReducer = combineReducers({
    changePageReducer,
    loginReducer,
    beaconListReducer,
    beaconDetailReducer,
    beaconEditReducer,
    profileReducer
})
export default rootReducer

//tüm reducer'lar toplandı