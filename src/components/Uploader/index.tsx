import { Icon, message, Modal, Upload } from "antd";
import * as React from "react";
import USER from "../../lib/user";
import t from "../../services/trans/i18n";

import "./style.less";

const user = USER.getInstance();

interface IProps {
    example?: string;
    action: string;
    name: string;
    data: {imgtype: string};
    callback: (state: any  , type: any) => void;
}

interface IState {
    fileList: any[];
    previewImage: any;
    previewVisible: boolean;
    headers: {};
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isValid = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValid) {
        message.error("You can only upload JPG or PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10 ;
    if (!isLt2M) {
        message.error("Image must smaller than 10MB!");
    }
    return isValid && isLt2M;
}

class UploaderComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: "",
            fileList: [],
            // TODO : add real token here
            headers: { Authorisation: "Token " + JSON.stringify(user.keycloak.tokenParsed) },
        };
    }

    public handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    public handleCancel = () => this.setState({ previewVisible: false });
    public handleChange = (fileList) => {
          const newState = {};
          newState[this.props.data.imgtype] = null;
          if (fileList.file.status === "done") {
              newState[this.props.data.imgtype] = true;
            }
          this.props.callback(newState, this.props.data.imgtype);
          this.setState({fileList : fileList.fileList});
    }

    public render() {
        // const { previewVisible, previewImage, fileList } = this.state;
        let exampleImage: JSX.Element;
        if (this.props.example) {
            exampleImage = <img src={this.props.example} />;
        }
        const uploadButton = (
            <div>
                <Icon type="upload" />
                <div className="ant-upload-text">{t.t("Upload")}</div>
            </div>
        );
        return (
            <div className="upload-container clearfix">
                <div>
                    <Upload className="uploadButton"
                        action={this.props.action}
                        listType="picture-card"
                        fileList={this.state.fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        beforeUpload={beforeUpload}
                        name={this.props.name}
                        data={this.props.data}
                        headers={this.state.headers}
                    >
                        {this.state.fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <div className="example-img">{exampleImage}</div>
                    <div className="clearfix"></div>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: "100%" }} src={this.state.previewImage} />
                    </Modal>
                </div>
                <div>
                    <h3>{t.t("Example Image")}</h3>
                </div>
            </div >
        );
    }

}

export default UploaderComponent;
