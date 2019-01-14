
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
 * @class KycApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class KycApi {

    public static getInstance() {
        if (!this.instance) {
            this.instance = new KycApi();
        }
        return this.instance;
    }
    private static instance: KycApi;
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

public allcountriesUsingGET(  params:
{
},
): AxiosPromise<Country[]> {
    const body = null;
    const path = "/country";
    const query: {} = {};
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getCountryByCidUsingGET(  params:
{
cid: string
,
},
): AxiosPromise<Country> {
    const body = null;
    let path = "/country/{cid}";
    const query: {} = {};
    path = path.replace("{cid}", `${params.cid}`);
    delete params.cid;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getKycImageByUidAndImgTypeUsingGET(  params:
{
imgtype: string
,
uid: string
,
},
): AxiosPromise<Resource> {
    const body = null;
    let path = "/img/{uid}/{imgtype}";
    const query: {} = {};
    path = path.replace("{imgtype}", `${params.imgtype}`);
    delete params.imgtype;
    path = path.replace("{uid}", `${params.uid}`);
    delete params.uid;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getAllKycesUsingGET(  params:
{
dir?: string
,
page?: number
,
size?: number
,
status?: string
,
},
): AxiosPromise<Kycinfo[]> {
    const body = null;
    const path = "/kyc";
    const query: {} = {};
    query[`dir`] = params.dir;
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

public addKycUsingPOST(  params:
{
input: Kycinfo
,
},
): AxiosPromise<Kycinfo> {
    let body = null;
    const path = "/kyc";
    const query: {} = {};
    body = params.input;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public updateKycUsingPUT(  params:
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
kycInput: Kycinfo
,
principal?: {
}
,
},
): AxiosPromise<Kycinfo> {
    let body = null;
    const path = "/kyc";
    const query: {} = {};
    query[`authenticated`] = params.authenticated;
    query[`authorities0Authority`] = params.authorities0Authority;
    query[`credentials`] = params.credentials;
    query[`details`] = params.details;
    body = params.kycInput;
    query[`principal`] = params.principal;
    return this.axios({
      method: "PUT",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

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
    const query: {} = {};
    query[`authenticated`] = params.authenticated;
    query[`authorities0Authority`] = params.authorities0Authority;
    query[`credentials`] = params.credentials;
    query[`details`] = params.details;
    query[`flashAttributes`] = params.flashAttributes;
    query[`imgtype`] = params.imgtype;
    query[`principal`] = params.principal;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getKycImageUsingGET(  params:
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
imgtype: string
,
principal?: {
}
,
},
): AxiosPromise<Resource> {
    const body = null;
    let path = "/kyc/img/{imgtype}";
    const query: {} = {};
    query[`authenticated`] = params.authenticated;
    query[`authorities0Authority`] = params.authorities0Authority;
    query[`credentials`] = params.credentials;
    query[`details`] = params.details;
    path = path.replace("{imgtype}", `${params.imgtype}`);
    delete params.imgtype;
    query[`principal`] = params.principal;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getAllMerchantKycesUsingGET(  params:
{
dir?: string
,
page?: number
,
size?: number
,
status?: string
,
},
): AxiosPromise<MerchantKyc[]> {
    const body = null;
    const path = "/kyc/merchant";
    const query: {} = {};
    query[`dir`] = params.dir;
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

public addMerchantKycUsingPOST(  params:
{
input: MerchantKyc
,
},
): AxiosPromise<MerchantKyc> {
    let body = null;
    const path = "/kyc/merchant";
    const query: {} = {};
    body = params.input;
    return this.axios({
      method: "POST",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getAllKycStatusesUsingGET(  params:
{
dir?: string
,
page?: number
,
size?: number
,
status?: string
,
},
): AxiosPromise<KycStatus[]> {
    const body = null;
    const path = "/kyc/status";
    const query: {} = {};
    query[`dir`] = params.dir;
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

public getKycStatusByUidUsingGET(  params:
{
uid: string
,
},
): AxiosPromise<KycStatus> {
    const body = null;
    let path = "/kyc/status/{uid}";
    const query: {} = {};
    path = path.replace("{uid}", `${params.uid}`);
    delete params.uid;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public getKycByUidUsingGET(  params:
{
uid: string
,
},
): AxiosPromise<Kycinfo> {
    const body = null;
    let path = "/kyc/{uid}";
    const query: {} = {};
    path = path.replace("{uid}", `${params.uid}`);
    delete params.uid;
    return this.axios({
      method: "GET",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

public updateKycStatusUsingPUT(  params:
{
status: string
,
uid: string
,
},
): AxiosPromise<KycStatus> {
    const body = null;
    let path = "/kyc/{uid}/{status}";
    const query: {} = {};
    path = path.replace("{status}", `${params.status}`);
    delete params.status;
    path = path.replace("{uid}", `${params.uid}`);
    delete params.uid;
    return this.axios({
      method: "PUT",
      url: path,
      params : query,
      data: (body) ? body : params,
    } );

}

}

export default KycApi;
