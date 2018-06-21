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
                    <Table
                        loading={this.state.loading}
                        columns={columns}
                        expandedRowRender={(record) => {
                             record.country = _.find(this.state.countries, {id : record.country})[0].name;
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
        api.getAllKYC().then((response) => {
            console.log(response.data);
            response.data[1] = _.clone(response.data[0]);
            response.data[1].country = "IR";
            response.data[2] = _.clone(response.data[0]);
            response.data[2].country = "US";

            this.setState({dataSource : response.data , loading : false});
        },
        );
        api.GetCountries().then((response) => {
            this.setState({countries : response.data });
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
