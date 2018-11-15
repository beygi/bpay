/**
 * @module Components/DepositComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Col, Input, List, message, Modal, Row, Tooltip } from "antd";
import jrQrcode from "jr-qrcode";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();
const InputGroup = Input.Group;

interface IProps {
    /** symbol selected by user for deposit */
    selectedDepositCurrency: string;

    /** holds user's current balance, binded to redux store */
    balance: {};
}

interface IState {
    /** qr code modal visibility status */
    qrModalVisible: boolean;
}

/**
 * a full featured component for deposite currencies
 * including qr code modal, copy wallet button and coin select dialog
 */
class DepositComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            qrModalVisible: false,
        };
    }

    /** set qr code modal visibility status */
    public setQrModalStatus(qrModalVisible: boolean) {
        this.setState({ qrModalVisible });
    }

    /** display a message to inform users about copied wallet address */
    public showCopiedMessage() {
        message.success(t.t("Our {currency} deposit address copied to clipboard successfully").replace("{currency}", t.t(config.currencies[this.props.selectedDepositCurrency].name)));
    }
    public render() {
        let dropDownName = t.t("Please select a currency to deposit");
        const dropDownIcon = <FontAwesomeIcon icon={["fas", "arrow-left"]} />;
        let DepositOrDescription = <Alert
            message={<h2>{t.t("Before you start")}</h2>}
            description={<div>
                <ul>
                    <li>{t.t("please read our security section")}</li>
                    <li>{t.t("After making a deposit, you can track its progress on the history page.")}</li>
                </ul>
            </div>}
            type="info"
            showIcon
        />;
        if (this.props.selectedDepositCurrency) {
            const data = [
                { name: t.t("Total"), value: this.props.balance[this.props.selectedDepositCurrency].balance.total || 0 },
                { name: t.t("In order"), value: this.props.balance[this.props.selectedDepositCurrency].balance.inOrder || 0 },
                { name: t.t("Available"), value: this.props.balance[this.props.selectedDepositCurrency].balance.available || 0 },
            ];
            const CurrencydropDownIcon = config.icons[this.props.selectedDepositCurrency];
            dropDownName = <div> {CurrencydropDownIcon} {t.t(config.currencies[this.props.selectedDepositCurrency].name)}</div>;
            DepositOrDescription = <div>
                <h3 className="coin-title">{t.t("your {coin} balance:").replace("{coin}", t.t(config.currencies[this.props.selectedDepositCurrency].name))}</h3>
                <Row gutter={0}>
                    <Col md={12}>
                        <List className="deposite-balance" bordered={false}
                            size="small"
                            dataSource={data}
                            renderItem={(item) => (<List.Item><span className="deposite-balance">{item.name}</span><Ex value={item.value} /></List.Item>)}
                        />
                    </Col>
                </Row>
                <div className="wallet-label">
                    {t.t("Our {coin} wallet address:").replace("{coin}", t.t(config.currencies[this.props.selectedDepositCurrency].name))}
                </div>
                <InputGroup className="wallet-group" compact>
                    <Input className="wallet" defaultValue={config.currencies[this.props.selectedDepositCurrency].depositeWallet} />
                    <CopyToClipboard text={config.currencies[this.props.selectedDepositCurrency].depositeWallet}
                        onCopy={() => this.showCopiedMessage()}>
                        <Tooltip placement="top" title={t.t("Copy wallet address to clipboard")}>
                            <Button className="copy neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "copy"]} />  {t.t("Copy")}</Button>
                        </Tooltip>
                    </CopyToClipboard>
                    <Tooltip placement="top" title={t.t("Display Qr code of wallet")}>
                        <Button onClick={() => this.setQrModalStatus(true)} className="show-qr neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "qrcode"]} />  {t.t("Qr code")}</Button>
                    </Tooltip>
                    <Modal
                        title={t.t("{coin} Deposite address").replace("{coin}", t.t(config.currencies[this.props.selectedDepositCurrency].name))}
                        wrapClassName="vertical-center-modal"
                        visible={this.state.qrModalVisible}
                        onOk={() => this.setQrModalStatus(false)}
                        onCancel={() => this.setQrModalStatus(false)}
                        footer={null}
                    >
                        <p>
                            <img className="qr-img"
                                src={jrQrcode.getQrBase64(config.currencies[this.props.selectedDepositCurrency].depositeWallet, { padding: 0 })} alt="" />
                        </p>
                        <h3 className="modal-wallet">{config.currencies[this.props.selectedDepositCurrency].depositeWallet}</h3>
                    </Modal>
                </InputGroup>

                <Alert
                    message={<h3>{t.t("Please note")}</h3>}
                    description={<div>
                        <ul>
                            <li>
                                {t.t("coins will be available after ")}
                                <span className="confirmation-num">
                                    <Ex fixFloatNum={0} value={config.currencies[this.props.selectedDepositCurrency].confirmationNumber} stockStyle={false} />
                                </span> {}
                                {t.t("network confirmations")}
                            </li>
                            <li>{t.t("send only")} {t.t(config.currencies[this.props.selectedDepositCurrency].name)} {}
                                (<span className="confirmation-num">{this.props.selectedDepositCurrency}</span>) {t.t("to this walelt sending anyother coin may result loss of your deposit")}</li>
                        </ul>
                    </div>}
                    type="warning"
                    showIcon
                />
            </div>;
        }
        const coins = Object.keys(config.currencies).map((key) => {
            if (config.currencies[key].type !== "fiat") {
                return (<Link replace={true} to={`/deposit/${key}`} key={key}>
                    <h2>
                        <span className="balance-icon">{config.icons[key]}</span>&nbsp;&nbsp;
                        <span className="balance-name">{t.t(config.currencies[key].name)}</span>
                    </h2>
                </Link>);
            }
        },
        );
        if (this.props.selectedDepositCurrency) {
            return (<div><Block noTitleMargin
                className="deposit-coin-select" centerTitle={true} title={dropDownName} icon={<Link replace={true} to={`/deposit/`} >{dropDownIcon}</Link>} >
            </Block>
                {DepositOrDescription}
            </div>
            );
        }
        return (
            <div>
                <Block
                    className="deposit-coin-select"
                    centerTitle={true} title={dropDownName} iconPosition="left" >
                    {coins}
                </Block>
                {DepositOrDescription}
            </div >
        );
    }
}

function mapStateToProps(state: IRootState) {
    if (state.app.user.balance !== undefined) {
        return {
            balance: state.app.user.balance,
        };
    }
    // there is no balance from redux, state must not be updated in getDerivedStateFromProps
    return {
        balance: null,
    };
}

export default connect(mapStateToProps, null, null, { pure: false })(DepositComponent);
