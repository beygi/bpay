/**
 * @module Components/LineChartComponent
 */
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as Moment from "moment";
import * as React from "react";
import "./style.less";

interface IProps {
    /** guage title with is displayed in center of guage */
    title: string;
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
                    name: "A",
                    type: "line",
                    data: [["2017-08-15T10:04:01.339Z", 5], ["2017-08-18T10:14:13.914Z", 7]],
                },
                {
                    name: "B",
                    type: "line",
                    data: [["2017-09-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
                {
                    name: "C",
                    type: "line",
                    data: [["2017-10-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
                {
                    name: "D",
                    type: "line",
                    data: [["2018-01-16T10:04:01.339Z", 9], ["2017-09-17T10:14:13.914Z", 12]],
                },
            ],
        };
    }

    public render() {
        const options = {
            grid: {
                top: 30,
                bottom: 30,
                left: 30,
                right: 30,
                show: false,
                backgroundColor: "#000000",
            },
            tooltip: {
                trigger: "axis",
            },
            legend:
            {
                show: true,
            },
            calculable: true,
            xAxis: [
                {
                    type: "time",
                    boundaryGap: false,
                    axisLabel: {
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
                        formatter: "{value}",
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
                    theme="light"
                    option={options}
                    opts={{ renderer: "svg" }}
                />
            </div>
        );
    }
}

export default LineChartComponent;
