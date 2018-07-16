import * as request from "superagent";
import {
    SuperAgentStatic,
} from "superagent";
import config from "../../../src/config";

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
export default class btcApi {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new btcApi();
        }
        return this.instance;
    }
    private static instance: btcApi;
    private domain: string = config.NewApiUrl;
    private errorHandlers: CallbackHandler[] = [];
    private headers: any = {};

    constructor(domain ?: string, private logger ?: Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    public getDomain() {
        return this.domain;
    }

    public SetHeader(name: string, value: string) {
        this.headers[name] = value;
    }

    public addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        // merge class headers with request headers
        const mergedHeaders = { ...this.headers,
            ...headers,
        };

        const req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(mergedHeaders).forEach((key) => {
            req.set(key, mergedHeaders[key]);
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
