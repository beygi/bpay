/**
 * @module Components/UploaderComponent
 */
import { Icon, message, Modal, Upload } from "antd";
import * as React from "react";
import USER from "../../lib/user";
import t from "../../services/trans/i18n";

import "./style.less";

interface IProps {
    /**  example image */
    example?: string;
    /**  action url , endpoint for sending data */
    action: string;
    /**  name of the image */
    name: string;
    /**  full name of the image, will be used in UI */
    describe: string;
    /** data object containing image type */
    data: { imgtype: string };
    /** callback function wich is call when upload is done */
    callback: (state: any, type: any, describe: string) => void;
}

interface IState {
    /** list of uploaded files */
    fileList: any[];
    /** preview  of uploaded file */
    previewImage: any;
    /** visibility of the preview */
    previewVisible: boolean;
    /** extra headers */
    headers: {};
}

/** return base64 data of a selected image  */
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

/** validate image size before upload  */
function beforeUpload(file) {
    const isValid = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValid) {
        message.error(t.t("You can only upload JPG or PNG file"));
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
        message.error(t.t("Image must smaller than 1MB"));
    }
    return isValid && isLt2M;
}

/**
 * image upload component with example and preview support
 */
class UploaderComponent extends React.Component<IProps, IState> {
    public userObject = USER.getInstance();
    constructor(props: IProps) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: "",
            fileList: [],
            headers: { Authorization: this.userObject.getToken().value },
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
            this.setState({ fileList: fileList.fileList });
            this.props.callback(newState, this.props.data.imgtype, this.props.describe);
        }

        if (fileList.file.status === "uploading" || fileList.file.status === "removed") {
            this.setState({ fileList: fileList.fileList });
        }

        // console.log(fileList.file.status);
        // console.log({ fileList: fileList.fileList });

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
