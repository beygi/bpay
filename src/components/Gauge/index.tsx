// import the core library.
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as React from "react";
import "./style.less";

interface IProps {
    to: string;
    percent: number;
}

interface IState {
    options?: any;
}

class GaugeComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            options: {
                series: [
                    {
                        name: this.props.to,
                        type: "gauge",
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
                            offsetCenter: [0, "100%"],
                            color: "white",
                        },
                        detail: {
                            formatter: (value) => {
                                return `%${value.toFixed(2)}`;
                            },
                            fontSize: 15,
                            offsetCenter: [0, "75%"],
                        },
                        pointer: {
                            width: 5,
                        },
                        data: [{ value: this.props.percent, name: this.props.to }],
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
                    style={{ height: 170 }}
                    option={options}
                    opts={{ renderer: "svg" }}
                />
            </div>
        );
    }
}

export default GaugeComponent;
