import { routerReducer } from "react-router-redux";
import {combineReducers, Reducer} from "redux";
import appReducer from "./app/reducer";
import {IAppStoreState} from "./app/store";

export interface IRootState {
    app: IAppStoreState;
}

export default combineReducers<IRootState>({
    app: appReducer,
    router: routerReducer,
});
