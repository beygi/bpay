/**
 * @module Components/ExchangeValueComponent
 */
import * as React from "react";
import t from "../../services/trans/i18n";
import "./style.less";

interface IProps {
    /** input numer */
    value: number;
    /**  number of floating point digits to display , default is 2 */
    floatsNum?: number;
    /** always display floats even when not exist. default is true */
    fixedFloats?: boolean;
    /** seperate thousands with comma */
    seperateThousand?: boolean;
    /** display local numbers */
    localNumbers?: boolean;
    /** Will be displayed in red and green color when value is changed */
    stockStyle?: boolean;
    /** Display Percent mark at begining */
    percentMark?: boolean;
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
        if (props.stockStyle === false) { return { status: "normal", value: parseFloat(props.value) }; }
        // check for grow or fall
        if (props.value > state.value) {
            return { status: "grow", value: parseFloat(props.value) };
        }
        if (props.value < state.value) {
            return { status: "fall", value: parseFloat(props.value) };
        }
        if (props.value === state.value) {
            return { status: "normal", value: parseFloat(props.value) };
        }
        return null;
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: parseFloat(this.props.value + ""),
            status: "normal",
        };
    }

    public render() {
        const floats = (this.props.floatsNum === 0) ? this.props.floatsNum : (this.props.floatsNum || 2);
        let output = "";
        const options = {
            minimumFractionDigits: floats,
            maximumFractionDigits: floats,
            useGrouping: this.props.seperateThousand,
        };

        if (this.props.localNumbers == null || this.props.localNumbers) {
            output = this.state.value.toLocaleString(t.default.language, options);
        } else {
            output = this.state.value.toLocaleString("en", options);
        }
        return (
            <span className={`exchange-value ${this.state.status}`}>{(this.props.percentMark ? "%" : "")}{output}</span>
        );
    }
}

export default ExchangeValueComponent;
