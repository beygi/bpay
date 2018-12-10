/**
 * @module Components/GatewayInformationComponent
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Table, Tooltip } from "antd";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import config from "../../config";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

const InputGroup = Input.Group;

interface IProps {
    /** current users apiKey from redux */
    apiKey: string;
    /** current users mobile from redux */
    mobile: string;
    /** current language */
    language: string;
}

interface IState {
    displayApiKey: boolean;
}

/**
 * user's menu that is visible after click to users avatar
 * it shows some usefull information and includes logout
 * and change password button
 */
class GatewayInformationComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { displayApiKey: false };
    }

    public showCopiedMessage() {
        message.success(t.t("Your API key copied to clipboard successfully"));
    }

    public render() {
        const columns = [
            {
                title: "key",
                dataIndex: "key",
            },
            {
                title: "value",
                dataIndex: "value",
            }];

        const data = [
            {
                key: t.t("API key"), value:
                    <div>
                        <InputGroup compact >
                            {
                                (this.state.displayApiKey) ?
                                    <Button onClick={() => this.setState({ displayApiKey: false })}
                                        className="copy neat-btn" type="primary"><FontAwesomeIcon icon={["far", "eye-slash"]} />  {t.t("Hide")}</Button>
                                    :
                                    <Button onClick={() => this.setState({ displayApiKey: true })}
                                        className="copy neat-btn" type="primary"><FontAwesomeIcon icon={["far", "eye"]} />  {t.t("Show")}</Button>
                            }
                            {
                                (this.state.displayApiKey) ? <Input className="api-key-input" defaultValue={this.props.apiKey} /> : null
                            }
                            <CopyToClipboard text={this.props.apiKey}
                                onCopy={() => this.showCopiedMessage()}>
                                <Tooltip placement="top" title={t.t("Copy API key to clipboard")}>
                                    <Button className="copy neat-btn" type="primary"><FontAwesomeIcon icon={["fas", "copy"]} />  {t.t("Copy")}</Button>
                                </Tooltip>
                            </CopyToClipboard>
                        </InputGroup>
                    </div>,

            },
            { key: t.t("Service URL"), value: config.NewApiUrl },
            { key: t.t("Mobile"), value: this.props.mobile },
        ];
        return (
            <Table className="gateway-info"
                pagination={false}
                showHeader={false}
                columns={columns}
                rowKey="id" dataSource={data} size="small" />
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut()),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        apiKey: state.app.user.apiKey,
        mobile: state.app.user.mobile,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GatewayInformationComponent);
