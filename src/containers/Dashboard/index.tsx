import { Layout } from "antd";
import * as React from "react";
import {connect} from "react-redux";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";

interface IProps {
    user: any;
}

interface IState {
    user: any;
}

class DashboardContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Layout>

            </Layout>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({user})),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
