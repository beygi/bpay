// use this dummy component to create new components
import * as React from "react";
interface IProps {
    value: number;
}

interface IState {
    value: number;
    // TODO enum
    status?: string;
}

class ExchangeValueComponent extends React.Component<IProps, IState> {

    public static getDerivedStateFromProps(props, state) {
            // check for grow or fall
            return null;
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            value : this.props.value,
        };
    }

    public render() {
        return (
            <span>{this.props.value}</span>
        );
    }
}

export default ExchangeValueComponent;
