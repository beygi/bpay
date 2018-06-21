import { Button, Col, Icon, notification, Row, Steps } from "antd";
import * as React from "react";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    record: any;
}

interface IState {
}

class KycComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        alert("render");
        console.log(this.props);
        return (
            <div>
                {this.props.record.country}
            </div >
        );
    }

    private action(type) {
        // success info  warning error
        notification.success({
            message: "Notification Title",
            description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            placement : "bottomRight",
            duration : 0,
        });
    }

}

export default KycComponent;
