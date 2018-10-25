/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "antd";
import { Select, Spin } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import Invoice from "../Invoice";
import USER from "./../../lib/user";
import "./style.less";

const Option = Select.Option;
const fiats = [t.t("IRR"), t.t("USD"), t.t("EUR"), t.t("Bitcoin"), t.t("Ethereum"), t.t("failed"), t.t("waiting"), t.t("success"), t.t("settled")];
interface IProps {
    /**  current user's email address that is synced with redux */
    user: any;
}

interface IState {
    /**  list of all invoices */
    invoices: any;
    /**  current page */
    currentPage: number;
    /** loading state */
    loading: boolean;
    /**  search input's loadint state */
    merchantsLoading: boolean;
    /**  result of merchant searchs */
    merchantsResult: [];
    /**  merchant filter that must be applied in api */
    merchantFilter: [];
    /**  invoice status filters */
    statusFilters: {
        settled?: boolean,
        success?: boolean,
        waiting?: boolean,
        failed?: boolean,
    };
}

/**  holds icons and colors for all invoice statuses */
const icons = {
    failed: <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting: <FontAwesomeIcon className="waiting" icon={["fas", "hourglass-half"]} />,
    success: <FontAwesomeIcon className="success" icon={["fas", "check"]} />,
    settled: <FontAwesomeIcon className="settled" icon={["fas", "check-double"]} />,
};

/**
 * this component shows all transactions of merchant or transactions of all merchants for admin
 */
class Transactions extends React.Component<IProps, IState> {

    /**  holds api instance */
    public api = API.getInstance();
    /**  user object wich is represent current user */
    public userObject = USER.getInstance();
    /**  holds last fetched id for merchant's search field */
    public lastFetchId: number;

    constructor(props: IProps) {
        super(props);

        // initial state
        this.state = {
            invoices: { count: 0 }, currentPage: 1, loading: true, statusFilters: { settled: false, success: true, waiting: true, failed: false }
            , merchantsResult: [], merchantsLoading: false, merchantFilter: [],
        };
        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);

        // bind this object's context to methods
        this.searchMerchants = this.searchMerchants.bind(this);
        this.selectMerchant = this.selectMerchant.bind(this);

        // debounce seach merchant and get data for performance
        this.searchMerchants = _.debounce(this.searchMerchants, 800);
        this.getData = _.debounce(this.getData, 800);

        // initial last fetch id
        this.lastFetchId = 0;
    }

    public componentDidMount() {
        this.getData();
        // we fetch data every 5 seconds until our websocket is available
        const intervalId = setInterval(this.getData.bind(this), 5000);
    }

    public render() {
        // holds jsx of invoices as an array
        let invoices = null;
        if (this.state.invoices && this.state.invoices.content !== undefined) {
            invoices = this.state.invoices.content.map((invoice) => {
                return (
                    <Invoice key={invoice.id} invoice={invoice} />
                );
            });
            if (invoices.length === 0) {
                invoices = <h3 className="no-data">{t.t("There is no data to display")}</h3>;
            }
        }
        // create filters.
        const filters = Object.keys(this.state.statusFilters).map(
            (status) => {
                return (<span onClick={() => {
                    const statusFilters = this.state.statusFilters;
                    // toggle clicked permission
                    statusFilters[status] = !statusFilters[status];
                    this.setState({ statusFilters, loading: true, currentPage: 1 }, () => { this.getData(); });
                }} key={status} className={`filter ${this.state.statusFilters[status]}`
                }>
                    {icons[status]}</span >);
            },
        );

        const merchantsSearch = (this.userObject.hasRealmRole("merchants_admin")) ? <Select
            showSearch
            showArrow={false}
            labelInValue
            value={this.state.merchantFilter}
            placeholder={t.t("Select merchant")}
            notFoundContent={this.state.merchantsLoading ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.searchMerchants}
            onChange={this.selectMerchant}
            style={{ width: "100%" }}
            allowClear
            open
        >
            {this.state.merchantsResult.map((d: any) => <Option key={d.value}>{d.text}</Option>)}
        </Select > : null;

        return (
            <Block title={t.t("Transactions")} icon={
                <span>
                    <FontAwesomeIcon icon={["fas", "money-check-alt"]} />
                    <span className="transaction-filters">{filters}</span>
                    <span className="merchant-filter">{merchantsSearch}</span>

                </span>
            }>

                < Spin spinning={this.state.loading} delay={500} >
                    {invoices}
                </Spin >
                <Pagination onChange={(page) => { this.setState({ currentPage: page, loading: true }, () => { this.getData(); }); }}
                    hideOnSinglePage pageSize={12} current={this.state.currentPage} total={this.state.invoices.count}
                    itemRender={this.itemRender}
                />
            </Block>
        );

    }

    // get invoices using api key
    public getData() {
        const statusFilters = Object.keys(_.pickBy(this.state.statusFilters, (value) => value)).toString();
        this.api.getAllInvoicev2UsingGET({
            apikey: this.props.user.apiKey,
            mob: this.props.user.mobile,
            size: 12,
            page: this.state.currentPage - 1,
            status: statusFilters,
            dir: "desc",
            $domain: "https://api.becopay.com",
        }).then((response) => {
            this.setState({ invoices: response.body, loading: false });
        });
    }

    /**  search for merchant */
    public searchMerchants(name: string) {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ merchantsResult: [], merchantsLoading: true });
        fetch("https://randomuser.me/api/?results=5")
            .then((response) => response.json())
            .then((body) => {
                if (fetchId !== this.lastFetchId) { // for fetch callback order
                    return;
                }
                const data = body.results.map((user) => ({
                    text: `${user.name.first} ${user.name.last}`,
                    value: user.login.username,
                }));
                this.setState({ merchantsResult: data, merchantsLoading: false });
            });
    }

    /**  set selected merchant in state so we can use it in api  */
    public selectMerchant(value) {
        this.setState({
            merchantFilter: value || [],
            merchantsResult: [],
            merchantsLoading: false,
        });
    }

    /**  render paginations with local numbers */
    public itemRender(current: number, type: any, originalElement?: any) {
        if (type === "page") {
            return <a> <Ex fixFloatNum={0} value={current} seperateThousand /></a>;
        }
        return originalElement;
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Transactions);
