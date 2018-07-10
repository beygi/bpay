import * as React from "react";
import {connect} from "react-redux";
import API from "../../lib/swager";
import {setUser} from "../../redux/app/actions";
import {IRootState} from "../../redux/reducers";

import {Button, Input, Popover, Table, Tabs, Tag} from "antd";

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const {CheckableTag} = Tag;
import paginationElement from "../../components/Pagination";

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
    {
        dataIndex: "vip", render: (record) => {
            return {
                children: record === "vip" ? "VIP" : "",
                props: {
                    className: record === "vip" ? "vip" : "",
                },
            };
        }, title: "",
    },
    {
        dataIndex: "fullname", render: (record) => {
            console.log(record);
            return {
                children: record,
                props: {
                    className: "noRightPadding",
                },
            };
        }, title: "Full Name",
    },
    {
        dataIndex: "role", render: (record) => {
            return {
                children: record,
                props: {
                    className: "role",
                },
            };
        }, title: "Role",
    },
    {title: "Skill", dataIndex: "skillName", key: "skillName"},
    {
        dataIndex: "status", key: "status", render: (record) => {
            return {
                children: <span><i className={"circle"}/>
                    <Popover content={content} trigger="click">{record}</Popover></span>,
                props: {
                    className: record,
                },
            };
        }, title: "Status",
    },
    {
        dataIndex: "", key: "x", render: () => {
            return {
                children: <a href="#">{t.t("view profile")}</a>,
                props: {
                    className: "endText",
                },
            };
        }, title: "",
    },
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
                        <div className={"tag-box"}>
                            <CheckableTag checked={false}>{t.t("inactive")}</CheckableTag>
                            <CheckableTag checked={true}>{t.t("active")}</CheckableTag>
                            <CheckableTag checked={false}>{t.t("warning")}</CheckableTag>
                            <CheckableTag checked={false}>{t.t("in progress")}</CheckableTag>
                        </div>
                        <div className={"chart-box"}>
                        </div>
                        <Table
                            loading={this.state.loading}
                            columns={columns}
                            expandedRowRender={(record) => <p style={{margin: 0}}>{record.description}</p>}
                            // rowClassName={(record, index) => record.status + index}
                            dataSource={this.state.users}
                            pagination={this.state.pagination}
                            onChange={this.tableChange}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    private tableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination,
            loading: true,
        });
        this.loadData(pagination.current);
    }

    private loadSkills(force: boolean = false): Promise<any> {
        return new Promise<any>((res, rej) => {

            if (this.skills.length > 0 && !force) {
                res(this.skills);
                return;
            }

            // this.api.skills_list_get({pageNumber: 1, pageSize: 100})
            //     .then((skills) => {
            //         this.skills = this.skills.concat(skills);
            //         res(this.skills);
            //     });
        });
    }

    private getSkillName(skillId: number): string {
        const skill = this.skills.filter((s) => {
            return (s.id === skillId);
        });
        if (skill && skill[0]) {
            return skill[0].title;
        }
        return "";
    }

    private loadData(page = 1) {
        const promises: any = [];
        // promises.push(this.loadSkills(false));
        // promises.push(this.api.users_list_get({pageNumber: page, pageSize: 15}, false));

        Promise.all(promises)
            .then((values) => {
                const skills = values[0];
                const users: any = values[1];
                this.setState({
                    pagination: paginationElement(users.links),
                    users: users.data.map((user) => {
                        const userObj: {
                            [key: string]: any;
                        } = {};
                        userObj.id = user.id;
                        userObj.fullname = user.attributes.full_name;
                        userObj.role = user.attributes.role;
                        userObj.status = user.attributes.status;
                        userObj.email = user.attributes.email;
                        userObj.skillName = this.getSkillName(user.relationships.skill.data.id);
                        return userObj;
                    }),
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    users: [],
                    loading: false,
                });
            });
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
