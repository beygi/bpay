import { Col, Layout, Row } from "antd";
import { Button, Icon, Input, Pagination, Popover, Table, Tabs, Tag } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import * as React from "react";
import { JsonTable } from "react-json-to-html";
import { connect } from "react-redux";
import API from "../../lib/api-old";
import { setUser } from "../../redux/app/actions";
import { IRootState } from "../../redux/reducers";

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const { CheckableTag } = Tag;
const api = API.getInstance();
const ButtonGroup = Button.Group;

// import paginationElement from "../../components/Pagination";

import t from "../../services/trans/i18n";

import "./style.less";

interface IProps {
    user: any;
}

interface IState {
    users: any[];
    loading: boolean;
    perPage: number;
    currentPage: number;
    searchTerm: string;
    hasNext: boolean;
}

const columns = [
    { title: "Name", dataIndex: "firstName", key: "firstName" },
    { title: "Family", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
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
            perPage: 20,
            currentPage: 1,
            searchTerm: "",
            hasNext: false,
        };
        this.loadData = this.loadData.bind(this);
        this.loadNext = this.loadNext.bind(this);
        this.loadPrev = this.loadPrev.bind(this);
        this.loadFirst = this.loadFirst.bind(this);
    }

    public componentDidMount() {
        this.loadData(this.state.currentPage, this.state.perPage, "");
    }

    public loadFirst() {
        this.loadData(1, this.state.perPage, this.state.searchTerm);
    }

        public loadNext() {
            this.loadData(this.state.currentPage + 1, this.state.perPage, this.state.searchTerm);
        }

        public loadPrev() {
            this.loadData(this.state.currentPage - 1, this.state.perPage, this.state.searchTerm);
        }

    public loadData(current: number, size: number, searchTerm?: string) {
        // set loader image
        this.setState({ loading: true });
        // make an ajax call to users
        api.GetUsers(searchTerm, current, size).then((res) => {
            if (res.data.length >= this.state.perPage) {
                this.setState({ hasNext: true });
            } else {
                this.setState({ hasNext: false });
            }
            this.setState({
                users: res.data,
                loading: false,
                currentPage : current,
            });
        });
    }

    public render() {
        return (
            < Row gutter={8} >
                <Col md={24} >
                    <Search className="user-search"
                        placeholder="input search text"
                        onSearch={(value) => {
                            this.setState({ searchTerm: value });
                            this.loadData(1, this.state.perPage, value);
                        }}
                    />
                    <Table rowKey="id"
                        loading={this.state.loading}
                        columns={columns}
                        pagination= {false}
                        expandedRowRender={(record) =>
                            <Tabs>
                                <TabPane tab={<span><Icon type="idcard" />Detailed Information</span>} key="1">
                                    <JsonTable json={record} />
                                </TabPane>
                                <TabPane tab={<span><Icon type="table" />Trade History</span>} key="2">
                                    Tab 2
                                </TabPane>
                            </Tabs>}
                        // rowClassName={(record, index) => record.status + index}
                        dataSource={this.state.users}
                    />
                </Col>
                <Col md={24} className="user-pagination">
                    <ButtonGroup>
                        <Button  onClick={this.loadFirst} disabled={this.state.currentPage === 1} type="primary">
                           {t.t("First Page")}
                        </Button>
                        <Button onClick={this.loadPrev}  disabled={this.state.currentPage === 1} type="primary">
                            <Icon type="left" />{t.t("Previous Page")}
                        </Button>
                        <Button onClick={this.loadNext} disabled={!this.state.hasNext} type="primary">
                            {t.t("Next Page")}<Icon type="right" />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row >);
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
