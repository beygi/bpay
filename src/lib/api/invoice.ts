
import axios from "axios";
import { AxiosInstance, AxiosPromise } from "axios";

export interface RequestHeaders  {
    header: string[];
}

export interface ChangeCoinRequest {
    "coinSymbol"?: string
;    "email"?: string
;    "inform"?: boolean
;    "invoiceId"?: string
;    "mobileNum"?: string
; }

export interface Debt {
    "cardNumber"?: string
;    "count"?: number
;    "mobile"?: string
;    "SettleUpInvoices"?: SettleUpInvoices[]
;    "shopName"?: string
;    "sum"?: number
; }

export interface InvRequest {
    "apikey"?: string
;    "currency"?: string
;    "description"?: string
;    "merchantCur"?: string
;    "mobile"?: string
;    "orderId"?: string
;    "price"?: string
; }

export interface Invoice {
    "blockchainCoin"?: "tbitcoin" | "bitcoin" | "ethereum" | "usdollar" | "iranrial" | "syrianpound" | "euro"
;    "category"?: string
;    "cryptoAmount"?: string
;    "description"?: string
;    "failed"?: boolean
;    "id"?: string
;    "merchantAmount"?: number
;    "merchantCur"?: string
;    "orderid"?: string
;    "payerAmount"?: number
;    "payerCur"?: string
;    "qr"?: string
;    "regdatetime"?: string
;    "settled"?: boolean
;    "settleup"?: Settleup
;    "status"?: string
;    "success"?: boolean
;    "timeout"?: number
;    "userdatetime"?: string
;    "waiting"?: boolean
; }

export interface InvoiceResponse {
    "callback"?: string
;    "cryptoAmount"?: string
;    "date"?: string
;    "description"?: string
;    "gatewayUrl"?: string
;    "id"?: string
;    "merchantAmount"?: number
;    "merchantCur"?: string
;    "orderId"?: string
;    "payerAmount"?: number
;    "payerCur"?: string
;    "qr"?: string
;    "remaining"?: number
;    "shopName"?: string
;    "status"?: string
;    "timeout"?: number
;    "timestamp"?: number
; }

export interface Link {
    "href"?: string
;    "templated"?: boolean
; }

export interface MapStringLink {[key: string]: Link;
}

export interface Merchant {
    "apiKey"?: string
;    "callback"?: string
;    "cardNumber"?: string
;    "mobile"?: string
;    "pushToken"?: string
;    "shopName"?: string
;    "token"?: string
; }

export interface MerchantRequest {
    "adminApikey"?: string
;    "adminMob"?: string
;    "callback"?: string
;    "cardNumber"?: string
;    "mobile"?: string
;    "pushToken"?: string
;    "shopName"?: string
;    "token"?: string
; }

export interface PaginationInvoiceResponse {
    "content"?: InvoiceResponse[]
;    "count"?: number
;    "name"?: string
;    "next"?: string
;    "page"?: number
;    "previous"?: string
;    "size"?: number
;    "status"?: number
; }

export interface PaginationSettleUpResponse {
    "content"?: SettleUpResponse[]
;    "count"?: number
;    "name"?: string
;    "next"?: string
;    "page"?: number
;    "previous"?: string
;    "size"?: number
;    "status"?: number
; }

export interface PaginationVuMerchantdebt {
    "content"?: VuMerchantdebt[]
;    "count"?: number
;    "name"?: string
;    "next"?: string
;    "page"?: number
;    "previous"?: string
;    "size"?: number
;    "status"?: number
; }

export interface RequestSettle {
    "amount"?: number
;    "apikey"?: string
;    "currency"?: string
;    "datetime"?: string
;    "destCard"?: string
;    "invoiceIds"?: string[]
;    "merMobile"?: string
;    "mob"?: string
;    "originCard"?: string
;    "txid"?: string
; }

export interface SettleUpResponse {
    "amount"?: number
;    "dateTime"?: string
;    "destCard"?: string
;    "id"?: number
;    "invoices"?: InvoiceResponse[]
;    "merchantId"?: number
;    "originCard"?: string
;    "shopName"?: string
;    "txId"?: string
; }

export interface Settleup {
    "amount"?: number
;    "destCard"?: string
;    "invoices"?: Invoice[]
;    "originCard"?: string
;    "txid"?: string
; }

export interface VuMerchantdebt {
    "balance"?: number
;    "count"?: number
;    "id"?: number
;    "merMobile"?: string
;    "name"?: string
;    "symbol"?: string
; }

export interface SettleUpInvoices {
    "date"?: number
;    "id"?: string
;    "merchantAmount"?: number
;    "merchantCur"?: string
; }

/**
 * Invoice Service
 * @class InvoiceApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class InvoiceApi {

    public static getInstance() {
        if (!this.instance) {
            this.instance = new InvoiceApi();
        }
        return this.instance;
    }
    private static instance: InvoiceApi;
    private baseURL: string = "https://87.98.188.77:9193";
    private AuthToken: string | null;
    private axios: AxiosInstance;
    private headers: { Authorization?: string };

    private constructor() {
        // empty;
        this.CreateAxiosInstance();
    }

    public CreateAxiosInstance() {
        this.axios = axios.create({
            baseURL: this.baseURL,
            timeout: 100000,
            headers: this.getHeaders(),
        });
    }

    public setBaseURL(url: string) {
        this.baseURL = url;
        this.CreateAxiosInstance();
    }

    public setAuthToken(token: string) {
        this.AuthToken = token;
        this.CreateAxiosInstance();
    }

    public destroy() {
        this.AuthToken = null;
    }

    public getHeaders(): any {
        this.headers = {};
        this.headers["Accept-Language"] = "fa_IR";
        if (this.AuthToken) {
            this.headers.Authorization = "Bearer " + this.AuthToken;
        }
        return this.headers;
    }

public linksUsingGET(  params:
{
},
): AxiosPromise<{ [key: string]: { [key: string]: Link } }> {
    const body = null;
    const path = "/actuator";
    const query: {} = {};
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public handleUsingGET(  params:
{
body?: {[key: string]: string,
}
,
},
): AxiosPromise<object> {
    let body = null;
    const path = "/actuator/health";
    const query: {} = {};
    body = params.body;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public handleUsingGET_1(  params:
{
body?: {[key: string]: string,
}
,
},
): AxiosPromise<object> {
    let body = null;
    const path = "/actuator/info";
    const query: {} = {};
    body = params.body;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getByIdUsingGET(  params:
{
apikey?: string
,
id: string
,
mob?: string
,
},
): AxiosPromise<InvoiceResponse> {
    const body = null;
    const path = "/invoice";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`id`] = params.id;
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public addInvoiceUsingPOST(  params:
{
invReq: InvRequest
,
},
): AxiosPromise<InvoiceResponse> {
    let body = null;
    const path = "/invoice";
    const query: {} = {};
    body = params.invReq;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getAllInvoicev2UsingGET(  params:
{
apikey: string
,
dir?: string
,
mob: string
,
page?: number
,
size?: number
,
status?: string
,
},
): AxiosPromise<PaginationInvoiceResponse> {
    const body = null;
    const path = "/invoice/all";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`dir`] = params.dir;
    query[`mob`] = params.mob;
    query[`page`] = params.page;
    query[`size`] = params.size;
    query[`status`] = params.status;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getByOrderIdUsingGET(  params:
{
apikey: string
,
id: string
,
mob: string
,
},
): AxiosPromise<InvoiceResponse> {
    const body = null;
    const path = "/invoice/byorderid";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`id`] = params.id;
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public changeCoinUsingPUT(  params:
{
changeCode: ChangeCoinRequest
,
},
): AxiosPromise<InvoiceResponse> {
    let body = null;
    const path = "/invoice/coinselection";
    const query: {} = {};
    body = params.changeCode;
    return this.axios({
      method: "PUT",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getMerchantInfoUsingGET(  params:
{
mob: string
,
token: string
,
},
): AxiosPromise<Merchant> {
    const body = null;
    const path = "/merchant";
    const query: {} = {};
    query[`mob`] = params.mob;
    query[`token`] = params.token;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public addMerchantUsingPOST(  params:
{
merchantReq: MerchantRequest
,
},
): AxiosPromise<Merchant> {
    let body = null;
    const path = "/merchant";
    const query: {} = {};
    body = params.merchantReq;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getMerchantDebtUsingGET(  params:
{
apikey?: string
,
dir?: string
,
mob?: string
,
page?: number
,
size?: number
,
},
): AxiosPromise<PaginationVuMerchantdebt> {
    const body = null;
    const path = "/merchant/debt";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`dir`] = params.dir;
    query[`mob`] = params.mob;
    query[`page`] = params.page;
    query[`size`] = params.size;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getTokenUsingGET(  params:
{
mob: string
,
},
): AxiosPromise<Merchant> {
    const body = null;
    const path = "/merchant/token";
    const query: {} = {};
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getAllUsingGET(  params:
{
apikey: string
,
dir?: string
,
mob: string
,
page?: number
,
size?: number
,
},
): AxiosPromise<PaginationSettleUpResponse> {
    const body = null;
    const path = "/settleup";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`dir`] = params.dir;
    query[`mob`] = params.mob;
    query[`page`] = params.page;
    query[`size`] = params.size;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public settleUp1UsingPOST(  params:
{
requestSettle: RequestSettle
,
},
): AxiosPromise<Settleup> {
    let body = null;
    const path = "/settleup/add";
    const query: {} = {};
    body = params.requestSettle;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getPreSettleUsingGET(  params:
{
apikey?: string
,
invoices?: string
,
mermob?: string
,
mob?: string
,
},
): AxiosPromise<Debt> {
    const body = null;
    const path = "/settleup/presettle";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`invoices`] = params.invoices;
    query[`mermob`] = params.mermob;
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public resetTesthopUsingGET(  params:
{
apikey?: string
,
mob?: string
,
},
): AxiosPromise<string> {
    const body = null;
    const path = "/settleup/testreset";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public successAllwaitongUsingGET(  params:
{
apikey?: string
,
mermob?: string
,
mob?: string
,
},
): AxiosPromise<string> {
    const body = null;
    const path = "/settleup/testsuccess";
    const query: {} = {};
    query[`apikey`] = params.apikey;
    query[`mermob`] = params.mermob;
    query[`mob`] = params.mob;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

}

export default InvoiceApi;
