/**
 * @module Components/Invoice
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Popover, Table, Tag, Tooltip } from "antd";
import jrQrcode from "jr-qrcode";
import * as _ from "lodash";
import * as Moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import config from "../../config";
import USER from "../../lib/user";
import { IRootState } from "../../redux/reducers";
import { localDate } from "../../services/trans/i18n";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import "./style.less";

interface IProps {
    /**  id of invoices */
    invoice: any;
    /**  show qr function */
    theme: any;
}

interface IState {
    /** qr code modal visibility status */
    qrStatus: boolean;
}

/**  holds icons and colors for all invoice statuses */
const icons = {
    failed: <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting: <FontAwesomeIcon className="waiting" icon={["fas", "hourglass-half"]} />,
    success: <FontAwesomeIcon className="success" icon={["fas", "check"]} />,
    settled: <FontAwesomeIcon className="settled" icon={["fas", "check-double"]} />,
};

/**
 * this component shows one invoice details in a block
 */
class Invoice extends React.Component<IProps, IState> {
    /**  user object wich is represent current user */
    public userObject = USER.getInstance();
    constructor(props: IProps) {
        super(props);
        this.state = {
            qrStatus: false,
        };
    }

    /** set qr code modal visibility status */
    public setQrModalStatus(status: boolean) {
        this.setState({ qrStatus: status });
    }

    public render() {

        /**  holds detail table columns  */
        const columns = [
            {
                title: t.t("Shop Name"),
                dataIndex: "shopName",
            },
            {
                title: t.t("Order id"),
                dataIndex: "orderId",
            },
            {
                title: t.t("Payer Symbol"),
                dataIndex: "payerCur",
            }, {
                title: t.t("Payer Amount"),
                dataIndex: "priceComponent",
            },
            {
                title: t.t("Checkout Symbol"),
                dataIndex: "merchantCur",
            },
            {
                title: t.t("Checkout Amount"),
                dataIndex: "checkoutComponent",
            },
            {
                title: t.t("Create time"),
                dataIndex: "date",
            }, {
                title: t.t("Status"),
                dataIndex: "statusName",
            },
        ];

        // local Date object
        const pDate = localDate(t.default.language);
        const invoice = this.props.invoice;
        const date = new pDate(invoice.timestamp).toLocaleString();
        const relativeDate = Moment(invoice.timestamp).fromNow();
        invoice.date = date;
        const tablecolumns = [...columns];
        // add an extra column to detail table for display detailed settle transaction
        if (invoice.status === "settled") {
            tablecolumns.push({
                title: t.t("Settle detail"),
                dataIndex: "settleDetail",
            });
        }
        invoice.statusName = t.t(invoice.status);
        invoice.priceComponent = <Ex floatsNum={3} fixedFloats={false} value={invoice.payerAmount} seperateThousand />;
        invoice.checkoutComponent = <Ex floatsNum={3} fixedFloats={false} value={invoice.merchantAmount} seperateThousand />;
        return (
            <Block key={invoice.id} collapse collapseClosed className={"transaction-block"}
                title={<span>
                    {this.userObject.hasRealmRole("merchants_admin") ? <Tag className="shop-name">{invoice.shopName}</Tag> : null}
                    <Tag className="invoice-id" color="#453e41">
                        {invoice.id}
                    </Tag>
                    <span className="price-value" >
                        {invoice.checkoutComponent}
                    </span>
                    <span className="symbol">
                        {t.t(invoice.merchantCur)}
                    </span>
                    {
                        (invoice.merchantCur !== invoice.payerCur) ?
                            <Tag className="shop-name checkout">
                                <span className="price-value mini" >
                                    {invoice.priceComponent}
                                </span>
                                <span className="symbol mini">
                                    {t.t(invoice.payerCur)}
                                </span>
                            </Tag> : null
                    }
                </span>}
                iconPosition="right" icon={<span>
                    <Tooltip title={invoice.description}>
                        <Tag className="tag-desc" color="#453e41">{invoice.description}</Tag>
                    </Tooltip>
                    <Tooltip title={date}>
                        <Tag className="tag-date" color="#898989">
                            {relativeDate}
                        </Tag>
                    </Tooltip>
                    {icons[invoice.status]}
                    <a className="callback" target="blank" href={invoice.callback}><FontAwesomeIcon icon={["fas", "link"]} /></a>
                    &nbsp;
                    {(invoice.status === "waiting") ?
                        <span>
                            <a className="waiting" target="blank"
                                onClick={() => { this.setQrModalStatus(true); }}><FontAwesomeIcon icon={["fas", "external-link-alt"]} /></a>
                            <span className="share-icon">
                                <Popover getPopupContainer={() => document.getElementById("privateContent")} placement="right" content={
                                    <div className="share-buttons">
                                        <TelegramShareButton url={`${config.gateWayUrl}/invoice/${invoice.id}`}
                                            title={t.t("Payment URL")}
                                        >
                                            <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
                                        </TelegramShareButton>
                                        <TwitterShareButton url={`${config.gateWayUrl}/invoice/${invoice.id}`}
                                            title={t.t("Payment URL")}
                                        >
                                            <FontAwesomeIcon icon={["fab", "twitter"]} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={`${config.gateWayUrl}/invoice/${invoice.id}`}
                                            title={t.t("Payment URL")}
                                        >
                                            <FontAwesomeIcon icon={["fab", "whatsapp"]} />
                                        </WhatsappShareButton>
                                    </div>
                                } trigger="hover">
                                    <FontAwesomeIcon icon={["fas", "share-alt"]} />
                                </Popover>
                            </span>
                        </span>
                        :
                        <span>
                            <span className="waiting disabled"><FontAwesomeIcon icon={["fas", "external-link-alt"]} /></span>
                            <span className="share-icon disabled"><FontAwesomeIcon icon={["fas", "share-alt"]} /></span>
                        </span>
                    }

                    <Modal
                        key={this.props.invoice.id}
                        title={t.t("Gateway address")}
                        wrapClassName="vertical-center-modal"
                        visible={this.state.qrStatus}
                        onOk={() => this.setQrModalStatus(false)}
                        onCancel={() => this.setQrModalStatus(false)}
                        footer={null}
                        className={this.props.theme}
                    >
                        <p>
                            <img className="qr-img"
                                src={jrQrcode.getQrBase64(`${config.gateWayUrl}/invoice/${invoice.id}`, { padding: 10 })} alt="" />
                        </p>
                        <h3 className="modal-wallet">
                            <Button target="_blank" type="primary" className="nice-btn" href={`${config.gateWayUrl}/invoice/${invoice.id}`}>
                                {t.t("Open in web browser")}
                            </Button>
                        </h3>
                    </Modal>

                </ span>}>
                <Table pagination={false} columns={tablecolumns} rowKey="id" dataSource={[invoice]} size="small" />
            </Block>
        );
    }
}

function mapStateToProps(state: IRootState) {
    return {
        theme: state.app.user.theme,
    };
}

export default connect(mapStateToProps)(Invoice);
