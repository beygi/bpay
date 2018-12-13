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

    availableMenus = {
        dashboard: {
            icon: "dashboard",
            path: "/dashboard",
            text: t.t("Dashboard"),
            visible: true,
        },
    };
    if (userObject.hasRealmRole("webapp_user") || userObject.hasRealmRole("webapp_admin")) {
        availableMenus = {
            ...availableMenus,
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
                icon: "import",
                path: "/deposit",
                text: t.t("Deposit"),
                visible: true,
            },
            // wallets: {
            //     icon: "wallet",
            //     path: "/wallets",
            //     text: t.t("Wallets"),
            //     visible: true,
            // },
            kyc: {
                icon: "solution",
                path: "/kyc",
                text: t.t("KYC"),
                visible: true,
            },
        };
    }
    if (userObject.hasRealmRole("merchant")) {
        availableMenus = {
            ...availableMenus,
            balance: {
                icon: "calculator",
                path: "/accounting",
                text: t.t("Accounting"),
                visible: true,
            },
            // kyc: {
            //     icon: "solution",
            //     path: "/kyc",
            //     text: t.t("KYC"),
            //     visible: true,
            // },
        };
        if (userObject.getLevel().level === 1) {
            availableMenus[`kyc`] = {
                icon: "solution",
                path: "/kyc",
                text: t.t("KYC"),
                visible: true,
            };
        }

    }
    return availableMenus;
}

export default getMenus;
