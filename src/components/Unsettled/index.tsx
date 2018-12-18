/**
 * @module Components/Unsettled
 */
import { Pagination } from "antd";
import { Button, Modal, Spin, Table } from "antd";
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import API from "../../lib/api/invoice";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Settle from "../Settle";
import USER from "./../../lib/user";
import "./style.less";
interface IProps {
    /**  current user's email address that is synced with redux */
    mobile: string;
    apiKey: string;
    theme: string;
}

interface IState {
    /**  list of all invoices */
    merchants: any;
    /**  current page */
    currentPage: number;
    /**  loadin state */
    loading: boolean;
    /**  modal status */
    showModal: boolean;
    /**  holds selected mercant for modal and settle component */
    selectedMerchant: any;
}

/**
 * this component shows all merchants that have Unsettled invoices and shows a modal to settle using settle component
 */
class Unsettled extends React.Component<IProps, IState> {
    /**  holds an api instance */
    public api = API.getInstance();
    /**  represent user object from currently logged in user */
    public userObject = USER.getInstance();
    constructor(props: IProps) {
        super(props);
        // initial state
        this.state = {
            currentPage: 1, loading: true, merchants: null, showModal: false, selectedMerchant: {},
        };
        // send token with all api requests
        this.api.SetHeader(this.userObject.getToken().name, this.userObject.getToken().value);
        // bind current object to api call function
        this.getUnsettledMerchants = this.getUnsettledMerchants.bind(this);
    }

    public componentDidMount() {
        this.getUnsettledMerchants();
        const intervalId = setInterval(this.getUnsettledMerchants, 10000);
    }

    public render() {
        /**  table columns */
        const columns = [
            {
                title: t.t("Shop Name"),
                dataIndex: "name",
            },
            {
                title: t.t("Mobile number"),
                dataIndex: "merMobile",
            },
            {
                title: t.t("‌Balance"),
                dataIndex: "balance",
                render: (price) => (
                    <Ex floatsNum={0} value={price} seperateThousand stockStyle={false} />
                ),
            },
            {
                title: t.t("Count"),
                dataIndex: "count",
                render: (age) => (
                    <Ex floatsNum={0} value={age} seperateThousand stockStyle={false} />
                ),
            }, {
                title: t.t("Actions"),
                render: (text, record) => (
                    // set state for current mercant and modal visibility
                    <Button onClick={() => { this.setState({ selectedMerchant: { id: record.merMobile, name: record.name }, showModal: true }); }} type="primary" >{t.t("Settle")}</Button>
                ),
            },
        ];
        if (this.state.merchants && this.state.merchants.content !== undefined) {
            return (
                <div>
                    <Table className="unsettled-merchants"
                        loading={this.state.loading} pagination={false} columns={columns} rowKey="id" dataSource={this.state.merchants.content} size="small" />
                    <Pagination onChange={(page) => { this.setState({ currentPage: page, loading: true }, () => { this.getUnsettledMerchants(); }); }}
                        hideOnSinglePage pageSize={10} current={this.state.currentPage} total={this.state.merchants.count}
                        itemRender={this.itemRender}
                    />
                    <Modal
                        className={this.props.theme}
                        maskClosable
                        visible={this.state.showModal}
                        onCancel={() => this.setState({ showModal: false })}
                        destroyOnClose
                        footer={null}
                        width={600}
                        title={t.t("Shop name") + `: ${this.state.selectedMerchant.name}`}
                    >
                        <Settle merchantId={this.state.selectedMerchant.id}
                            success={() => this.setState({ showModal: false }, () => { this.getUnsettledMerchants(); })}
                        >
                        </Settle>
                    </Modal>
                </div>
            );
        }
        return (<Spin delay={400} />);
    }

    // seach merchants
    public getUnsettledMerchants() {
        this.api.getMerchantDebtUsingGET({
            apikey: this.props.apiKey,
            mob: this.props.mobile,
            size: 10,
            page: this.state.currentPage - 1,
            dir: "desc",
            $domain: "https://api.becopay.com",
        }).then((response) => {
            this.setState({ merchants: response.body, loading: false });
        });
    }

    /**  render paginations with local numbers */
    public itemRender(current: number, type: any, originalElement?: any) {
        if (type === "page") {
            return <a> <Ex floatsNum={0} value={current} seperateThousand stockStyle={false} /></a>;
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
        mobile: state.app.user.mobile,
        apiKey: state.app.user.apiKey,
        theme: state.app.user.theme,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Unsettled);
