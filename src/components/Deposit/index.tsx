// use this dummy component to create new components

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "antd";
import * as React from "react";
import { connect } from "react-redux";
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
        return (
            <div>
            <Block className="deposit-coin-select" collapse title={t.t("Please select a currency to deposit")} icon={<FontAwesomeIcon icon={["fas", "list-ul"]} />} iconPosition="left" >
                <Balance />
            </Block>
            <Alert
                message={t.t("Before you start")}
                description="Additional description and informations about deposit"
                type="info"
                showIcon
            />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        selectedDepositCurrency: state.app.user.selectedDepositCurrency,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositComponent);
