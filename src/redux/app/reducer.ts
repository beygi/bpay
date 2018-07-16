import { handleActions } from "redux-actions";
import IAction from "../IActions";
import * as Actions from "./constants";
import { IAppStoreState } from "./store";

const initialState: IAppStoreState = {
    company: null,
    user: null,
};

export default handleActions<IAppStoreState, any>({
    [Actions.SET_USER]: (state, action: IAction<any>) => {
        return {
            ...state,
            user: action.payload,
        };
    },
    [Actions.REMOVE_USER]: (state) => {
        return {
            ...state,
            user: null,
        };
    },
    [Actions.UPDATE_USER]: (state, action: IAction<any>) => {
        return {
            ...state,
            user: action.payload,
        };
    },
    [Actions.UPDATE_USER_BALANCE]: (state, action: IAction<any>) => {
        if (!state.user.balance) {
            state.user.balance = {};
        }
        state.user.balance[action.payload.symbol] = action.payload.balance;
        return state;
    },
    [Actions.SET_COMPANY]: (state, action: IAction<any>) => {
        return {
            ...state,
            company: action.payload,
        };
    },
    [Actions.REMOVE_COMPANY]: (state) => {
        return {
            ...state,
            company: null,
        };
    },
    [Actions.LOG_OUT]: (state) => {
        document.cookie = "token=; path=/";
        return {
            ...state,
            company: null,
            user: null,
        };
    },
}, initialState);
