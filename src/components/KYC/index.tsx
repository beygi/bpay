import { Button, Card, Col, Icon, List, notification, Row, Steps } from "antd";
import * as React from "react";
import config from "../../../src/config";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    record: any;
}

interface IState {
    pictures: any[] ;
}

class KycComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            pictures: [
                {
                    title: t.t("Passport cover"),
                    image : config.apiUrl + "img/f6e3553c-021e-4e12-8ac3-e78a2538c8de/cover",
                },
                {
                    title: t.t("Passport Personal Page"),
                    image : config.apiUrl + "img/f6e3553c-021e-4e12-8ac3-e78a2538c8de/passid",
                },
                {
                    title: t.t("Selfie With ID And Note"),
                    image : config.apiUrl + "img/f6e3553c-021e-4e12-8ac3-e78a2538c8de/passport",
                },
            ],
        };
    }

    public render() {
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
