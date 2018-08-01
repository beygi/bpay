import * as React from "react";
const commaNumber = require("comma-number");
import "./style.less";

interface IProps {
    value: number;
    fixFloatNum?: number;
    seperateThousand?: boolean;
}

interface IState {
    value: number;
    status?: "grow" | "fall" | "normal";
}

class ExchangeValueComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
        // check for grow or fall
        if (props.value > state.value) {
            return { status: "grow", value: props.value };
        }
        if (props.value < state.value) {
            return { status: "fall", value: props.value };
        }
        if (props.value === state.value) {
            return { status: "normal", value: props.value };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    public render() {
        let value = this.props.value.toFixed(this.props.fixFloatNum || 2);
        if (this.props.seperateThousand) {
            value = commaNumber(value);
        }
        return (
            <span className={`exchange-value ${this.state.status}`}>{value}</span>
        );
    }
}

export default ExchangeValueComponent;
