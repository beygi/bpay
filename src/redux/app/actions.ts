import { createAction } from "redux-actions";
import * as Actions from "./constants";

export const setUser = createAction<any>(Actions.SET_USER);
export const removeUser = createAction(Actions.REMOVE_USER);
export const logOut = createAction(Actions.LOG_OUT);
export const updateUser = createAction<any>(Actions.UPDATE_USER);
export const updateUserBalance = createAction<any>(Actions.UPDATE_USER_BALANCE);
