/**
 * @module Components/LineChartComponent
 */
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as Moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    /** guage title with is displayed in center of guage */
    title: string;
    /** user selected theme */
    theme: string;
}

interface IState {
    /** holds echart's options object */
    series: any[];
}

/**
 * a component for display a nice animated gauge
 * from given props using echarts
 */
class LineChartComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // options for echart, you can find more on echart's website
        this.state = {
            series: [
                {
                    name: "بیت کوین",
                    type: "line",
                    data: [["2017-08-15T10:04:01.339Z", 5], ["2017-08-18T10:14:13.914Z", 7]],
                },
                {
                    name: "اتریوم",
                    type: "line",
                    data: [["2017-09-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
                {
                    name: "لایت کوین",
                    type: "line",
                    data: [["2017-10-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
                {
                    name: "BTC",
                    type: "line",
                    data: [["2018-01-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
            ],
        };
    }

    public render() {
        const options = {
            grid: {
                top: 45,
                bottom: 45,
                left: 50,
                right: 50,
                show: false,
                backgroundColor: "#000000",
            },
            tooltip: {
                trigger: "axis",
            },
            legend:
            {
                show: true,
                top: 10,
                height: 20,
                inactiveColor: "#66666680",
                textStyle:
                {
                    verticalAlign: "bottom",
                    height: 50,
                    fontWeight: "bold",
                    fontFamily: "b2mark, Becopay",
                },
            },
            calculable: true,
            xAxis: [
                {
                    type: "time",
                    boundaryGap: false,
                    axisLabel: {
                        margin: 20,
                        align: "center",
                        fontFamily: "b2mark, Becopay",
                        fontWeight: "bold",
                        formatter: ((value) => {
                            return Moment(value).format("DD MMMM YY");
                        }),

                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    axisLabel: {
                        margin: 20,
                        align: "center",
                        fontFamily: "b2mark, Becopay",
                        fontWeight: "bold",
                        formatter: ((value) => value.toLocaleString(t.default.language, { useGrouping: true })),
                    },
                },
            ],
            series: this.state.series,
        };
        // const options = _.cloneDeep(this.state.options);
        // options.series[0].data[0].value = this.props.percent;
        return (
            <div className="">
                <ReactEcharts
                    theme={this.props.theme}
                    option={options}
                />
            </div>
        );
    }
}

function mapStateToProps(state: IRootState) {
    return {
        theme: state.app.user.theme,
        language: state.app.user.language,
    };
}

export default connect(mapStateToProps)(LineChartComponent);
