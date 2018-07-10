import * as jsCookie from "js-cookie";
import * as Keycloak from "keycloak-js";
import { store } from "../../redux/store";
import Config from "./../../config";
import API from "./../swager";

export default class USER {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new USER();
        }
        return this.instance;
    }

    private static instance: USER;
    public keycloak: any;
    private user: any | null;

    private constructor() {
        // get user object from redux if available
        this.user = store.getState().app.user || null;
        this.keycloak = Keycloak(Config.keycloakConfig);
        API.getInstance().SetHeader("Authorisation", "Token " + jsCookie.get("token"));

    }
    public getCurrent() {
        this.user = store.getState().app.user || null;
        return this.user;
    }

    public permission(resourceName) {
        const allFalse = {
            add: false,
            delete: false,
            edit: false,
            index: false,
            view: false,
            adminView: false,
        };
        const allTrue = {
            add: true,
            delete: true,
            edit: true,
            index: true,
            view: true,
            adminView: true,
        };

        // return full permissions for admins
        if (this.user.realm_access.roles.indexOf("webapp-admin") !== -1) { return allTrue; }
        // return normal permissions
        // if (this.user.permissions[resourceName]) { return this.user.permissions[resourceName].global; }
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
