import * as React from "react";

interface IProps {
}

interface IState {
}

class NotFoundContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <h1>we are sorry , this is a 404</h1>
            </div>
        );
    }
}

export default NotFoundContainer;
