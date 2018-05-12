import * as jsCookie from "js-cookie";
import { store } from "../../redux/store";
import API from "./../api";

export default class USER {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new USER();
        }
        return this.instance;
    }

    private static instance: USER;
    private user: any | null;

    private constructor() {
        // get user object from redux if available
        this.user = store.getState().app.user;
        API.getInstance().setAuthToken(jsCookie.get("token"));
    }

    public permission(resourceName) {
        const allFalse = {
            add: false,
            delete: false,
            edit: false,
            index: false,
            view: false,
        };
        const allTrue = {
            add: true,
            delete: true,
            edit: true,
            index: true,
            view: true,
        };

        // return full permissions for admins
        if (this.user.role === "administrator") { return allTrue; }
        // return normal permissions
        if (this.user.permissions[resourceName]) { return this.user.permissions[resourceName].global; }
        // return falses if permissions does not defined
        return allFalse;
    }

    public setUser(user: any) {
        this.user = user;
    }

    public destroy() {
        this.user = null;
    }

}
