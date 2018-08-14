/**
 * @module AdminMenu
 */
import t from "../../services/trans/i18n";

/**
 * return menu items for admin users
 */
function getMenus() {
    const availableMenus = {
        dashboard: {
            icon: "dashboard",
            path: "/admin/dashboard",
            text: t.t("Dashboard"),
            visible: true,
        },
        users: {
            icon: "team",
            path: "/admin/users",
            text: t.t("Users"),
            visible: true,
        },
        kyc: {
            icon: "solution",
            path: "/admin/kyc",
            text: t.t("KYC"),
            visible: true,
        },
        chat: {
            icon: "message",
            path: "/admin/chat",
            text: t.t("Support"),
            visible: true,
        },
    };
    return availableMenus;
}

export default getMenus;
