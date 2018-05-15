import * as React from "react";

interface IProps {
}

interface IState {
}

class LandingContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <h1>Landing</h1>
            </div>
        );
    }
}

export default LandingContainer;
