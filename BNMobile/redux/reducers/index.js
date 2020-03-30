import {combineReducers} from 'redux'
import changePageReducer from './changePageReducer'
import loginReducer from './loginReducer'
const rootReducer = combineReducers({
    changePageReducer,
    loginReducer
})
export default rootReducer

//tüm reducer'lar toplandı