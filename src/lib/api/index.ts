import axios from "axios";
import config from "../../../src/config";

export default class API {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new API();
        }
        return this.instance;
    }
    private static instance: API;

    private baseURL: string;
    private AuthToken: string | null;
    private axios: any;

    private constructor() {
        // empty;
        this.setBaseURL(config.apiUrl);
    }

    public CreateAxiosInstance() {
        this.axios = axios.create({
            baseURL: this.baseURL,
            timeout: 1000,
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

    private getHeaders(): any {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept-Language", "fa_IR");
        if (this.AuthToken) {
            headers.append("Authorisation", "Token " + this.AuthToken);
        }
        return headers;
    }
}
