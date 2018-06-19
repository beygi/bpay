import t from "../../services/trans/i18n";

function getMenus() {
    const availableMenus = {
        dashboard: {
            icon: "dashboard",
            path: "/dashboard",
            text: t.t("Dashboard"),
            visible: true,
        },
        balance: {
            icon: "calculator",
            path: "/balance",
            text: t.t("Balance"),
            visible: true,
        },
        exchange: {
            icon: "line-chart",
            path: "/exchange",
            text: t.t("Exchange"),
            visible: true,
        },
        deposite: {
            icon: "export",
            path: "/deposite",
            text: t.t("Deposite"),
            visible: true,
        },
        wallets: {
            icon: "wallet",
            path: "/wallets",
            text: t.t("Wallets"),
            visible: true,
        },
        setting: {
            icon: "solution",
            path: "/kyc",
            text: t.t("KYC"),
            visible: true,
        },
    };
    return availableMenus;
}

export default getMenus;
