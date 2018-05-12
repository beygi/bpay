import USER from "../../lib/user";
import t from "../../services/trans/i18n";

function getMenus() {
    const user = USER.getInstance();
    const availableMenus = {
            dashboard: {
                iconType: "layout",
                key: "dashboard",
                subMenu: false,
                text: t.t("Dashboard"),
                visible: user.permission("dashboard").view,
            },
            groups: {
                key: "groups",
                visible:  user.permission("user-groups").view,
                text: t.t("Manage Groups"),
                iconType: "key",
                subMenu: false,
                url : "/groups",
            },
            users: {
                iconType: "team",
                key: "users",
                subMenu: false,
                text: t.t("users"),
                url : "/users",
                visible: user.permission("users").view,
            },
            sysManage: {
                iconType: "double-right",
                key: "sysManage",
                subMenu: {
                    customFields: {
                        iconType: false,
                        key: "Custom Fields",
                        subMenu: false,
                        text: t.t("Custom Fields"),
                        visible: true,
                    },
                    dropDown: {
                        iconType: false,
                        key: "DropDown",
                        subMenu: false,
                        text: t.t("DropDown"),
                        visible: true,
                    },
                },
                text: t.t("sysManage"),
                visible: user.permission("sysManage").view,
            }
        };
    return availableMenus;

}

export default getMenus;
