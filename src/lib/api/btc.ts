import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type Balance = {
    'amount': number

    'description': string

    'name': string

    'strAmount': string

};
type Deposit = {
    'amount': number

    'date': string

    'strAmount': string

};
type Link = {
    'href': string

    'templated': boolean

};
type Map« string, Link» = {};
type Withdraw = {
    'amount': number

    'date': string

    'destination': string

    'strAmount': string

};

type Logger = {
    log: (line: string) => any
};

/**
 * Accounting
 * @class btcApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class btcApi {

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
     * @name btcApi#linksUsingGET
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
     * @name btcApi#handleUsingGET
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
     * @name btcApi#handleUsingGET_1
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

    getDepositUsingGETURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/deposit';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * getDeposit
     * @method
     * @name btcApi#getDepositUsingGET
     */
    getDepositUsingGET(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/deposit';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDepositsUsingGETURL(parameters: {
        'from' ? : string,
        'to' ? : string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/deposit/{uid}';
        if (parameters['from'] !== undefined) {
            queryParameters['from'] = parameters['from'];
        }

        if (parameters['to'] !== undefined) {
            queryParameters['to'] = parameters['to'];
        }

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
     * getDeposits
     * @method
     * @name btcApi#getDepositsUsingGET
     * @param {string} from - from
     * @param {string} to - to
     * @param {string} uid - uid
     */
    getDepositsUsingGET(parameters: {
        'from' ? : string,
        'to' ? : string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/deposit/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['from'] !== undefined) {
                queryParameters['from'] = parameters['from'];
            }

            if (parameters['to'] !== undefined) {
                queryParameters['to'] = parameters['to'];
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

    allBalancesUsingGETURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * allBalances
     * @method
     * @name btcApi#allBalancesUsingGET
     */
    allBalancesUsingGET(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUserAllBalanceUsingGETURL(parameters: {
        'uid' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/all/{uid}';
        if (parameters['uid'] !== undefined) {
            queryParameters['uid'] = parameters['uid'];
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
     * getUserAllBalance
     * @method
     * @name btcApi#getUserAllBalanceUsingGET
     * @param {string} uid - uid
     */
    getUserAllBalanceUsingGET(parameters: {
        'uid' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/all/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['uid'] !== undefined) {
                queryParameters['uid'] = parameters['uid'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUserBalanceByCashDeskUsingGETURL(parameters: {
        'cashdesk' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/user/{cashdesk}';
        if (parameters['cashdesk'] !== undefined) {
            queryParameters['cashdesk'] = parameters['cashdesk'];
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
     * getUserBalanceByCashDesk
     * @method
     * @name btcApi#getUserBalanceByCashDeskUsingGET
     * @param {string} cashdesk - cashdesk
     */
    getUserBalanceByCashDeskUsingGET(parameters: {
        'cashdesk' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/user/{cashdesk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['cashdesk'] !== undefined) {
                queryParameters['cashdesk'] = parameters['cashdesk'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCashdeskBalanceUsingGETURL(parameters: {
        'cashdesk' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/{cashdesk}';
        if (parameters['cashdesk'] !== undefined) {
            queryParameters['cashdesk'] = parameters['cashdesk'];
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
     * getCashdeskBalance
     * @method
     * @name btcApi#getCashdeskBalanceUsingGET
     * @param {string} cashdesk - cashdesk
     */
    getCashdeskBalanceUsingGET(parameters: {
        'cashdesk' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/{cashdesk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['cashdesk'] !== undefined) {
                queryParameters['cashdesk'] = parameters['cashdesk'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMasterUserBalanceUsingGETURL(parameters: {
        'uid' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/{uid}';
        if (parameters['uid'] !== undefined) {
            queryParameters['uid'] = parameters['uid'];
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
     * getMasterUserBalance
     * @method
     * @name btcApi#getMasterUserBalanceUsingGET
     * @param {string} uid - uid
     */
    getMasterUserBalanceUsingGET(parameters: {
        'uid' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/stat/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['uid'] !== undefined) {
                queryParameters['uid'] = parameters['uid'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getWithdrawUsingGET_1URL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/withdraw';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * getWithdraw
     * @method
     * @name btcApi#getWithdrawUsingGET_1
     */
    getWithdrawUsingGET_1(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/withdraw';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getWithdrawUsingGETURL(parameters: {
        'from' ? : string,
        'to' ? : string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/withdraw/{uid}';
        if (parameters['from'] !== undefined) {
            queryParameters['from'] = parameters['from'];
        }

        if (parameters['to'] !== undefined) {
            queryParameters['to'] = parameters['to'];
        }

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
     * getWithdraw
     * @method
     * @name btcApi#getWithdrawUsingGET
     * @param {string} from - from
     * @param {string} to - to
     * @param {string} uid - uid
     */
    getWithdrawUsingGET(parameters: {
        'from' ? : string,
        'to' ? : string,
        'uid': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/withdraw/{uid}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = '*/*';

            if (parameters['from'] !== undefined) {
                queryParameters['from'] = parameters['from'];
            }

            if (parameters['to'] !== undefined) {
                queryParameters['to'] = parameters['to'];
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

}