import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import * as React from "react";
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

interface IProps {
    selectedDepositCurrency: string;
}

interface IState {
}

class DepositComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        let dropDownName = t.t("Please select a currency to deposit");
        const dropDownIcon = <FontAwesomeIcon icon={["fas", "angle-down"]} />;
        let DepositOrDescription = <Alert
            message={t.t("Before you start")}
            description={<div>Additional description and informations about deposit
            <ul>
                <li>Additional description and informations about deposit </li>
                <li>Additional description and informations about deposit </li>
                <li>Additional description and informations about deposit </li>
                <li>Additional description and informations about deposit </li>
                <li>Additional description and informations about deposit </li>
            </ul>
            </div>}
        type = "info"
        showIcon
        / > ;
        let collapseClosed = false;
        if (this.props.selectedDepositCurrency) {
            const CurrencydropDownIcon = <FontAwesomeIcon icon={config.currencies[this.props.selectedDepositCurrency].icon} />;
            dropDownName = <div> {CurrencydropDownIcon} {config.currencies[this.props.selectedDepositCurrency].name}</div>;
            DepositOrDescription = <div>{config.currencies[this.props.selectedDepositCurrency].name}</div>;
            collapseClosed = true;
        }
        const coins = Object.keys(config.currencies).map((key) =>
            <Link replace={true} to={`/deposit/${key}`} key={key}>
                <h2>
                    <FontAwesomeIcon className="balance-icon" icon={config.currencies[key].icon} />
                    <span className="balance-name">{config.currencies[key].name}</span>
                </h2>
            </Link>,
        );
        if (this.props.selectedDepositCurrency) {
            return (<div><Block className="deposit-coin-select" centerTitle={true} title={dropDownName}  icon={<Link replace={true} to={`/deposit/`} >{dropDownIcon}</Link>} >
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

export default DepositComponent;
