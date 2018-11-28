import { handleActions } from "redux-actions";
import IAction from "../IActions";
import * as Actions from "./constants";
import { IAppStoreState } from "./store";

const initialState: IAppStoreState = {
    market: null,
    user: null,
    office: null,
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
            user: { ...state.user, ...action.payload },
        };
    },
    [Actions.UPDATE_USER_BALANCE]: (state, action: IAction<any>) => {
        return {
            ...state,
            user: { ...state.user, balance: { ...state.user.balance, ...action.payload } },
        };
    },
    [Actions.LOG_OUT]: (state) => {
        document.cookie = "token=; path=/";
        return {
            ...state,
            market: null,
            user: null,
            office: null,
        };
    },

    [Actions.UPDATE_MARKET_CRYPTOS]: (state, action: IAction<any>) => {
        return {
            ...state,
            market: { ...state.market, cryptos: action.payload },
        };
    },

    [Actions.UPDATE_MARKET_FOREX]: (state, action: IAction<any>) => {
        return {
            ...state,
            market: { ...state.market, forex: action.payload },
        };
    },

    [Actions.UPDATE_MARKET_TRADES]: (state, action: IAction<any>) => {
        return {
            ...state,
            market: { ...state.market, trades: action.payload },
        };
    },
    [Actions.UPDATE_MARKET_ORDERS]: (state, action: IAction<any>) => {
        return {
            ...state,
            market: { ...state.market, orders: action.payload },
        };
    },

    [Actions.UPDATE_OFFICE_CASHDESKS]: (state, action: IAction<any>) => {
        return {
            ...state,
            office: { ...state.office, cashDesks: action.payload },
        };
    },

}, initialState);
