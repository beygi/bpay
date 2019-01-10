
import axios from "axios";
import { AxiosInstance, AxiosPromise } from "axios";

export interface RequestHeaders {
    header: string[];
}

export interface ChangeCoinRequest {
    "coinSymbol"?: string
    ; "email"?: string
    ; "inform"?: boolean
    ; "invoiceId"?: string
    ; "mobileNum"?: string
    ;
}

export interface Debt {
    "cardNumber"?: string
    ; "count"?: number
    ; "mobile"?: string
    ; "settleUpInvoices"?: SettleUpInvoices[]
    ; "shopName"?: string
    ; "sum"?: number
    ;
}

export interface InvRequest {
    "apikey"?: string
    ; "currency"?: string
    ; "description"?: string
    ; "merchantCur"?: string
    ; "mobile"?: string
    ; "orderId"?: string
    ; "price"?: string
    ;
}

export interface Invoice {
    "blockchainCoin"?: "tbitcoin" | "bitcoin" | "ethereum" | "usdollar" | "iranrial" | "syrianpound" | "euro"
    ; "category"?: string
    ; "cryptoAmount"?: string
    ; "description"?: string
    ; "failed"?: boolean
    ; "id"?: string
    ; "merchantAmount"?: number
    ; "merchantCur"?: string
    ; "orderid"?: string
    ; "payerAmount"?: number
    ; "payerCur"?: string
    ; "qr"?: string
    ; "regdatetime"?: string
    ; "settled"?: boolean
    ; "settleup"?: Settleup
    ; "status"?: string
    ; "success"?: boolean
    ; "timeout"?: number
    ; "userdatetime"?: string
    ; "waiting"?: boolean
    ;
}

export interface InvoiceResponse {
    "callback"?: string
    ; "cryptoAmount"?: string
    ; "date"?: string
    ; "description"?: string
    ; "gatewayUrl"?: string
    ; "id"?: string
    ; "merchantAmount"?: number
    ; "merchantCur"?: string
    ; "orderId"?: string
    ; "payerAmount"?: number
    ; "payerCur"?: string
    ; "qr"?: string
    ; "remaining"?: number
    ; "shopName"?: string
    ; "status"?: string
    ; "timeout"?: number
    ; "timestamp"?: number
    ;
}

export interface Link {
    "href"?: string
    ; "templated"?: boolean
    ;
}

export interface MapStringLink {
    [key: string]: Link;
}

export interface Merchant {
    "apiKey"?: string
    ; "callback"?: string
    ; "cardNumber"?: string
    ; "mobile"?: string
    ; "pushToken"?: string
    ; "shopName"?: string
    ; "token"?: string
    ;
}

export interface MerchantRequest {
    "adminApikey"?: string
    ; "adminMob"?: string
    ; "callback"?: string
    ; "cardNumber"?: string
    ; "mobile"?: string
    ; "pushToken"?: string
    ; "shopName"?: string
    ; "token"?: string
    ;
}

export interface PaginationInvoiceResponse {
    "content"?: InvoiceResponse[]
    ; "count"?: number
    ; "name"?: string
    ; "next"?: string
    ; "page"?: number
    ; "previous"?: string
    ; "size"?: number
    ; "status"?: number
    ;
}

export interface PaginationSettleUpResponse {
    "content"?: SettleUpResponse[]
    ; "count"?: number
    ; "name"?: string
    ; "next"?: string
    ; "page"?: number
    ; "previous"?: string
    ; "size"?: number
    ; "status"?: number
    ;
}

export interface PaginationVuMerchantdebt {
    "content"?: VuMerchantdebt[]
    ; "count"?: number
    ; "name"?: string
    ; "next"?: string
    ; "page"?: number
    ; "previous"?: string
    ; "size"?: number
    ; "status"?: number
    ;
}

export interface RequestSettle {
    "amount"?: number
    ; "apikey"?: string
    ; "currency"?: string
    ; "datetime"?: string
    ; "destCard"?: string
    ; "invoiceIds"?: string[]
    ; "merMobile"?: string
    ; "mob"?: string
    ; "originCard"?: string
    ; "txid"?: string
    ;
}

export interface SettleUpResponse {
    "amount"?: number
    ; "dateTime"?: string
    ; "destCard"?: string
    ; "id"?: number
    ; "invoices"?: InvoiceResponse[]
    ; "merchantId"?: number
    ; "originCard"?: string
    ; "shopName"?: string
    ; "txId"?: string
    ;
}

export interface Settleup {
    "amount"?: number
    ; "destCard"?: string
    ; "invoices"?: Invoice[]
    ; "originCard"?: string
    ; "txid"?: string
    ;
}

export interface VuMerchantdebt {
    "balance"?: number
    ; "count"?: number
    ; "id"?: number
    ; "merMobile"?: string
    ; "name"?: string
    ; "symbol"?: string
    ;
}

export interface SettleUpInvoices {
    "date"?: number
    ; "id"?: string
    ; "merchantAmount"?: number
    ; "merchantCur"?: string
    ;
}

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

    // Api Calls TODO : they will be generated from swagger
    public GetCountries() {
        return this.axios.get("/country");
    }

    public postKYC(data: InvRequest): AxiosPromise<InvoiceResponse> {
        return this.axios.post<Merchant>("https://api.becopay.com/invoice", data);
    }

    public getAllKYC() {
        return this.axios.get("/kyc");
    }

    public changeKycStatus(uid, status) {
        return this.axios.put("/kyc/" + uid + "/" + status);
    }
    // -----------------------------------------------------

    public linksUsingGET(
        params: {

        },
    ): AxiosPromise<{ [key: string]: { [key: string]: Link } }> {
        return this.axios.get("/actuator", { params });
    }

    public handleUsingGET(
        params: {
            body?: {
                [key: string]: string,
            }
            ,
        },
    ): AxiosPromise<object> {
        return this.axios.get("/actuator/health", { params });
    }

    public handleUsingGET_1(
        params: {
            body?: {
                [key: string]: string,
            }
            ,
        },
    ): AxiosPromise<object> {
        return this.axios.get("/actuator/info", { params });
    }

    public getByIdUsingGET(
        params: {
            apikey?: string
            , id: string
            , mob?: string
            ,
        },
    ): AxiosPromise<InvoiceResponse> {
        return this.axios.get("/invoice", { params });
    }

    public addInvoiceUsingPOST(
        invReq: InvRequest
        ,
    ): AxiosPromise<InvoiceResponse> {
        return this.axios.post("/invoice", invReq,
        );
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
        return this.axios.get("/invoice/all", { params });
    }

    public getByOrderIdUsingGET(
        params: {
            apikey: string
            , id: string
            , mob: string
            ,
        },
    ): AxiosPromise<InvoiceResponse> {
        return this.axios.get("/invoice/byorderid", { params });
    }

    public getMerchantInfoUsingGET(
        params: {
            mob: string
            , token: string
            ,
        },
    ): AxiosPromise<Merchant> {
        return this.axios.get("/merchant", { params });
    }

    public addMerchantUsingPOST(
        merchantReq: MerchantRequest
        ,
    ): AxiosPromise<Merchant> {
        return this.axios.post("/merchant", merchantReq,
        );
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
        return this.axios.get("/merchant/debt", { params });
    }

    public getTokenUsingGET(
        params: {
            mob: string
            ,
        },
    ): AxiosPromise<Merchant> {
        return this.axios.get("/merchant/token", { params });
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
        return this.axios.get("/settleup", { params });
    }

    public settleUp1UsingPOST(
        requestSettle: RequestSettle
        ,
    ): AxiosPromise<Settleup> {
        return this.axios.post("/settleup/add", requestSettle,
        );
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
        return this.axios.get("/settleup/presettle", { params });
    }

    public resetTesthopUsingGET(
        params: {
            apikey?: string
            , mob?: string
            ,
        },
    ): AxiosPromise<string> {
        return this.axios.get("/settleup/testreset", { params });
    }

    public successAllwaitongUsingGET(
        params: {
            apikey?: string
            , mermob?: string
            , mob?: string
            ,
        },
    ): AxiosPromise<string> {
        return this.axios.get("/settleup/testsuccess", { params });
    }

}

export default Test;
