
import axios from "axios";
import { AxiosInstance, AxiosPromise } from "axios";

export interface RequestHeaders  {
    header: string[];
}

export interface Country {
    "id"?: string
;    "name"?: string
; }

export interface File {
    "absolute"?: boolean
;    "absoluteFile"?: File
;    "absolutePath"?: string
;    "canonicalFile"?: File
;    "canonicalPath"?: string
;    "directory"?: boolean
;    "file"?: boolean
;    "freeSpace"?: number
;    "hidden"?: boolean
;    "name"?: string
;    "parent"?: string
;    "parentFile"?: File
;    "path"?: string
;    "totalSpace"?: number
;    "usableSpace"?: number
; }

export interface InputStream {
}

export interface KycStatus {
    "status"?: "pending" | "accepted" | "checking" | "rejected"
;    "uid"?: string
; }

export interface Kycinfo {
    "address"?: string
;    "card"?: string
;    "country"?: string
;    "fname"?: string
;    "gender"?: "male" | "female" | "other"
;    "id"?: number
;    "lastupdate"?: string
;    "licenseid"?: string
;    "lname"?: string
;    "ltype"?: "DL" | "PS" | "NI"
;    "status"?: "pending" | "accepted" | "checking" | "rejected"
;    "uid"?: string
; }

export interface Link {
    "href"?: string
;    "templated"?: boolean
; }

export interface MapStringLink {[key: string]: Link;
}

export interface MerchantKyc {
    "address"?: string
;    "card"?: string
;    "cover"?: string
;    "fname"?: string
;    "gender"?: "male" | "female" | "other"
;    "lname"?: string
;    "nationalCode"?: string
; }

export interface Resource {
    "description"?: string
;    "file"?: File
;    "filename"?: string
;    "inputStream"?: InputStream
;    "open"?: boolean
;    "readable"?: boolean
;    "uri"?: URI
;    "url"?: URL
; }

export interface URI {
    "absolute"?: boolean
;    "authority"?: string
;    "fragment"?: string
;    "host"?: string
;    "opaque"?: boolean
;    "path"?: string
;    "port"?: number
;    "query"?: string
;    "rawAuthority"?: string
;    "rawFragment"?: string
;    "rawPath"?: string
;    "rawQuery"?: string
;    "rawSchemeSpecificPart"?: string
;    "rawUserInfo"?: string
;    "scheme"?: string
;    "schemeSpecificPart"?: string
;    "userInfo"?: string
; }

export interface URL {
    "authority"?: string
;    "content"?: {
}
;    "defaultPort"?: number
;    "file"?: string
;    "host"?: string
;    "path"?: string
;    "port"?: number
;    "protocol"?: string
;    "query"?: string
;    "ref"?: string
;    "userInfo"?: string
; }

/**
 * kyc (know your customer)
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
    private baseURL: string = "https://87.98.188.77:9092";
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

    public allcountriesUsingGET(
        params: {

        },
    ): AxiosPromise<Country[]> {
        const path = "/country";
        return this.axios.get (path, {params});
    }

    public getCountryByCidUsingGET(
        params: {
            cid: string
,
        },
    ): AxiosPromise<Country> {
        let path = "/country/{cid}";
        path = path.replace("{cid}", `${params.cid}`);
        delete params.cid;
        return this.axios.get (path, {params});
    }

    public getKycImageByUidAndImgTypeUsingGET(
        params: {
            imgtype: string
, uid: string
,
        },
    ): AxiosPromise<Resource> {
        let path = "/img/{uid}/{imgtype}";
        path = path.replace("{imgtype}", `${params.imgtype}`);
        delete params.imgtype;
        path = path.replace("{uid}", `${params.uid}`);
        delete params.uid;
        return this.axios.get (path, {params});
    }

    public getAllKycesUsingGET(
        params: {
            dir?: string
, page?: number
, size?: number
, status?: string
,
        },
    ): AxiosPromise<Kycinfo[]> {
        const path = "/kyc";
        return this.axios.get (path, {params});
    }

    public addKycUsingPOST(  params:
  {
    input: Kycinfo
,
   },
    ): AxiosPromise<Kycinfo> {
        let body = null;
        const path = "/kyc";
        body = params.input;
        return this.axios.post (path, (body) ? body : params);
    }

    public addKycImageUsingPOST(  params:
  {
    authenticated?: boolean
,
authorities0Authority?: string
,
credentials?: {
}
,
details?: {
}
,
file: {
}
,
flashAttributes?: {
}
,
imgtype: string
,
principal?: {
}
,
   },
    ): AxiosPromise<string> {
        const body = null;
        const path = "/kyc/img";
        return this.axios.post (path, (body) ? body : params);
    }

    public getKycImageUsingGET(
        params: {
            authenticated?: boolean
, authorities0Authority?: string
, credentials?: {
}
, details?: {
}
, imgtype: string
, principal?: {
}
,
        },
    ): AxiosPromise<Resource> {
        let path = "/kyc/img/{imgtype}";
        path = path.replace("{imgtype}", `${params.imgtype}`);
        delete params.imgtype;
        return this.axios.get (path, {params});
    }

    public getAllMerchantKycesUsingGET(
        params: {
            dir?: string
, page?: number
, size?: number
, status?: string
,
        },
    ): AxiosPromise<MerchantKyc[]> {
        const path = "/kyc/merchant";
        return this.axios.get (path, {params});
    }

    public addMerchantKycUsingPOST(  params:
  {
    input: MerchantKyc
,
   },
    ): AxiosPromise<MerchantKyc> {
        let body = null;
        const path = "/kyc/merchant";
        body = params.input;
        return this.axios.post (path, (body) ? body : params);
    }

    public getAllKycStatusesUsingGET(
        params: {
            dir?: string
, page?: number
, size?: number
, status?: string
,
        },
    ): AxiosPromise<KycStatus[]> {
        const path = "/kyc/status";
        return this.axios.get (path, {params});
    }

    public getKycStatusByUidUsingGET(
        params: {
            uid: string
,
        },
    ): AxiosPromise<KycStatus> {
        let path = "/kyc/status/{uid}";
        path = path.replace("{uid}", `${params.uid}`);
        delete params.uid;
        return this.axios.get (path, {params});
    }

    public getKycByUidUsingGET(
        params: {
            uid: string
,
        },
    ): AxiosPromise<Kycinfo> {
        let path = "/kyc/{uid}";
        path = path.replace("{uid}", `${params.uid}`);
        delete params.uid;
        return this.axios.get (path, {params});
    }

}

export default Test;
