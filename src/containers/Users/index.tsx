import * as React from "react";
import { connect } from "react-redux";
import API from "../../lib/swager";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";

import { Button, Input, Popover, Table, Tabs, Tag } from "antd";

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { CheckableTag } = Tag;
// import paginationElement from "../../components/Pagination";

import t from "../../services/trans/i18n";

import "./style.less";

interface IProps {
    user: any;
}

interface IState {
    users: any[];
    loading: boolean;
    pagination: any;
}

const columns = [
    { title: "Name", dataIndex: "fname", key: "fname" },
    { title: "Family", dataIndex: "lname", key: "lname" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { dataIndex: "status", key: "status", render: (record) => <b>{record}</b>, title: "Status" },
];

const content = (
    <div>
        <Button type="primary">{t.t("active")}</Button>
        <Button>{t.t("verify")}</Button>
        <Button>{t.t("test")}</Button>
    </div>
);

class CustomersContainer extends React.Component<IProps, IState> {
    private api = API.getInstance();
    private skills = [];

    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            pagination: {},
        };
    }

    public componentDidMount() {
        this.loadData();
    }

    public loadData() {
        // make an ajax call to users
        this.setState({
            users: [
                {
                    fname: "mahdy",
                    lname: "beygi",
                },
            ],
            loading : false,
        });
    }

    public render() {
        return (
            <div className={"layout account-manager users"}>

                <Search
                    placeholder={t.t("search")}
                    onSearch={
                        (value) => {
                            // console.log(value)
                        }
                    }
                    enterButton
                />

                <Table
                    loading={this.state.loading}
                    columns={columns}
                    expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
                    // rowClassName={(record, index) => record.status + index}
                    dataSource={this.state.users}
                    pagination={this.state.pagination}
                    onChange={this.tableChange}
                />
            </div>
        );
    }

    private tableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination,
            loading: true,
        });
    }

}

function mapDispatchToProps(dispatch) {
    return {
        user: (user) => dispatch(setUser({ user })),
    };
}

function mapStateToProps(state: IRootState) {
    return {
        user: state.app.user,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
