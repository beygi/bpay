import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type Country = {
    'id': string

    'name': string

};
type File = {
    'absolute': boolean

    'absoluteFile': File

    'absolutePath': string

    'canonicalFile': File

    'canonicalPath': string

    'directory': boolean

    'file': boolean

    'freeSpace': number

    'hidden': boolean

    'name': string

    'parent': string

    'parentFile': File

    'path': string

    'totalSpace': number

    'usableSpace': number

};
type InputStream = {};
type KycStatus = {
    'status': "pending" | "accepted" | "checking" | "rejected"

    'uid': string

};
type Kycinfo = {
    'country': string

    'fname': string

    'gender': "male" | "female" | "other"

    'id': number

    'lastupdate': string

    'licenseid': string

    'lname': string

    'ltype': "DL" | "PS" | "NI"

    'status': "pending" | "accepted" | "checking" | "rejected"

    'uid': string

};
type Link = {
    'href': string

    'templated': boolean

};
type MapstringLink = {};
type Resource = {
    'description': string

    'file': File

    'filename': string

    'inputStream': InputStream

    'open': boolean

    'readable': boolean

    'uri': URI

    'url': URL

};
type URI = {
    'absolute': boolean

    'authority': string

    'fragment': string

    'host': string

    'opaque': boolean

    'path': string

    'port': number

    'query': string

    'rawAuthority': string

    'rawFragment': string

    'rawPath': string

    'rawQuery': string

    'rawSchemeSpecificPart': string

    'rawUserInfo': string

    'scheme': string

    'schemeSpecificPart': string

    'userInfo': string

};
type URL = {
    'authority': string

    'content': {}

    'defaultPort': number

    'file': string

    'host': string

    'path': string

    'port': number

    'protocol': string

    'query': string

    'ref': string

    'userInfo': string

};

type Logger = {
    log: (line: string) => any
};

/**
 * kyc (know your customer)
 * @class kycApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class kycApi {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
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

    linksUsingGETURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * links
     * @method
     * @name kycApi#linksUsingGET
     */
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

    handleUsingGETURL(parameters: {
        'body' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator/health';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * handle
     * @method
     * @name kycApi#handleUsingGET
     * @param {} body - body
     */
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

    handleUsingGET_1URL(parameters: {
        'body' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/actuator/info';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * handle
     * @method
     * @name kycApi#handleUsingGET_1
     * @param {} body - body
     */
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

    allcountriesUsingGETURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/country';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * list of country in the world
     * @method
     * @name kycApi#allcountriesUsingGET
     */
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

    getCountryByCidUsingGETURL(parameters: {
        'cid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/country/{cid}';

        path = path.replace('{cid}', `${parameters['cid']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * get country with cid (Country Identification)
     * @method
     * @name kycApi#getCountryByCidUsingGET
     * @param {string} cid - cid
     */
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

    getKycImageByUidAndImgTypeUsingGETURL(parameters: {
        'imgtype': string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/img/{uid}/{imgtype}';

        path = path.replace('{imgtype}', `${parameters['imgtype']}`);

        path = path.replace('{uid}', `${parameters['uid']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * getKycImageByUidAndImgType
     * @method
     * @name kycApi#getKycImageByUidAndImgTypeUsingGET
     * @param {string} imgtype - imgtype
     * @param {string} uid - uid
     */
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

    getAllKycesUsingGETURL(parameters: {
        'dir' ? : string,
        'page' ? : number,
        'size' ? : number,
        'status' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';
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

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * return kyc paginatio if not found 204 content not found
     * @method
     * @name kycApi#getAllKycesUsingGET
     * @param {string} dir - dir
     * @param {integer} page - page
     * @param {integer} size - size
     * @param {string} status - status
     */
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

    addKycUsingPOSTURL(parameters: {
        'input': Kycinfo,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * addKyc
     * @method
     * @name kycApi#addKycUsingPOST
     * @param {} input - input
     */
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

    updateKycUsingPUTURL(parameters: {
        'authenticated' ? : boolean,
        'authorities0Authority' ? : string,
        'credentials' ? : {},
        'details' ? : {},
        'kycInput': Kycinfo,
        'principal' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc';
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

        if (parameters['principal'] !== undefined) {
            queryParameters['principal'] = parameters['principal'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * updateKyc
     * @method
     * @name kycApi#updateKycUsingPUT
     * @param {boolean} authenticated - kyc (know your customer)
     * @param {string} authorities0Authority - kyc (know your customer)
     * @param {object} credentials - kyc (know your customer)
     * @param {object} details - kyc (know your customer)
     * @param {} kycInput - kycInput
     * @param {object} principal - kyc (know your customer)
     */
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

    addKycImageUsingPOSTURL(parameters: {
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
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/img';
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

        if (parameters['flashAttributes'] !== undefined) {
            queryParameters['flashAttributes'] = parameters['flashAttributes'];
        }

        if (parameters['imgtype'] !== undefined) {
            queryParameters['imgtype'] = parameters['imgtype'];
        }

        if (parameters['principal'] !== undefined) {
            queryParameters['principal'] = parameters['principal'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * addKycImage
     * @method
     * @name kycApi#addKycImageUsingPOST
     * @param {boolean} authenticated - kyc (know your customer)
     * @param {string} authorities0Authority - kyc (know your customer)
     * @param {object} credentials - kyc (know your customer)
     * @param {object} details - kyc (know your customer)
     * @param {file} file - file
     * @param {object} flashAttributes - kyc (know your customer)
     * @param {string} imgtype - imgtype
     * @param {object} principal - kyc (know your customer)
     */
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

    getKycImageUsingGETURL(parameters: {
        'authenticated' ? : boolean,
        'authorities0Authority' ? : string,
        'credentials' ? : {},
        'details' ? : {},
        'imgtype': string,
        'principal' ? : {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/img/{imgtype}';
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
        if (parameters['principal'] !== undefined) {
            queryParameters['principal'] = parameters['principal'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * getKycImage
     * @method
     * @name kycApi#getKycImageUsingGET
     * @param {boolean} authenticated - kyc (know your customer)
     * @param {string} authorities0Authority - kyc (know your customer)
     * @param {object} credentials - kyc (know your customer)
     * @param {object} details - kyc (know your customer)
     * @param {string} imgtype - imgtype
     * @param {object} principal - kyc (know your customer)
     */
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

    getAllKycStatusesUsingGETURL(parameters: {
        'dir' ? : string,
        'page' ? : number,
        'size' ? : number,
        'status' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/status';
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

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * return status kyc paginatio if not found 204 content not found
     * @method
     * @name kycApi#getAllKycStatusesUsingGET
     * @param {string} dir - dir
     * @param {integer} page - page
     * @param {integer} size - size
     * @param {string} status - status
     */
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

    getKycStatusByUidUsingGETURL(parameters: {
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/status/{uid}';

        path = path.replace('{uid}', `${parameters['uid']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * list of status (know your customer) by uid (user identification)
     * @method
     * @name kycApi#getKycStatusByUidUsingGET
     * @param {string} uid - uid
     */
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

    getKycByUidUsingGETURL(parameters: {
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/{uid}';

        path = path.replace('{uid}', `${parameters['uid']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * list of kyc (know your customer) by uid (user identification)
     * @method
     * @name kycApi#getKycByUidUsingGET
     * @param {string} uid - uid
     */
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

    editKycStatusUsingPUTURL(parameters: {
        'status': string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/kyc/{uid}/{status}';

        path = path.replace('{status}', `${parameters['status']}`);

        path = path.replace('{uid}', `${parameters['uid']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * editKycStatus
     * @method
     * @name kycApi#editKycStatusUsingPUT
     * @param {string} status - status
     * @param {string} uid - uid
     */
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