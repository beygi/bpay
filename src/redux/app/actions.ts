import { createAction } from "redux-actions";
import * as Actions from "./constants";

export const setUser = createAction<any>(Actions.SET_USER);
export const removeUser = createAction(Actions.REMOVE_USER);
export const logOut = createAction(Actions.LOG_OUT);
export const updateUser = createAction<any>(Actions.UPDATE_USER);
export const updateUserBalance = createAction<any>(Actions.UPDATE_USER_BALANCE);

export const updateMarketCryptos = createAction<any>(Actions.UPDATE_MARKET_CRYPTOS);
export const updateMarketForex = createAction<any>(Actions.UPDATE_MARKET_FOREX);
export const updateMarketTrades = createAction<any>(Actions.UPDATE_MARKET_TRADES);
export const updateMarketOrders = createAction<any>(Actions.UPDATE_MARKET_ORDERS);

export const updateOfficeCashDesks = createAction<any>(Actions.UPDATE_OFFICE_CASHDESKS);
