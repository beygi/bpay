/**
 * @module Components/DepositComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Input, List, message, Modal, notification, Tooltip } from "antd";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Balance from "../Balance";
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
        message.success(`Our ${this.props.selectedDepositCurrency} deposit address copied to clipboard successfully`);
    }
    public render() {
        let dropDownName = t.t("Please select a currency to deposit");
        const dropDownIcon = <FontAwesomeIcon icon={["fas", "angle-down"]} />;
        let DepositOrDescription = <Alert
            message={<h2>{t.t("Before you start")}</h2>}
            description={<div>Additional description and informations about deposit
            <ul>
                    <li>Additional description and informations about deposit </li>
                    <li>Additional description and informations about deposit </li>
                    <li>Additional description and informations about deposit </li>
                    <li>Additional description and informations about deposit </li>
                    <li>Additional description and informations about deposit </li>
                </ul>
            </div>}
            type="info"
            showIcon
        />;
        let collapseClosed = false;
        if (this.props.selectedDepositCurrency) {
            collapseClosed = true;
            const data = [
                { name: t.t("Total"), value: this.props.balance[this.props.selectedDepositCurrency].balance.total || 0 },
                { name: t.t("In order"), value: this.props.balance[this.props.selectedDepositCurrency].balance.inOrder || 0 },
                { name: t.t("Available"), value: this.props.balance[this.props.selectedDepositCurrency].balance.available || 0 },
            ];
            const CurrencydropDownIcon = config.icons[this.props.selectedDepositCurrency];
            dropDownName = <div> {CurrencydropDownIcon} {config.currencies[this.props.selectedDepositCurrency].name}</div>;
            DepositOrDescription = <div>
                <h3>your {this.props.selectedDepositCurrency} balance:</h3>
                <List className="deposite-balance" bordered={false}
                    size="small"
                    dataSource={data}
                    renderItem={(item) => (<List.Item><span className="deposite-balance">{item.name}</span>{item.value}</List.Item>)}
                />
                <div className="wallet-label">Our {config.currencies[this.props.selectedDepositCurrency].name} wallet address:</div>
                <InputGroup className="wallet-group" compact>
                    <Input className="wallet" defaultValue={config.currencies[this.props.selectedDepositCurrency].depositeWallet} />
                    <CopyToClipboard text={config.currencies[this.props.selectedDepositCurrency].depositeWallet}
                        onCopy={() => this.showCopiedMessage()}>
                        <Tooltip placement="top" title="Copy wallet address to clipboard">
                            <Button className="copy neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "copy"]} />  Copy</Button>
                        </Tooltip>
                    </CopyToClipboard>
                    <Tooltip placement="top" title="Display Qr code of wallet">
                        <Button onClick={() => this.setQrModalStatus(true)} className="show-qr neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "qrcode"]} />  Qr code</Button>
                    </Tooltip>
                    <Modal
                        title={`${config.currencies[this.props.selectedDepositCurrency].name} Deposite address`}
                        wrapClassName="vertical-center-modal"
                        visible={this.state.qrModalVisible}
                        onOk={() => this.setQrModalStatus(false)}
                        onCancel={() => this.setQrModalStatus(false)}
                        footer={null}
                    >
                        <p>
                            <img className="qr-img"
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${config.currencies[this.props.selectedDepositCurrency].depositeWallet}`} alt="" />
                        </p>
                        <h3 className="modal-wallet">{config.currencies[this.props.selectedDepositCurrency].depositeWallet}</h3>
                    </Modal>
                </InputGroup>

                <Alert
                    message={<h3>{t.t("Warning")}</h3>}
                    description={<div>
                        <ul>
                            <li>coins will be available after <span className="confirmation-num">
                                {config.currencies[this.props.selectedDepositCurrency].confirmationNumber} </span> network confirmations</li>
                            <li>send only {config.currencies[this.props.selectedDepositCurrency].name}
                                (<span className="confirmation-num">{this.props.selectedDepositCurrency}</span>) to this walelt sending anyother coin may result loss of your deposit</li>
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
                        <span className="balance-icon">{config.icons[key]}</span>
                        <span className="balance-name">{config.currencies[key].name}</span>
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
                <Block showArrow={false} className="deposit-coin-select" collapseClosed={collapseClosed} collapse centerTitle={true} title={dropDownName} icon={dropDownIcon} iconPosition="left" >
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
