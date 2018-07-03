
import * as request from "superagent";
import {SuperAgentStatic} from "superagent";

type CallbackHandler = (err: any, res?: request.Response) => void;
interface Country {
"id": string
;
"name": string
;
}

interface File {
"absolute": boolean
;
"absoluteFile": File
;
"absolutePath": string
;
"canonicalFile": File
;
"canonicalPath": string
;
"directory": boolean
;
"file": boolean
;
"freeSpace": number
;
"hidden": boolean
;
"name": string
;
"parent": string
;
"parentFile": File
;
"path": string
;
"totalSpace": number
;
"usableSpace": number
;
}

interface InputStream {
}

interface KycStatus {
"status": "pending" | "accepted" | "checking" | "rejected"
;
"uid": string
;
}

interface Kycinfo {
"country": string
;
"fname": string
;
"gender": "male" | "female" | "other"
;
"id": number
;
"lastupdate": string
;
"licenseid": string
;
"lname": string
;
"ltype": "DL" | "PS" | "NI"
;
"status": "pending" | "accepted" | "checking" | "rejected"
;
"uid": string
;
}

interface Link {
"href": string
;
"templated": boolean
;
}

interface ModelAndView {
"empty": boolean
;
"model": {
}
;
"modelMap": {
}
;
"reference": boolean
;
"status": "100" | "101" | "102" | "103" | "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "226" | "300" | "301" | "302" | "303" | "304" | "305" | "307" | "308" | "400" | "401" | "402" | "403" | "404" | "405" | "406" | "407" | "408" | "409" | "410" | "411" | "412" | "413" | "414" | "415" | "416" | "417" | "418" | "419" | "420" | "421" | "422" | "423" | "424" | "426" | "428" | "429" | "431" | "451" | "500" | "501" | "502" | "503" | "504" | "505" | "506" | "507" | "508" | "509" | "510" | "511"
;
"view": View
;
"viewName": string
;
}

interface Resource {
"description": string
;
"file": File
;
"filename": string
;
"inputStream": InputStream
;
"open": boolean
;
"readable": boolean
;
"uri": URI
;
"url": URL
;
}

interface URI {
"absolute": boolean
;
"authority": string
;
"fragment": string
;
"host": string
;
"opaque": boolean
;
"path": string
;
"port": number
;
"query": string
;
"rawAuthority": string
;
"rawFragment": string
;
"rawPath": string
;
"rawQuery": string
;
"rawSchemeSpecificPart": string
;
"rawUserInfo": string
;
"scheme": string
;
"schemeSpecificPart": string
;
"userInfo": string
;
}

interface URL {
"authority": string
;
"content": {
}
;
"defaultPort": number
;
"file": string
;
"host": string
;
"path": string
;
"port": number
;
"protocol": string
;
"query": string
;
"ref": string
;
"userInfo": string
;
}

interface View {
"contentType": string
;
}

interface Logger { log: (line: string) => any }
export default class B2Mark {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain?: string, private logger?: Logger) {
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
$queryParameters?: any,
$domain?: string,
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

public handleUsingGETURL(parameters: {
"body"?: {
}
,
$queryParameters?: any,
$domain?: string,
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

public handleUsingGET(parameters: {
"body"?: {
}
,
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

public handleUsingGET_1URL(parameters: {
"body"?: {
}
,
$queryParameters?: any,
$domain?: string,
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

public handleUsingGET_1(parameters: {
"body"?: {
}
,
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

public allcountryUsingGETURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/country";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public allcountryUsingGET(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/country";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

    if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
}

    this.request("GET", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public cidCountryUsingGETURL(parameters: {
"cid": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/country/{cid}";

    path = path.replace("{cid}", `${parameters.cid}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public cidCountryUsingGET(parameters: {
"cid": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/country/{cid}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

    path = path.replace("{cid}", `${parameters.cid}`);

    if (parameters.cid === undefined) {
            reject(new Error("Missing required  parameter: cid"));
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

public errorUsingGETURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingGET(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
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

public errorUsingHEADURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingHEAD(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
}

    this.request("HEAD", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public errorUsingPOSTURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    let queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    queryParameters = {};

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingPOST(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
    let body: any;
    let queryParameters: any = {};
    const headers: any = {};
    let form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

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

public errorUsingPUTURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingPUT(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
}

    this.request("PUT", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public errorUsingDELETEURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingDELETE(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
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

    this.request("DELETE", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public errorUsingOPTIONSURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingOPTIONS(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
}

    this.request("OPTIONS", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public errorUsingPATCHURL(parameters: {
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public errorUsingPATCH(parameters: {
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/error";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
        queryParameters[parameterName] = parameters.$queryParameters[parameterName];
    });
}

    this.request("PATCH", domain + path, body, headers, queryParameters, form, reject, resolve);
    });
}

public serveFileUsingGETURL(parameters: {
"uid": string
,
"imgtype": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/img/{uid}/{imgtype}";

    path = path.replace("{uid}", `${parameters.uid}`);

    path = path.replace("{imgtype}", `${parameters.imgtype}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public serveFileUsingGET(parameters: {
"uid": string
,
"imgtype": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/img/{uid}/{imgtype}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";

    path = path.replace("{uid}", `${parameters.uid}`);

    if (parameters.uid === undefined) {
            reject(new Error("Missing required  parameter: uid"));
            return;
        }

    path = path.replace("{imgtype}", `${parameters.imgtype}`);

    if (parameters.imgtype === undefined) {
            reject(new Error("Missing required  parameter: imgtype"));
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

public AllKycStatUsingGETURL(parameters: {
"page"?: number
,
"size"?: number
,
"dir"?: string
,
"status"?: string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";
    if (parameters.page !== undefined) {
                    queryParameters.page = parameters.page;
                    }

    if (parameters.size !== undefined) {
                    queryParameters.size = parameters.size;
                    }

    if (parameters.dir !== undefined) {
                    queryParameters.dir = parameters.dir;
                    }

    if (parameters.status !== undefined) {
                    queryParameters.status = parameters.status;
                    }

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public AllKycStatUsingGET(parameters: {
"page"?: number
,
"size"?: number
,
"dir"?: string
,
"status"?: string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

    if (parameters.page !== undefined) {
                    queryParameters.page = parameters.page;
                }

    if (parameters.size !== undefined) {
                    queryParameters.size = parameters.size;
                }

    if (parameters.dir !== undefined) {
                    queryParameters.dir = parameters.dir;
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

public addUsingPOSTURL(parameters: {
"input": Kycinfo
,
$queryParameters?: any,
$domain?: string,
}): string {
    let queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    queryParameters = {};

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public addUsingPOST(parameters: {
"input": Kycinfo
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";
    let body: any;
    let queryParameters: any = {};
    const headers: any = {};
    let form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.input !== undefined) {
            body = parameters.input;
        }

    if (parameters.input === undefined) {
            reject(new Error("Missing required  parameter: input"));
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

public updateUsingPUTURL(parameters: {
"kycInput": Kycinfo
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public updateUsingPUT(parameters: {
"kycInput": Kycinfo
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    if (parameters.kycInput !== undefined) {
            body = parameters.kycInput;
        }

    if (parameters.kycInput === undefined) {
            reject(new Error("Missing required  parameter: kycInput"));
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

public handleFileUploadUsingPOSTURL(parameters: {
"file": {
}
,
"imgtype": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    let queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc/img";

    if (parameters.imgtype !== undefined) {
                    queryParameters.imgtype = parameters.imgtype;
                    }

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    queryParameters = {};

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public handleFileUploadUsingPOST(parameters: {
"file": {
}
,
"imgtype": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc/img";
    let body: any;
    let queryParameters: any = {};
    const headers: any = {};
    let form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "multipart/form-data";

    if (parameters.file !== undefined) {
                form.file = parameters.file;
            }

    if (parameters.file === undefined) {
            reject(new Error("Missing required  parameter: file"));
            return;
        }

    if (parameters.imgtype !== undefined) {
                    queryParameters.imgtype = parameters.imgtype;
                }

    if (parameters.imgtype === undefined) {
            reject(new Error("Missing required  parameter: imgtype"));
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

public serveFileUsingGET_1URL(parameters: {
"imgtype": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/img/{imgtype}";

    path = path.replace("{imgtype}", `${parameters.imgtype}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public serveFileUsingGET_1(parameters: {
"imgtype": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/img/{imgtype}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";

    path = path.replace("{imgtype}", `${parameters.imgtype}`);

    if (parameters.imgtype === undefined) {
            reject(new Error("Missing required  parameter: imgtype"));
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

public paginationUsingGETURL(parameters: {
"page"?: number
,
"size"?: number
,
"dir"?: string
,
"status"?: string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc/status";
    if (parameters.page !== undefined) {
                    queryParameters.page = parameters.page;
                    }

    if (parameters.size !== undefined) {
                    queryParameters.size = parameters.size;
                    }

    if (parameters.dir !== undefined) {
                    queryParameters.dir = parameters.dir;
                    }

    if (parameters.status !== undefined) {
                    queryParameters.status = parameters.status;
                    }

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public paginationUsingGET(parameters: {
"page"?: number
,
"size"?: number
,
"dir"?: string
,
"status"?: string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    const path = "/kyc/status";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

    if (parameters.page !== undefined) {
                    queryParameters.page = parameters.page;
                }

    if (parameters.size !== undefined) {
                    queryParameters.size = parameters.size;
                }

    if (parameters.dir !== undefined) {
                    queryParameters.dir = parameters.dir;
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

public userStatusUsingGETURL(parameters: {
"uid": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/status/{uid}";

    path = path.replace("{uid}", `${parameters.uid}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public userStatusUsingGET(parameters: {
"uid": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/status/{uid}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

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

public uidKycUsingGETURL(parameters: {
"uid": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/{uid}";

    path = path.replace("{uid}", `${parameters.uid}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public uidKycUsingGET(parameters: {
"uid": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/{uid}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "application/json";

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

public changeStatusUsingPUTURL(parameters: {
"uid": string
,
"status": string
,
$queryParameters?: any,
$domain?: string,
}): string {
    const queryParameters: any = {};
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/{uid}/{status}";

    path = path.replace("{uid}", `${parameters.uid}`);

    path = path.replace("{status}", `${parameters.status}`);

    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName];
        });
    }

    const keys = Object.keys(queryParameters);
    return domain + path + (keys.length > 0 ? "?" + (keys.map((key) => key + "=" + encodeURIComponent(queryParameters[key])).join("&")) : "");
}

public changeStatusUsingPUT(parameters: {
"uid": string
,
"status": string
,
    $queryParameters?: any,
    $domain?: string,
}): Promise<request.Response> {
    const domain = parameters.$domain ? parameters.$domain : this.domain;
    let path = "/kyc/{uid}/{status}";
    let body: any;
    const queryParameters: any = {};
    const headers: any = {};
    const form: any = {};
    return new Promise((resolve, reject) => {
    headers.Accept = "*/*";
    headers["Content-Type"] = "application/json";

    path = path.replace("{uid}", `${parameters.uid}`);

    if (parameters.uid === undefined) {
            reject(new Error("Missing required  parameter: uid"));
            return;
        }

    path = path.replace("{status}", `${parameters.status}`);

    if (parameters.status === undefined) {
            reject(new Error("Missing required  parameter: status"));
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

}
