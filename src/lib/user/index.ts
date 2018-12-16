/**
 * @module User
 */

import * as Keycloak from "keycloak-js";
import * as _ from "lodash";
import { updateUser } from "../../redux/app/actions";
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

    public UpdateProfile(extra?: {}) {
        this.keycloak.loadUserProfile().then(() => {
            store.dispatch(updateUser({ ...this.getUserAttr(), ...extra }));
            this.getCurrent();
        });
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
        return this.getCurrent().realm_access.roles.includes(name);
    }

    public getLevel() {
        if (this.hasRealmRole("verified_merchant")) {
            return ({
                level: 3,
                name: t.t("verified merchant"),
                code: "verified-merchant",
            });
        }
        if (this.hasRealmRole("webapp_verified_user")) {
            return ({
                level: 2,
                name: t.t("verified"),
                code: "verified",
            });
        }
        if (this.hasRealmRole("webapp_user") || this.hasRealmRole("merchant")) {
            return (
                {
                    level: 1,
                    name: t.t("unverified"),
                    code: "unverified",
                }
            );
        }
        return (
            {
                level: 0,
                name: t.t("no access"),
                code: "no-access",
            }
        );
    }

    public getToken() {
        if (this.user) {
            return {
                name: "Authorization",
                value: `Bearer ` + JSON.stringify(this.keycloak.tokenParsed),
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

    private getUserAttr() {
        const userData = _.pick(this.keycloak.tokenParsed, ["email", "given_name", "family_name", "realm_access", "auth_time"]);
        return {
            ...userData,
            token: this.keycloak.token,
            apiKey: _.get(this.keycloak, "profile.attributes.apikey[0]", ""),
            mobile: _.get(this.keycloak, "profile.attributes.mobile[0]", ""),
            // theme: _.get(this.keycloak, "profile.attributes.theme[0]", "light"),
            // language: _.get(user.keycloak, "profile.attributes.locale[0]", ""),
        };

    }

}
