// use this dummy component to create new components

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
        let dropDownIcon = <FontAwesomeIcon icon={["fas", "list-ul"]} />;
        let DepositOrDescription = <Alert
            message={t.t("Before you start")}
            description="Additional description and informations about deposit"
            type="info"
            showIcon
        />;
        if (this.props.selectedDepositCurrency) {
            dropDownName = config.currencies[this.props.selectedDepositCurrency].name;
            dropDownIcon = <FontAwesomeIcon icon={config.currencies[this.props.selectedDepositCurrency].icon} />;
            DepositOrDescription = <div>{config.currencies[this.props.selectedDepositCurrency].name}</div>;
        }
        const coins = Object.keys(config.currencies).map((key) =>
            <Link replace={true} to={`/deposit/${key}`} key={key}>
                <h2>
                    <FontAwesomeIcon className="balance-icon" icon={config.currencies[key].icon} />
                    <span className="balance-name">{config.currencies[key].name}</span>
                </h2>
            </Link>,
        );
        return (
            <div>
                <Block className="deposit-coin-select" collapse title={dropDownName} icon={dropDownIcon} iconPosition="left" >
                    {coins}
                </Block>
                {DepositOrDescription}
            </div >
        );
    }
}

export default DepositComponent;
