/**
 * @module UserMenu
 */
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";

/**
 * return menu items for normal users
 */
const userObject = USER.getInstance();

function getMenus() {
    let availableMenus = {};
    if (userObject.keycloak.hasRealmRole("webapp_admin")) {
        availableMenus = {
            dashboard: {
                icon: "dashboard",
                path: "/dashboard",
                text: t.t("Dashboard"),
                visible: true,
            },
            // balance: {
            //     icon: "calculator",
            //     path: "/balance",
            //     text: t.t("Balance"),
            //     visible: true,
            // },
            exchange: {
                icon: "line-chart",
                path: "/exchange",
                text: t.t("Exchange"),
                visible: true,
            },
            deposit: {
                icon: "export",
                path: "/deposit",
                text: t.t("Deposit"),
                visible: true,
            },
            wallets: {
                icon: "wallet",
                path: "/wallets",
                text: t.t("Wallets"),
                visible: true,
            },
            kyc: {
                icon: "solution",
                path: "/kyc",
                text: t.t("KYC"),
                visible: true,
            },
        };
    }
    if (userObject.keycloak.hasRealmRole("merchant")) {
        availableMenus = {
            dashboard: {
                icon: "dashboard",
                path: "/dashboard",
                text: t.t("Dashboard"),
                visible: true,
            },
            kyc: {
                icon: "solution",
                path: "/kyc",
                text: t.t("KYC"),
                visible: true,
            },
        };
    }
    availableMenus = {
        dashboard: {
            icon: "dashboard",
            path: "/dashboard",
            text: t.t("Dashboard"),
            visible: true,
        },
    };
    return availableMenus;
}

export default getMenus;
