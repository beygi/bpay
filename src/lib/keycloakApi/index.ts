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
    private headers: { Authorization?: string };

    private constructor() {
        // empty;
        this.setBaseURL("https://accounts.becopay.com/auth");
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

    // keyCloaks
    public GetUsers(term, page, size) {
        let params = {};
        if (!term) {
            term = "";
        }
        params = {
            params: {
                search: term,
                first: (page * size) - size,
                max: size,
            },
        };
        // this.UpdateUser();
        return this.axios.get("/admin/realms/master/users", params);
    }

    // keyCloaks
    public UpdateUser() {
        let params = {};
        params = {
            firstName: "beygoo",
            attributes: {
                theme: "light",
                locale: ["fa"],
            },
        };
        return this.axios.put("/admin/realms/master/users/11704ecb-3c95-4d54-ac6d-9b99b1f65fa6", params);
    }

}
