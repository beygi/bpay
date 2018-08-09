// import the core library.
import { Button } from "antd";
import ReactEcharts from "echarts-for-react";
import * as _ from "lodash";
import * as React from "react";
import "./style.less";

interface IProps {
    title: string;
    percent: number;
}

interface IState {
    options?: any;
}

class BatteryComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            options : {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                xAxis: {
                    type: "value",
                    min : 90,
                    max: 110,
                    splitNumber: 5,
                    axisLabel : {
                            formatter: "%{value}",
                    },
                },
                yAxis: {
                    type: "category",
                    data: [this.props.title],
                },
                series: [
                    {
                        type: "bar",
                        data: [],
                        color : "#ffff00",
                        markLine : {
                        data : [
                                    {
                                        name: "",
                                        xAxis: this.props.percent,
                                        itemStyle : { color : "#000000"},
                                    },

                        ],
                }, markArea : {
                data : [
                        [
                            {
                                name: "",
                                xAxis: 90,
                                itemStyle : { color : "#FF6347"},
                            },
                            {
                                xAxis: 98,
                            },
                        ],
                        [
                            {
                                name: "",
                                xAxis: 98,
                                 itemStyle : { color : "#FFA500"},
                            },
                            {
                                xAxis: 100,
                            },
                        ],
                        [
                            {
                                name: "",
                                xAxis: 100,
                            },
                            {
                                xAxis: 110,
                            },
                        ],
                ],
            },
                    },
                ],
                height: 20,
            },
    };
}

    public render() {
        const options = _.cloneDeep(this.state.options);
        options.series[0].markLine.data[0].xAxis = this.props.percent;
        return (
        <div className="gauge">
            <ReactEcharts
                style={{ height: 100 }}
                option={options}
            />
        </div>
        );
    }
}

export default BatteryComponent;
