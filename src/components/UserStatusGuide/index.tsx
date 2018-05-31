import { Button, Col, Icon, notification, Row, Steps } from "antd";
import * as React from "react";

import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import USER from "./../../lib/user";
import "./style.less";

const userObject = USER.getInstance();
const Step = Steps.Step;

interface IProps {
    user: any;
}

interface IState {
}

class UserStatusGuideComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // this.action = this.action.bind(this);
    }

    public render() {
        return (
            <div className="user-status-guide">
                <Steps>
                    <Step description={t.t("You are a member")} status="finish" title={t.t("Register")} icon={<Icon type="user" />} />
                    <Step description={t.t("Verify your email address")} status="finish" title={t.t("Verify email")} icon={<Icon type="mail" />} />
                    <Step description={t.t("Checking documents")} status="process" title={t.t("Check")} icon={<Icon type="loading-3-quarters" />} />
                    <Step description="This is a description." status="wait" title={t.t("Identity check")} icon={<Icon type="solution" />} />
                    <Step description={t.t("Happy Trading")} status="wait" title="Done" icon={<Icon type="check" />} />
                </Steps>
                <div>
                    <Button onClick={() => this.action("success")}  className="action" icon="mail" type="primary" size="large">Verify Email Address </Button>
                </div>
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

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStatusGuideComponent);
