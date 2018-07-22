import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";
import KYC from "../../../components/KYC";
import Api from "../../../lib/api/kyc";

import * as _ from "lodash";
import t from "../../../services/trans/i18n";

import "./style.less";

interface IProps {
}

interface IState {
    dataSource: any[];
    loading: boolean;
    pagination: any;
    countries: any[];
}

const api = Api.getInstance();

const columns = [
    { title: "Name", dataIndex: "fname", key: "fname" },
    { title: "Family", dataIndex: "lname", key: "lname" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {title: "Country" , dataIndex: "country", key: "country", render: (record) => record.name },
    { title: "License type", dataIndex: "ltype", key: "ltype" },
    { title: "License id", dataIndex: "licenseid", key: "licenseid" },
    {dataIndex: "status", key: "status", render: (record) => <b>{record}</b> , title: "Status" },
];

class KycAdminContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            pagination: {},
            countries: [],
        };
        this.changeStatus = this.changeStatus.bind(this);
    }

    public componentDidMount() {
        this.loadData();
    }

   public changeStatus(uid, status) {
       let index = 0;
       const newDataSource = this.state.dataSource;
       index = _.findIndex(newDataSource, {uid});
       newDataSource[index].status = status;
       this.setState({dataSource: newDataSource});
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
                        } }
                        // rowClassName={(record, index) => record.status + index}
                        dataSource={this.state.dataSource}
                    />
                </Col>
            </Row>
        );
    }

    private loadData() {
        const  types = {
                DL: "Driving License",
                PS : "Passport",
                NI: "National ID Card",
        };
        api.getAllKycesUsingGET({}).then((response) => {
            api.allcountriesUsingGET({}).then((countries) => {
                response.body.forEach((obj) =>  {
                                                obj.country =  _.find(countries.body, {id :  obj.country});
                                                obj.ltype = types[obj.ltype];
                    });
                this.setState({countries : countries.body , dataSource : response.body , loading : false});
            });
        },
        );
        return true;
    }

}

export default KycAdminContainer;
