
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
 * @class Test
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class Test {

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Test();
        }
        return this.instance;
    }
    private static instance: Test;
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

// -----------------------------------------------------

    public linksUsingGET(
        params: {

        },
    ): AxiosPromise<{ [key: string]: { [key: string]: Link } }> {
        const path = "/actuator";
        return this.axios.get (path, {params});
    }

    public handleUsingGET(
        params: {
            body?: {[key: string]: string,
}
,
        },
    ): AxiosPromise<object> {
        const path = "/actuator/health";
        return this.axios.get (path, {params});
    }

    public handleUsingGET_1(
        params: {
            body?: {[key: string]: string,
}
,
        },
    ): AxiosPromise<object> {
        const path = "/actuator/info";
        return this.axios.get (path, {params});
    }

    public getByIdUsingGET(
        params: {
            apikey?: string
, id: string
, mob?: string
,
        },
    ): AxiosPromise<InvoiceResponse> {
        const path = "/invoice";
        return this.axios.get (path, {params});
    }

    public addInvoiceUsingPOST(  params:
  {
    invReq: InvRequest
,
   },
    ): AxiosPromise<InvoiceResponse> {
        let body = null;
        const path = "/invoice";
        body = params.invReq;
        return this.axios.post (path, (body) ? body : params);
    }

    public getAllInvoicev2UsingGET(
        params: {
            apikey: string
, dir?: string
, mob: string
, page?: number
, size?: number
, status?: string
,
        },
    ): AxiosPromise<PaginationInvoiceResponse> {
        const path = "/invoice/all";
        return this.axios.get (path, {params});
    }

    public getByOrderIdUsingGET(
        params: {
            apikey: string
, id: string
, mob: string
,
        },
    ): AxiosPromise<InvoiceResponse> {
        const path = "/invoice/byorderid";
        return this.axios.get (path, {params});
    }

    public getMerchantInfoUsingGET(
        params: {
            mob: string
, token: string
,
        },
    ): AxiosPromise<Merchant> {
        const path = "/merchant";
        return this.axios.get (path, {params});
    }

    public addMerchantUsingPOST(  params:
  {
    merchantReq: MerchantRequest
,
   },
    ): AxiosPromise<Merchant> {
        let body = null;
        const path = "/merchant";
        body = params.merchantReq;
        return this.axios.post (path, (body) ? body : params);
    }

    public getMerchantDebtUsingGET(
        params: {
            apikey?: string
, dir?: string
, mob?: string
, page?: number
, size?: number
,
        },
    ): AxiosPromise<PaginationVuMerchantdebt> {
        const path = "/merchant/debt";
        return this.axios.get (path, {params});
    }

    public getTokenUsingGET(
        params: {
            mob: string
,
        },
    ): AxiosPromise<Merchant> {
        const path = "/merchant/token";
        return this.axios.get (path, {params});
    }

    public getAllUsingGET(
        params: {
            apikey: string
, dir?: string
, mob: string
, page?: number
, size?: number
,
        },
    ): AxiosPromise<PaginationSettleUpResponse> {
        const path = "/settleup";
        return this.axios.get (path, {params});
    }

    public settleUp1UsingPOST(  params:
  {
    requestSettle: RequestSettle
,
   },
    ): AxiosPromise<Settleup> {
        let body = null;
        const path = "/settleup/add";
        body = params.requestSettle;
        return this.axios.post (path, (body) ? body : params);
    }

    public getPreSettleUsingGET(
        params: {
            apikey?: string
, invoices?: string
, mermob?: string
, mob?: string
,
        },
    ): AxiosPromise<Debt> {
        const path = "/settleup/presettle";
        return this.axios.get (path, {params});
    }

    public resetTesthopUsingGET(
        params: {
            apikey?: string
, mob?: string
,
        },
    ): AxiosPromise<string> {
        const path = "/settleup/testreset";
        return this.axios.get (path, {params});
    }

    public successAllwaitongUsingGET(
        params: {
            apikey?: string
, mermob?: string
, mob?: string
,
        },
    ): AxiosPromise<string> {
        const path = "/settleup/testsuccess";
        return this.axios.get (path, {params});
    }

}

export default Test;
