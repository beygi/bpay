/**
 * @module Components/Unsettled
 */
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
    user: any;
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
        this.searchMerchants = this.searchMerchants.bind(this);
    }

    public componentDidMount() {
        this.searchMerchants();
        const intervalId = setInterval(this.searchMerchants, 10000);
    }

    public render() {
        /**  table columns */
        const columns = [
            {
                title: t.t("Shop Name"),
                dataIndex: "name.first",
            },
            {
                title: t.t("‌Balance"),
                dataIndex: "registered.age",
                render: (price) => (
                    <Ex fixFloatNum={0} value={price * 1000} seperateThousand />
                ),
            },
            {
                title: t.t("Unsettled invoices"),
                dataIndex: "dob.age",
                render: (age) => (
                    <Ex fixFloatNum={0} value={age} seperateThousand />
                ),
            }, {
                title: t.t("Actions"),
                render: (text, record) => (
                    // set state for current mercant and modal visibility
                    <Button onClick={() => { this.setState({ selectedMerchant: { id: "09355126588", name: record.name.first }, showModal: true }); }} type="primary" >{t.t("Settle")}</Button>
                ),
            },
        ];
        if (this.state.merchants !== null) {
            return (
                <div>
                    <Table pagination={false} columns={columns} rowKey="email" dataSource={this.state.merchants} size="small" />
                    <Modal
                        maskClosable
                        visible={this.state.showModal}
                        onCancel={() => this.setState({ showModal: false })}
                        destroyOnClose
                        footer={null}
                        width={600}
                        title={t.t("Shop name") + `: ${this.state.selectedMerchant.name}`}
                    >
                        <Settle merchantId={this.state.selectedMerchant.id}
                            success={() => this.setState({ showModal: false }, () => { this.searchMerchants(); })}
                        >
                        </Settle>
                    </Modal>
                </div>
            );
        }
        return (<Spin delay={400} />);
    }

    // seach merchants
    public searchMerchants() {
        fetch("https://randomuser.me/api/?results=5")
            .then((response) => response.json())
            .then((body) => {
                this.setState({ merchants: body.results });
            });
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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Unsettled);
