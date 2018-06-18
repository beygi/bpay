import t from "../../services/trans/i18n";

function getMenus() {
    const availableMenus = {
        dashboard: {
            icon: "dashboard",
            path: "/admin/dashboard",
            text: t.t("Dashboard"),
            visible: true,
        },
        setting: {
            icon: "setting",
            path: "/admin/settings",
            text: t.t("Setting"),
            visible: true,
        },
    };
    return availableMenus;
}

export default getMenus;
