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
    private headers: { Authorisation?: string };

    private constructor() {
        // empty;
        this.setBaseURL(config.apiUrl);
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
            this.headers.Authorisation = "Token " + this.AuthToken;
        }
        return this.headers;
    }

    // Api Calls TODO : they will be generated from swagger
    public GetCountries() {
        return this.axios.get("/country");
    }
}
