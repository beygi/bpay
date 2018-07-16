import * as request from "superagent";
import {
    SuperAgentStatic,
} from "superagent";

type CallbackHandler = (err: any, res ?: request.Response) => void;
interface Balance {
    "amount": number;

    "description": string;

    "name": string;

    "strAmount": string;

}
interface Deposit {
    "amount": number;

    "date": string;

    "strAmount": string;

}
interface Link {
    "href": string;

    "templated": boolean;

}
type Map;« string, Link;» = {}
interface Withdraw {
    "amount": number;

    "date": string;

    "destination": string;

    "strAmount": string;

}

interface Logger {
    log: (line: string) => any;
}

/**
 * Accounting
 * @class btcApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class btcApi {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ?: string, private logger ?: Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    public getDomain() {
        return this.domain;
    }

    public addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach((key) => {
            req.set(key, headers[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === "object" && !(body.constructor.name === "Buffer")) {
            req.set("Content-Type", "application/json");
        }

        if (Object.keys(form).length > 0) {
            req.type("form");
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach((handler) => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    public linksUsingGETURL(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * links
     * @method
     * @name btcApi#linksUsingGET
     */
    public linksUsingGET(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json, application/vnd.spring-boot.actuator.v2+json";

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public handleUsingGETURL(parameters: {
        "body" ?: {},
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator/health";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * handle
     * @method
     * @name btcApi#handleUsingGET
     * @param {} body - body
     */
    public handleUsingGET(parameters: {
        "body" ?: {},
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator/health";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json, application/vnd.spring-boot.actuator.v2+json";

            if (parameters.body !== undefined) {
                body = parameters.body;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public handleUsingGET_1URL(parameters: {
        "body" ?: {},
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator/info";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * handle
     * @method
     * @name btcApi#handleUsingGET_1
     * @param {} body - body
     */
    public handleUsingGET_1(parameters: {
        "body" ?: {},
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/actuator/info";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json, application/vnd.spring-boot.actuator.v2+json";

            if (parameters.body !== undefined) {
                body = parameters.body;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getDepositUsingGETURL(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/deposit";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getDeposit
     * @method
     * @name btcApi#getDepositUsingGET
     */
    public getDepositUsingGET(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/deposit";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getDepositsUsingGETURL(parameters: {
        "from" ?: string,
        "to" ?: string,
        "uid": string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = "/deposit/{uid}";
        if (parameters.from !== undefined) {
            queryParameters.from = parameters.from;
        }

        if (parameters.to !== undefined) {
            queryParameters.to = parameters.to;
        }

        path = path.replace("{uid}", `${parameters.uid}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getDeposits
     * @method
     * @name btcApi#getDepositsUsingGET
     * @param {string} from - from
     * @param {string} to - to
     * @param {string} uid - uid
     */
    public getDepositsUsingGET(parameters: {
        "from" ?: string,
        "to" ?: string,
        "uid": string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = "/deposit/{uid}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.from !== undefined) {
                queryParameters.from = parameters.from;
            }

            if (parameters.to !== undefined) {
                queryParameters.to = parameters.to;
            }

            path = path.replace("{uid}", `${parameters.uid}`);

            if (parameters.uid === undefined) {
                reject(new Error("Missing required  parameter: uid"));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public allBalancesUsingGETURL(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * allBalances
     * @method
     * @name btcApi#allBalancesUsingGET
     */
    public allBalancesUsingGET(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getUserAllBalanceUsingGETURL(parameters: {
        "uid" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/all/{uid}";
        if (parameters.uid !== undefined) {
            queryParameters.uid = parameters.uid;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getUserAllBalance
     * @method
     * @name btcApi#getUserAllBalanceUsingGET
     * @param {string} uid - uid
     */
    public getUserAllBalanceUsingGET(parameters: {
        "uid" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/all/{uid}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.uid !== undefined) {
                queryParameters.uid = parameters.uid;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getUserBalanceByCashDeskUsingGETURL(parameters: {
        "cashdesk" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/user/{cashdesk}";
        if (parameters.cashdesk !== undefined) {
            queryParameters.cashdesk = parameters.cashdesk;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getUserBalanceByCashDesk
     * @method
     * @name btcApi#getUserBalanceByCashDeskUsingGET
     * @param {string} cashdesk - cashdesk
     */
    public getUserBalanceByCashDeskUsingGET(parameters: {
        "cashdesk" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/user/{cashdesk}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.cashdesk !== undefined) {
                queryParameters.cashdesk = parameters.cashdesk;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getCashdeskBalanceUsingGETURL(parameters: {
        "cashdesk" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/{cashdesk}";
        if (parameters.cashdesk !== undefined) {
            queryParameters.cashdesk = parameters.cashdesk;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getCashdeskBalance
     * @method
     * @name btcApi#getCashdeskBalanceUsingGET
     * @param {string} cashdesk - cashdesk
     */
    public getCashdeskBalanceUsingGET(parameters: {
        "cashdesk" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/{cashdesk}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.cashdesk !== undefined) {
                queryParameters.cashdesk = parameters.cashdesk;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getMasterUserBalanceUsingGETURL(parameters: {
        "uid" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/{uid}";
        if (parameters.uid !== undefined) {
            queryParameters.uid = parameters.uid;
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getMasterUserBalance
     * @method
     * @name btcApi#getMasterUserBalanceUsingGET
     * @param {string} uid - uid
     */
    public getMasterUserBalanceUsingGET(parameters: {
        "uid" ?: string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/stat/{uid}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.uid !== undefined) {
                queryParameters.uid = parameters.uid;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getWithdrawUsingGET_1URL(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/withdraw";

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getWithdraw
     * @method
     * @name btcApi#getWithdrawUsingGET_1
     */
    public getWithdrawUsingGET_1(parameters: {
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/withdraw";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getWithdrawUsingGETURL(parameters: {
        "from" ?: string,
        "to" ?: string,
        "uid": string,
        $queryParameters ?: any,
        $domain ?: string,
    }): string {
        const queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = "/withdraw/{uid}";
        if (parameters.from !== undefined) {
            queryParameters.from = parameters.from;
        }

        if (parameters.to !== undefined) {
            queryParameters.to = parameters.to;
        }

        path = path.replace("{uid}", `${parameters.uid}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        const keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
    }

    /**
     * getWithdraw
     * @method
     * @name btcApi#getWithdrawUsingGET
     * @param {string} from - from
     * @param {string} to - to
     * @param {string} uid - uid
     */
    public getWithdrawUsingGET(parameters: {
        "from" ?: string,
        "to" ?: string,
        "uid": string,
        $queryParameters ?: any,
        $domain ?: string,
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = "/withdraw/{uid}";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.from !== undefined) {
                queryParameters.from = parameters.from;
            }

            if (parameters.to !== undefined) {
                queryParameters.to = parameters.to;
            }

            path = path.replace("{uid}", `${parameters.uid}`);

            if (parameters.uid === undefined) {
                reject(new Error("Missing required  parameter: uid"));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}
