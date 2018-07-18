import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type Country = {
    'id': string;
    'name': string;
};
type File = {
    'absolute': boolean;
    'absoluteFile': File;
    'absolutePath': string;
    'canonicalFile': File;
    'canonicalPath': string;
    'directory': boolean;
    'file': boolean;
    'freeSpace': number;
    'hidden': boolean;
    'name': string;
    'parent': string;
    'parentFile': File;
    'path': string;
    'totalSpace': number;
    'usableSpace': number;
};
type InputStream = {};
type KycStatus = {
    'status': "pending" | "accepted" | "checking" | "rejected";
    'uid': string;
};
type Kycinfo = {
    'country': string;
    'fname': string;
    'gender': "male" | "female" | "other";
    'id': number;
    'lastupdate': string;
    'licenseid': string;
    'lname': string;
    'ltype': "DL" | "PS" | "NI";
    'status': "pending" | "accepted" | "checking" | "rejected";
    'uid': string;
};
type Link = {
    'href': string;
    'templated': boolean;
};
type MapstringLink = {};
type Resource = {
    'description': string;
    'file': File;
    'filename': string;
    'inputStream': InputStream;
    'open': boolean;
    'readable': boolean;
    'uri': URI;
    'url': URL;
};
type URI = {
    'absolute': boolean;
    'authority': string;
    'fragment': string;
    'host': string;
    'opaque': boolean;
    'path': string;
    'port': number;
    'query': string;
    'rawAuthority': string;
    'rawFragment': string;
    'rawPath': string;
    'rawQuery': string;
    'rawSchemeSpecificPart': string;
    'rawUserInfo': string;
    'scheme': string;
    'schemeSpecificPart': string;
    'userInfo': string;
};
type URL = {
    'authority': string;
    'content': {};
    'defaultPort': number;
    'file': string;
    'host': string;
    'path': string;
    'port': number;
    'protocol': string;
    'query': string;
    'ref': string;
    'userInfo': string;
};

type Logger = {
    log: (line: string) => any
};
export default class kycApi {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new kycApi();
        }
        return this.instance;
    }
    private static instance: kycApi;
    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];
    private headers: any = {};

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    public SetHeader(name: string, value: string) {
        this.headers[name] = value;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        // merge class headers with request headers
        const mergedHeaders = { ...this.headers,
            ...headers
        };

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(mergedHeaders).forEach(key => {
            req.set(key, mergedHeaders[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    linksUsingGET(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json, application/vnd.spring-boot.actuator.v2+json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    handleUsingGET(parameters: {
        'body' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator/health';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json, application/vnd.spring-boot.actuator.v2+json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    handleUsingGET_1(parameters: {
        'body' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator/info';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json, application/vnd.spring-boot.actuator.v2+json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    allcountriesUsingGET(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/country';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCountryByCidUsingGET(parameters: {
        'cid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/country/{cid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{cid}', `${parameters['cid']}`);

            if (parameters['cid'] === undefined) {
                reject(new Error('Missing required  parameter: cid'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getKycImageByUidAndImgTypeUsingGET(parameters: {
        'imgtype': string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/img/{uid}/{imgtype}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            path = path.replace('{imgtype}', `${parameters['imgtype']}`);

            if (parameters['imgtype'] === undefined) {
                reject(new Error('Missing required  parameter: imgtype'));
                return;
            }

            path = path.replace('{uid}', `${parameters['uid']}`);

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getAllKycesUsingGET(parameters: {
        'dir' ? : string,
        'page' ? : number,
        'size' ? : number,
        'status' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['dir'] !== undefined) {
                queryParameters['dir'] = parameters['dir'];
            }

            if (parameters['page'] !== undefined) {
                queryParameters['page'] = parameters['page'];
            }

            if (parameters['size'] !== undefined) {
                queryParameters['size'] = parameters['size'];
            }

            if (parameters['status'] !== undefined) {
                queryParameters['status'] = parameters['status'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    addKycUsingPOST(parameters: {
        'input': Kycinfo,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['input'] !== undefined) {
                body = parameters['input'];
            }

            if (parameters['input'] === undefined) {
                reject(new Error('Missing required  parameter: input'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    updateKycUsingPUT(parameters: {
        'authenticated' ? : boolean,
        'authorities0Authority' ? : string,
        'credentials' ? : {},
        'details' ? : {},
        'kycInput': Kycinfo,
        'principal' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            if (parameters['authenticated'] !== undefined) {
                queryParameters['authenticated'] = parameters['authenticated'];
            }

            if (parameters['authorities0Authority'] !== undefined) {
                queryParameters['authorities[0].authority'] = parameters['authorities0Authority'];
            }

            if (parameters['credentials'] !== undefined) {
                queryParameters['credentials'] = parameters['credentials'];
            }

            if (parameters['details'] !== undefined) {
                queryParameters['details'] = parameters['details'];
            }

            if (parameters['kycInput'] !== undefined) {
                body = parameters['kycInput'];
            }

            if (parameters['kycInput'] === undefined) {
                reject(new Error('Missing required  parameter: kycInput'));
                return;
            }

            if (parameters['principal'] !== undefined) {
                queryParameters['principal'] = parameters['principal'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    addKycImageUsingPOST(parameters: {
        'authenticated' ? : boolean,
        'authorities0Authority' ? : string,
        'credentials' ? : {},
        'details' ? : {},
        'file': {},
        'flashAttributes' ? : {},
        'imgtype': string,
        'principal' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/img';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'multipart/form-data';

            if (parameters['authenticated'] !== undefined) {
                queryParameters['authenticated'] = parameters['authenticated'];
            }

            if (parameters['authorities0Authority'] !== undefined) {
                queryParameters['authorities[0].authority'] = parameters['authorities0Authority'];
            }

            if (parameters['credentials'] !== undefined) {
                queryParameters['credentials'] = parameters['credentials'];
            }

            if (parameters['details'] !== undefined) {
                queryParameters['details'] = parameters['details'];
            }

            if (parameters['file'] !== undefined) {
                form['file'] = parameters['file'];
            }

            if (parameters['file'] === undefined) {
                reject(new Error('Missing required  parameter: file'));
                return;
            }

            if (parameters['flashAttributes'] !== undefined) {
                queryParameters['flashAttributes'] = parameters['flashAttributes'];
            }

            if (parameters['imgtype'] !== undefined) {
                queryParameters['imgtype'] = parameters['imgtype'];
            }

            if (parameters['imgtype'] === undefined) {
                reject(new Error('Missing required  parameter: imgtype'));
                return;
            }

            if (parameters['principal'] !== undefined) {
                queryParameters['principal'] = parameters['principal'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getKycImageUsingGET(parameters: {
        'authenticated' ? : boolean,
        'authorities0Authority' ? : string,
        'credentials' ? : {},
        'details' ? : {},
        'imgtype': string,
        'principal' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/img/{imgtype}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['authenticated'] !== undefined) {
                queryParameters['authenticated'] = parameters['authenticated'];
            }

            if (parameters['authorities0Authority'] !== undefined) {
                queryParameters['authorities[0].authority'] = parameters['authorities0Authority'];
            }

            if (parameters['credentials'] !== undefined) {
                queryParameters['credentials'] = parameters['credentials'];
            }

            if (parameters['details'] !== undefined) {
                queryParameters['details'] = parameters['details'];
            }

            path = path.replace('{imgtype}', `${parameters['imgtype']}`);

            if (parameters['imgtype'] === undefined) {
                reject(new Error('Missing required  parameter: imgtype'));
                return;
            }

            if (parameters['principal'] !== undefined) {
                queryParameters['principal'] = parameters['principal'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getAllKycStatusesUsingGET(parameters: {
        'dir' ? : string,
        'page' ? : number,
        'size' ? : number,
        'status' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/status';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            if (parameters['dir'] !== undefined) {
                queryParameters['dir'] = parameters['dir'];
            }

            if (parameters['page'] !== undefined) {
                queryParameters['page'] = parameters['page'];
            }

            if (parameters['size'] !== undefined) {
                queryParameters['size'] = parameters['size'];
            }

            if (parameters['status'] !== undefined) {
                queryParameters['status'] = parameters['status'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getKycStatusByUidUsingGET(parameters: {
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/status/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{uid}', `${parameters['uid']}`);

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getKycByUidUsingGET(parameters: {
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';

            path = path.replace('{uid}', `${parameters['uid']}`);

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    editKycStatusUsingPUT(parameters: {
        'status': string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/{uid}/{status}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{status}', `${parameters['status']}`);

            if (parameters['status'] === undefined) {
                reject(new Error('Missing required  parameter: status'));
                return;
            }

            path = path.replace('{uid}', `${parameters['uid']}`);

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}