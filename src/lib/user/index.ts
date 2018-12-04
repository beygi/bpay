/**
 * @module User
 */

import * as Keycloak from "keycloak-js";
import { store } from "../../redux/store";
import t from "../../services/trans/i18n";
import Config from "./../../config";

/**
 * singleton class for representing the current user
 */
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

        // init keycloak with configurations from config file
        this.keycloak = Keycloak(Config.keycloakConfig);
    }

    public getCurrent() {
        this.user = store.getState().app.user || null;
        return this.user;
    }

    // /** return user permission for a speceific resource */
    // public permission(resourceName) {
    //     const allFalse = {
    //         add: false,
    //         delete: false,
    //         edit: false,
    //         index: false,
    //         view: false,
    //         adminView: false,
    //     };
    //     const allTrue = {
    //         add: true,
    //         delete: true,
    //         edit: true,
    //         index: true,
    //         view: true,
    //         adminView: true,
    //     };
    //
    //     // return full permissions for admins
    //     if (this.user.realm_access.roles.indexOf("webapp-admin") !== -1) { return allTrue; }
    //     // return normal permissions
    //     // if (this.user.permissions[resourceName]) { return this.user.permissions[resourceName].global; }
    //     // return falses if permissions does not defined
    //     return allFalse;
    // }

    public hasRealmRole(name: string) {
        return this.keycloak.hasRealmRole(name);
    }

    public getLevel() {
        if (this.hasRealmRole("webapp_verified_user")) {
            return ({
                level: 2,
                name: t.t("verified"),
                code: "verified",
            });
        }
        return (
            {
                level: 1,
                name: t.t("unverified"),
                code: "unverified",
            }
        );
    }

    public getToken() {
        if (this.user) {
            return {
                name: "Authorization",
                value: `Bearer ${this.user.token}`,
            };
        }

    }

    /** set user object */
    public setUser(user: any) {
        this.user = user;
    }

    public destroy() {
        this.user = null;
    }

}
