import { Col, Layout, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import Block from "../../../components/Holder";
import API from "../../../lib/api/index";
import { setUser } from "../../../redux/app/actions";
import { IRootState } from "../../../redux/reducers";

import { Button, Input, Popover, Table } from "antd";
import KYC from "../../../components/KYC";
import Api from "../../../lib/api";

import * as _ from "lodash";
import t from "../../../services/trans/i18n";

import "./style.less";

interface IProps {
    user: any;
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
    }

    public componentDidMount() {
        this.loadData();
    }

    public render() {
        console.log(this.state);
        return (
            <Row gutter={8}>
                <Col md={24} >
                    <Table rowKey="id"
                        loading={this.state.loading}
                        columns={columns}
                        expandedRowRender={(record) => {
                             return (<KYC record={record}></KYC>);
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
        api.getAllKYC().then((response) => {
            response.data[1] = _.clone(response.data[0]);
            response.data[1].country = "IR";
            response.data[1].id = "123";
            response.data[1].ltype = "NI";

            response.data[2] = _.clone(response.data[0]);
            response.data[2].id = "125";
            response.data[2].country = "US";
            response.data[2].ltype = "PS";

            api.GetCountries().then((countries) => {
                response.data.forEach((obj) =>  {
                                                obj.country =  _.find(countries.data, {id :  obj.country});
                                                obj.ltype = types[obj.ltype];
                    });
                this.setState({countries : countries.data , dataSource : response.data , loading : false});
                console.log(this.state);
            });
        },
        );
        return true;
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

export default connect(mapStateToProps, mapDispatchToProps)(KycAdminContainer);
