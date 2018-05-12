import config from "../../../src/config"

export default class API {
    private static instance: API;
    private baseURL: string = window.location.host + "/";
    private AuthToken: string | null;
    private Company: string | null;

    private constructor() {
        // empty;
        this.setBaseURL(config.apiUrl);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new API();
        }
        return this.instance;
    }

    public setBaseURL(url: string) {
        this.baseURL = url;
    }

    public setAuthToken(token: string) {
        this.AuthToken = token;
    }

    public setCompany(company: string) {
        this.Company = company;
    }

    public destroy() {
        this.Company = null;
        this.AuthToken = null;
    }

    private getHeaders(): any {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept-Language", "fa_IR");

        if (this.AuthToken) {
            headers.append("X-Auth-Token", this.AuthToken);
        }
        if (this.Company) {
            headers.append("X-Company", this.Company);
        }
        return headers;
    }
}
