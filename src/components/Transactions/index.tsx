/**
 * @module Components/Transactions
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import axios from "axios";
import * as React from "react";
import { JsonTable } from "react-json-to-html";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import Ex from "../ExchangeValue";
import Block from "../Holder";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();

interface IProps {
    /**  current user's email address that is synced with redux */
    email: any;
}

interface IState {
    invoices: any[];
}

const icons = {
    archived : <FontAwesomeIcon className="archived" icon={["fas", "times"]} />,
    waiting : <FontAwesomeIcon   className="waiting" icon={["fas", "hourglass-half"]} />,
    success : <FontAwesomeIcon   className="success" icon={["fas", "check"]} />,
};

/**
 * this component shows all transactions of merchant
 */
class Transactions extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { invoices: null };
        this.getData();
    }

    public render() {
        let invoices = null;
        if (this.state.invoices !== null) {
            // map
            invoices = this.state.invoices.map((invoice) => {
                return (
                    <Block collapse className={"transaction-block"}
                        title={<span>{invoice.symbol}<Ex  value={invoice.price} seperateThousand /></span>}
                        iconPosition="right" icon={icons[invoice.status]}>
                        <JsonTable json={invoice.products} />
                    </Block>
                );
            });
            return (
                <div>
                    {invoices}
                </div>
            );
        }
        return (
            <div>
                Loading ...
            </div >
        );

    }

    public getData() {
        axios.get("http://staging1.b2mark.com:8090/?action=list").then((response) => {
            this.setState({ invoices: response.data });
        });
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        email: state.app.user.email,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
