import * as request from "superagent";
import {
    SuperAgentStatic,
} from "superagent";

type CallbackHandler = (err: any, res?: request.Response) => void;
interface ChangeCoinRequest {
    "coinSymbol": string;
    "email": string;
    "inform": boolean;
    "invoiceId": string;
    "mobileNum": string;
}
interface InvRequest {
    "apiKey": string;
    "description": string;
    "mobile": string;
    "orderId": string;
    "price": string;
}
interface InvoiceResponse {
    "callback": string;
    "cryptoAmount": string;
    "date": string;
    "description": string;
    "gatewayUrl": string;
    "id": string;
    "orderId": string;
    "price": number;
    "qr": string;
    "remaining": number;
    "shopName": string;
    "status": string;
    "symbol": string;
    "timeout": number;
    "timestamp": number;
}
interface Merchant {
    "callback": string;
    "mobile": string;
    "pushToken": string;
    "shopName": string;
    "token": string;
}
interface PaginationInvoiceResponse {
    "content": InvoiceResponse[]
    | InvoiceResponse

    ;
    "count": number;
    "name": string;
    "next": string;
    "page": number;
    "previous": string;
    "size": number;
    "status": number;
}

interface Logger {
    log: (line: string) => any
}
export default class invoiceApi {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new invoiceApi();
        }
        return this.instance;
    }
    private static instance: invoiceApi;
    private domain: string = "https://87.98.188.77:9193";
    private errorHandlers: CallbackHandler[] = [];
    private headers: any = {};

    constructor(domain?: string, private logger?: Logger) {
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

    public linksUsingGET(parameters: {
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
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
        "body"?: {},
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
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
        "body"?: {},
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
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

    public getByIdUsingGET(parameters: {
        "apiKey"?: string,
        "id": string,
        "mob"?: string,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/invoice";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json";

            if (parameters.apiKey !== undefined) {
                queryParameters.apiKey = parameters.apiKey;
            }

            if (parameters.id !== undefined) {
                queryParameters.id = parameters.id;
            }

            if (parameters.id === undefined) {
                reject(new Error("Missing required  parameter: id"));
                return;
            }

            if (parameters.mob !== undefined) {
                queryParameters.mob = parameters.mob;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public addInvoiceUsingPOST(parameters: {
        "inv": InvRequest,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/invoice";
        let body: any;
        let queryParameters: any = {};
        const headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";
            headers["Content-Type"] = "application/json";

            if (parameters.inv !== undefined) {
                body = parameters.inv;
            }

            if (parameters.inv === undefined) {
                reject(new Error("Missing required  parameter: inv"));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request("POST", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getAllInvoiceUsingGET(parameters: {
        "apiKey": string,
        "dir"?: string,
        "mob": string,
        "page"?: number,
        "size"?: number,
        "status"?: string,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/invoice/all";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json";

            if (parameters.apiKey !== undefined) {
                queryParameters.apiKey = parameters.apiKey;
            }

            if (parameters.apiKey === undefined) {
                reject(new Error("Missing required  parameter: apiKey"));
                return;
            }

            if (parameters.dir !== undefined) {
                queryParameters.dir = parameters.dir;
            }

            if (parameters.mob !== undefined) {
                queryParameters.mob = parameters.mob;
            }

            if (parameters.mob === undefined) {
                reject(new Error("Missing required  parameter: mob"));
                return;
            }

            if (parameters.page !== undefined) {
                queryParameters.page = parameters.page;
            }

            if (parameters.size !== undefined) {
                queryParameters.size = parameters.size;
            }

            if (parameters.status !== undefined) {
                queryParameters.status = parameters.status;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getAllInvoicev2UsingGET(parameters: {
        "apiKey": string,
        "dir"?: string,
        "mob": string,
        "page"?: number,
        "size"?: number,
        "status"?: string,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/invoice/allv2";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json";

            if (parameters.apiKey !== undefined) {
                queryParameters.apiKey = parameters.apiKey;
            }

            if (parameters.apiKey === undefined) {
                reject(new Error("Missing required  parameter: apiKey"));
                return;
            }

            if (parameters.dir !== undefined) {
                queryParameters.dir = parameters.dir;
            }

            if (parameters.mob !== undefined) {
                queryParameters.mob = parameters.mob;
            }

            if (parameters.mob === undefined) {
                reject(new Error("Missing required  parameter: mob"));
                return;
            }

            if (parameters.page !== undefined) {
                queryParameters.page = parameters.page;
            }

            if (parameters.size !== undefined) {
                queryParameters.size = parameters.size;
            }

            if (parameters.status !== undefined) {
                queryParameters.status = parameters.status;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public changeCoinUsingPUT(parameters: {
        "changeCode": ChangeCoinRequest,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/invoice/coinselection";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "application/json";
            headers["Content-Type"] = "application/json";

            if (parameters.changeCode !== undefined) {
                body = parameters.changeCode;
            }

            if (parameters.changeCode === undefined) {
                reject(new Error("Missing required  parameter: changeCode"));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request("PUT", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getMerchantInfoUsingGET(parameters: {
        "mob": string,
        "token": string,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/merchant";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.mob !== undefined) {
                queryParameters.mob = parameters.mob;
            }

            if (parameters.mob === undefined) {
                reject(new Error("Missing required  parameter: mob"));
                return;
            }

            if (parameters.token !== undefined) {
                queryParameters.token = parameters.token;
            }

            if (parameters.token === undefined) {
                reject(new Error("Missing required  parameter: token"));
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

    public addMerchantUsingPOST(parameters: {
        "merchant": Merchant,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/merchant";
        let body: any;
        let queryParameters: any = {};
        const headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";
            headers["Content-Type"] = "application/json";

            if (parameters.merchant !== undefined) {
                body = parameters.merchant;
            }

            if (parameters.merchant === undefined) {
                reject(new Error("Missing required  parameter: merchant"));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request("POST", domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    public getTokenUsingGET(parameters: {
        "mob": string,
        $queryParameters?: any,
        $domain?: string,
    }): Promise<request.Response> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        const path = "/merchant/token";
        let body: any;
        const queryParameters: any = {};
        const headers: any = {};
        const form: any = {};
        return new Promise((resolve, reject) => {
            headers.Accept = "*/*";

            if (parameters.mob !== undefined) {
                queryParameters.mob = parameters.mob;
            }

            if (parameters.mob === undefined) {
                reject(new Error("Missing required  parameter: mob"));
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

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        // merge class headers with request headers
        const mergedHeaders = {
            ...this.headers,
            ...headers,
        };

        const req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(mergedHeaders).forEach((key) => {
            req.set(key, mergedHeaders[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof (body) === "object" && !(body.constructor.name === "Buffer")) {
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

}
