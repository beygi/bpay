import { Button, Icon, Input, Modal, Select, Table, Tabs, Tag } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";

const Option = Select.Option;

const Search = Input.Search;
const TabPane = Tabs.TabPane;

import "./style.less";

interface IProps {
}

interface IState {
    // user: any;
    visible: boolean;
    editModal: boolean;
}

// TODO: should move to State using apis
const columns = [
    { title: t.t("Group Name"), dataIndex: "report", key: "report" },
    {
        dataIndex: "status", key: "status", render: (record) => {
            return {
                children: <div>{[1, 2, 3].map((item) => <span key={item}>title,</span>)}</div>,
                props: {
                    className: record,
                },
            };
        }, title: t.t("Permission"),
    },
    {
        dataIndex: "", key: "x", render: () => {
            return {
                children: <span className={"anchor"} onClick={this.showEditModal}>{t.t("edit")}</span>,
                props: {
                    className: "endText",
                },
            };
        }, title: "",
    },
];
const data = [
    {
        description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
        key: 1, report: t.t("lorem ipsum"), status: "active",
    },
    {
        description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
        key: 2, report: t.t("lorem ipsum"), status: "warning",
    },
    {
        description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
        key: 3, report: t.t("lorem ipsum"), status: "inactive",
    },
];
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class GroupsContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: false,
            editModal: false,
        };
    }

    public showEditModal = () => {
        this.setState({
            editModal: true,
        });
    }

    public showModal = () => {
        this.setState({
            visible: true,
        });
    }
    public handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    public handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    public render() {
        return (
            <div className={"layout account-manager groups"}>
                <Search
                    placeholder={t.t("search")}
                    enterButton
                />
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t.t("sth")} key="1">
                        <div>
                            <Button type={"primary"}
                                size={"default"} className={"addMetricBtn"}
                                onClick={this.showModal}>{t.t("add new group")}
                            </Button>
                            <Table
                                columns={columns}
                                expandedRowRender={(record) => <p style={{ margin: 0 }}>{record.description}</p>}
                                // rowClassName={(record, index) => record.status + index}
                                dataSource={data}
                            />
                            <Modal
                                title={t.t("add group")}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <Input placeholder={t.t("Group Name")} />
                                <Select
                                    mode="multiple"
                                    className={"fullWidth"}
                                    placeholder="Permission"
                                >
                                    {children}
                                </Select>
                            </Modal>
                            <Modal
                                title={t.t("edit group")}
                                visible={this.state.editModal}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <Input placeholder={t.t("Group Name")} />
                                <Select
                                    mode="multiple"
                                    className={"fullWidth"}
                                    placeholder="Permission"
                                >
                                    {children}
                                </Select>
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default GroupsContainer;
