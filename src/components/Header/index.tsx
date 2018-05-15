import {Icon, Input, Layout} from "antd";
import * as React from "react";

const Search = Input.Search;
import { connect } from "react-redux";
import { logOut } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";
import USER from "./../../lib/user";
import "./style.less";

const {Header}: any = Layout;
const userObject =  USER.getInstance();

interface IProps {
    user: any;
    logOut: () => void;
}

interface IState {
}

class HeaderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    public logOut() {
        this.props.logOut();
        userObject.keycloak.logout();
    }

    public render() {
        return (
            <Header>
                <Icon type="logout" onClick={this.logOut} />
                <Search
                    placeholder="search"
                    onSearch={(value) => console.log(value)}
                />
            </Header>
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
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
