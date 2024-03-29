/**
 * @module Components/KycComponent
 */
import { Button, Card, List, notification } from "antd";
import * as React from "react";
import config from "../../config";
import Api from "../../lib/api/kyc";
import t from "../../services/trans/i18n";
import "./style.less";
const api = Api.getInstance();

interface IProps {
    /** kyc record */
    record: any;
    /** change record function from parent */
    changeRecord: any;
}

interface IState {
    /** prepared pictures from record  */
    pictures: any[];
    /** kyc record  */
    record: any;
}

/**
 * a component to show a user kyc and change functions
 */
class KycComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            record: this.props.record,
            pictures: [
                {
                    title: t.t("Passport cover"),
                    image: config.apiUrl + "/img/" + this.props.record.uid + "/cover",
                },
                {
                    title: t.t("Passport Personal Page"),
                    image: config.apiUrl + "/img/" + this.props.record.uid + "/passid",
                },
                {
                    title: t.t("Selfie With ID And Note"),
                    image: config.apiUrl + "/img/" + this.props.record.uid + "/passport",
                },
            ],
        };
        this.changeStatus = this.changeStatus.bind(this);
    }
    public changeStatus(id, status) {
        api.updateKycStatusUsingPUT({ uid: id, status }).then((response) => {
            if (response.status === 200) {
                this.setState({ record: response.data });
                this.props.changeRecord(this.state.record.uid, status);
            }
        });
    }
    public render() {

        const AcceptButton = <Button onClick={(e) => this.changeStatus(this.state.record.uid, "accepted")} size="large" type="primary">{t.t("Accept")}</Button>;
        const RejectButton = <Button onClick={(e) => this.changeStatus(this.state.record.uid, "pending")} size="large" >{t.t("Pending")}</Button>;
        const PendingButton = <Button onClick={(e) => this.changeStatus(this.state.record.uid, "rejected")} size="large" type="danger">{t.t("Reject")}</Button>;

        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={this.state.pictures}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.title}><a target="_blank" href={item.image}><img className="KYC-img" alt="" src={item.image} /></a></Card>
                        </List.Item>
                    )}
                />
                <div className="kyc-buttons">
                    {AcceptButton}
                    {RejectButton}
                    {PendingButton}
                </div>
            </div >
        );
    }

    private action(type) {
        // success info  warning error
        notification.success({
            message: "Notification Title",
            description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            placement: "bottomRight",
            duration: 0,
        });
    }

}

export default KycComponent;
