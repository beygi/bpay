/**
 * @module Components/ExchangeValueComponent
 */
import * as React from "react";
const commaNumber = require("comma-number");
import "./style.less";

interface IProps {
    /** input numer */
    value: number;
    /**  number of floating point digits to display , default is 2 */
    fixFloatNum?: number;
    /** seperate thousands with comma */
    seperateThousand?: boolean;
}

interface IState {
    /** keeps value to compare with new one from props */
    value: number;
    /** growth status */
    status?: "grow" | "fall" | "normal";
}

/**
 * this component display numbers and support colorful display
 * when number grows or falls, thousand seperator and fix floats
 * are supported too
 */
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
        let value = this.props.value.toFixed( (this.props.fixFloatNum === 0) ? this.props.fixFloatNum : ( this.props.fixFloatNum || 2) );
        if (this.props.seperateThousand) {
            value = commaNumber(value);
        }
        return (
            <span className={`exchange-value ${this.state.status}`}>{value}</span>
        );
    }
}

export default ExchangeValueComponent;
