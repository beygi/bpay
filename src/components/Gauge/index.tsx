/**
 * @module Components/GaugeComponent
 */
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as React from "react";
import "./style.less";

interface IProps {
    /** guage title with is displayed in center of guage */
    title: string;
    /** given percent */
    percent: number;
}

interface IState {
    /** holds echart's options object */
    options?: any;
}

/**
 * a component for display a nice animated gauge
 * from given props using echarts
 */
class GaugeComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        // options for echart, you can find more on echart's website
        this.state = {
            options: {
                grid: {
                    top: 0,
                    bottom: -50,
                    left: 0,
                    right: 0,
                    show: false,
                    backgroundColor: "#000000",
                    height: "50%",
                },
                series: [
                    {
                        name: this.props.title,
                        type: "gauge",
                        startAngle: 180,
                        endAngle: 0,
                        z: 4,
                        min: 90,
                        max: 110,
                        splitNumber: 4,
                        radius: "100%",
                        axisLine: {
                            lineStyle: {
                                width: 5,
                                color: [[0.4, "tomato"], [0.5, "orange"], [1, "lightgreen"]],
                            },
                        },
                        axisTick: {
                            length: 10,
                            lineStyle: {
                                color: "auto",
                            },
                        },
                        splitLine: {
                            length: 15,
                            lineStyle: {
                                color: "auto",
                            },
                        },
                        axisLabel: {
                            formatter: (value) => {
                                return `%${value}`;
                            },
                            fontSize: 13,
                        },
                        title: {
                            fontWeight: "bolder",
                            fontSize: 15,
                            offsetCenter: ["0%", "-25%"],
                            color: "white",
                        },
                        detail: {
                            formatter: (value) => {
                                return `%${value.toFixed(2)}`;
                            },
                            fontSize: 10,
                            offsetCenter: ["-90%", "-85%"],
                        },
                        pointer: {
                            width: 5,
                        },
                        data: [{ value: this.props.percent, name: this.props.title }],
                    },
                ],
            },
        };
    }

    public render() {
        const options = _.cloneDeep(this.state.options);
        options.series[0].data[0].value = this.props.percent;
        return (
            <div className="gauge">
                <ReactEcharts
                    style={{ height: 150 }}
                    option={options}
                    opts={{ renderer: "svg" }}
                />
            </div>
        );
    }
}

export default GaugeComponent;
