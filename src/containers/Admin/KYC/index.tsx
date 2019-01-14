import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";
import KYC from "../../../components/Admin-KYC";
import Api from "../../../lib/api/kyc";

import * as _ from "lodash";
import t from "../../../services/trans/i18n";

import config from "../../../config";
import USER from "../../../lib/user";
import "./style.less";

interface IProps {
}

interface IState {
    dataSource: any[];
    loading: boolean;
    pagination: any;
    countries: any[];
}

// const columns = [
//     { title: "Name", dataIndex: "fname", key: "fname" },
//     { title: "Family", dataIndex: "lname", key: "lname" },
//     { title: "Gender", dataIndex: "gender", key: "gender" },
//     { title: "Country", dataIndex: "country", key: "country", render: (record) => record.name },
//     { title: "License type", dataIndex: "ltype", key: "ltype" },
//     { title: "License id", dataIndex: "licenseid", key: "licenseid" },
//     { dataIndex: "status", key: "status", render: (record) => <b>{record}</b>, title: "Status" },
// ];

const columns = [
    { title: t.t("Name"), dataIndex: "fname", key: "fname" },
    { title: t.t("Family"), dataIndex: "lname", key: "lname" },
    { title: t.t("Gender"), dataIndex: "gender", key: "gender" },
    { title: t.t("Address"), dataIndex: "address", key: "address" },
    { title: t.t("Card number"), dataIndex: "card", key: "card" },
    { title: t.t("National Code"), dataIndex: "licenseid", key: "licenseid" },
    { title: t.t("Status"), dataIndex: "status", key: "status", render: (record) => <b>{record}</b> },
];

class KycAdminContainer extends React.Component<IProps, IState> {
    public userObject = USER.getInstance();
    public api = Api.getInstance();
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            pagination: {},
            countries: [],
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.api.setAuthToken(this.userObject.getToken().value);
        this.api.setBaseURL(config.apiUrl);
    }

    public componentDidMount() {
        this.loadData();
    }

    public changeStatus(uid, status) {
        let index = 0;
        const newDataSource = this.state.dataSource;
        index = _.findIndex(newDataSource, { uid });
        newDataSource[index].status = status;
        this.setState({ dataSource: newDataSource });
    }

    public render() {
        return (
            <Row gutter={8}>
                <Col md={24} >
                    <Table rowKey="id"
                        loading={this.state.loading}
                        columns={columns}
                        expandedRowRender={(record) => {
                            return (<KYC record={record} changeRecord={this.changeStatus}></KYC>);
                        }}
                        // rowClassName={(record, index) => record.status + index}
                        dataSource={this.state.dataSource}
                    />
                </Col>
            </Row>
        );
    }

    private loadData() {
        const types = {
            DL: "Driving License",
            PS: "Passport",
            NI: "National ID Card",
        };
        this.api.getAllKycesUsingGET({}).then((response) => {
            this.api.allcountriesUsingGET({}).then((countries) => {
                response.data.forEach((obj) => {
                    obj[`country`] = _.find(countries.data, { id: obj.country }).name;
                    obj[`licensetype`] = types[obj.ltype];
                });
                this.setState({ countries: countries.data, dataSource: response.data, loading: false });
            });
        },
        );
        return true;
    }

}

export default KycAdminContainer;
