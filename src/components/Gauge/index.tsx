// import the core library.
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as React from "react";
import "./style.less";

interface IProps {
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
                        name: "BTC / ETH",
                        type: "gauge",
                        z: 4,
                        min: 90,
                        max: 110,
                        splitNumber: 4,
                        radius: "100%",
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 5,
                                color: [[0.4, "tomato"], [0.5, "orange"], [1, "lightgreen"]],
                            },
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 10,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: "auto",
                            },
                        },
                        splitLine: {           // 分隔线
                            length: 15,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
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
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: "bolder",
                            fontSize: 15,
                            offsetCenter: [0, "100%"],
                            color : "white",
                        },
                        detail: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            formatter: (value) => {
                                return  `%${value.toFixed(2)}`;
                            },
                             fontSize: 15,
                             offsetCenter: [0, "80%"],
                        },
                        pointer: {
                            width: 5,
                        },
                        data: [{ value: 100, name: "BTC / ETH" }],
                    },
                ],
            },
        };
        setInterval(() => {
            this.update();
        }, 2000);
    }

    public update() {
        const options = _.cloneDeep(this.state.options);
        options.series[0].data[0].value = _.random(options.series[0].data[0].value - 0.3, options.series[0].data[0].value + 0.3);
        this.setState({ options });
    }

    public render() {
        console.log("render");
        return (
            <ReactEcharts
                style={{ height: 170 }}
                option={this.state.options}
                opts={{renderer: "svg"}}
            />
        );
    }
}

export default GaugeComponent;
