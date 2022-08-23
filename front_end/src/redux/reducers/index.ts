import { combineReducers } from 'redux';
import AppReducer, { appStateIF } from './AppReducer';

export interface ReducerStateIF {
    app: appStateIF;
}
export default combineReducers({
    app: AppReducer
});
