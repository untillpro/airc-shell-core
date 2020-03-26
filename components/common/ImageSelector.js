import _ from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { InputNumber, Modal, Button, Icon, Avatar } from 'antd';
import ReactCrop from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import { getFileSize } from '../../classes/Utils';

const { confirm } = Modal;

const INITIAL_CROP = {
    unit: "%",
    width: 100,
    height: 100,
    aspect: null
};

const INITIAL_STATE = {
    src: null,
    croped: null,
    result: null,
    somethingChanged: false,
    crop: { ...INITIAL_CROP },
    width: null,
    height: null,
    ratio: null,
    maxWidth: null,
    maxHeight: null,
    lock: false,
    previewSize: 32
};

class ImageSelector extends PureComponent {
    constructor() {
        super();

        this.state = {
            ...INITIAL_STATE,
            visible: false
        };
    }

    componentDidMount() {
        const { value, previewSize } = this.props;
        const state = {};

        if (value)
            state.result = value;

        if (previewSize && typeof previewSize === 'number')
            state.previewSize = parseInt(previewSize, 10);

        if (_.size(state) > 0) 
            this.setState(state);
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    _onImageLoaded(image) {
        this.imageRef = image;

        this.setState({
            maxWidth: image.clientWidth,
            maxHeight: image.clientHeight,
            ratio: image.clientWidth / image.clientHeight
        });
    };

    _onCropComplete(crop) {
        this.makeClientCrop(crop).then((result) => {
            this.setState({
                croped: result,
                somethingChanged: true,
                width: crop.width,
                height: crop.height
            });
        });
    };

    _onCropChange = (crop) => {
        this.setState({ crop });
    };

    _onSelectPress() {
        const { result } = this.state;

        this.setState({
            src: result,
            crop: { ...INITIAL_CROP },
            visible: true
        });
    }

    _onSaveButtonClick() {
        const { onChange } = this.props;
        const { somethingChanged, croped } = this.state;

        const state = {
            visible: false,
            somethingChanged: false
        };

        if (somethingChanged) {
            state.result = croped;

            if (onChange && typeof onChange === 'function') {
                onChange(croped || '');
            }
        }

        this.setState({
            ...INITIAL_STATE,
            ...state
        });
    }

    _onApplyButtonClick() {
        const { onChange } = this.props;
        const { croped } = this.state;

        if (onChange && typeof onChange === 'function') {
            onChange(croped);
        }

        this.setState({
            ...INITIAL_STATE,
            result: croped,
            src: croped,
        })
    }

    _onFileSelect(e) {
        const { onError, maxImageSize } = this.props;

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file && file.size <= maxImageSize) {
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    this.setState({
                        src: reader.result,
                        crop: { ...INITIAL_CROP }
                    })
                });

                reader.readAsDataURL(e.target.files[0]);
            } else {
                const size = getFileSize(maxImageSize);
                const message = `Image max size exceeded. Available max image size ${size.formated}.`;

                if (onError && typeof onError === 'function') {
                    onError(message)
                }
            }
        }
    }

    _onAddButtonClick() {
        if (this.selector) {
            this.selector.click();
        }
    }

    _onRemoveButton() {
        confirm({
            title: 'Delete image?',
            content: 'Are you sure delete image?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                let changed = false;

                if (this.state.result) {
                    changed = true;
                }

                this.setState({
                    ...INITIAL_STATE,
                    somethingChanged: changed
                });
            },
        });
    }

    _onWidthChange(value) {
        const { src, maxWidth, height: h, ratio, lock, crop } = this.state;

        if (!src) return;

        const width = value > maxWidth ? maxWidth : value;
        const height = lock ? (width / ratio) | 0 : h;

        this.setState({
            crop: {
                ...crop,
                width,
                height
            },
            width,
            height
        });
    }

    _onHeightChange(value) {
        const { src, maxHeight, width: w, ratio, lock, crop } = this.state;

        if (!src) return;

        const height = value > maxHeight ? maxHeight : value;
        const width = lock ? (height * ratio) | 0 : w;

        this.setState({
            crop: {
                ...crop,
                width,
                height
            },
            width,
            height
        });
    }

    _onLockClick() {
        const { crop, lock, ratio } = this.state;

        this.setState({
            lock: !lock,
            crop: {
                ...crop,
                aspect: !lock ? ratio : null
            }
        });
    }

    async makeClientCrop(crop) {
        const { imageRef } = this;

        if (imageRef && crop.width && crop.height) {
            return this.getCroppedImg(
                imageRef,
                crop
            );
        }
    }

    async getCroppedImg(image, crop, scale = 1) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width * scale;
        const scaleY = image.naturalHeight / image.height * scale;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            const data = canvas.toDataURL();

            resolve(data);
        });
    }

    renderFooter() {
        const { visible, somethingChanged } = this.state;

        if (!visible) return null;

        const saveButton = (
            <Button
                onClick={this._onSaveButtonClick.bind(this)}
                type={somethingChanged ? "primary" : "default"}
            >
                {somethingChanged ? 'Save' : 'Ok'}
            </Button>
        );

        const applyButton = somethingChanged ? (
            <Button
                onClick={this._onApplyButtonClick.bind(this)}
            >
                Apply
            </Button>
        ) : null;

        return (
            <Fragment>

                {applyButton}
                {saveButton}
            </Fragment>
        );
    }

    renderImageBlock() {
        const { src, crop } = this.state;

        if (!src) return (
            <div
                className="image-selector-image-block-empty"
                onClick={this._onAddButtonClick.bind(this)}
            ></div>
        );

        return (
            <Fragment>
                <ReactCrop
                    src={src}
                    crop={crop}
                    onImageLoaded={this._onImageLoaded.bind(this)}
                    onComplete={this._onCropComplete.bind(this)}
                    onChange={this._onCropChange.bind(this)}
                />
            </Fragment>
        );
    }

    renderSelectedImage() {
        const { src } = this.state;

        if (!src) return null;

        return (
            <Fragment>
                {this.renderImagePreview(src)}

                <div
                    className="image-selector-image-remove"
                    onClick={this._onRemoveButton.bind(this)}
                >
                    <Icon type="delete" theme="filled" />
                </div>
            </Fragment>
        );
    }

    renderSizesBlock() {
        const { src, width, height, maxWidth, maxHeight, lock } = this.state;

        if (!src) return null;

        return (
            <div className="image-selector-sizes-block">
                <div className="image-selector-sizes-field-container">
                    <label className="image-selector-sizes-label">Width (px):</label>

                    <InputNumber
                        className="image-selector-sizes-field"
                        min={maxWidth / 10}
                        max={maxWidth}
                        value={width}
                        onChange={this._onWidthChange.bind(this)}
                        labe
                    />
                </div>

                <div
                    onClick={this._onLockClick.bind(this)}
                    className={`image-selector-sizes-button ${lock ? 'active' : ''}`}
                >
                    <Icon type="link" />
                </div>

                <div className="image-selector-sizes-field-container">
                    <label className="image-selector-sizes-label">Height (px):</label>

                    <InputNumber
                        className="image-selector-sizes-field"
                        min={maxHeight / 10}
                        max={maxHeight}
                        value={height}
                        onChange={this._onHeightChange.bind(this)} />
                </div>
            </div>
        );
    }

    renderImagePreview(src) {
        const { previewSize } = this.state;

        if (src) {
            return (
                <Avatar
                    className="image-selector-preview"
                    src={src}
                    shape="square"
                    size={previewSize}
                />
            );
        }

        return null;
    }

    render() {
        const { disabled } = this.props;
        const { visible, result, src } = this.state;

        return (
            <Fragment>
                <Button
                    onClick={this._onSelectPress.bind(this)}
                    disabled={!!disabled}
                >
                    {result ? 'Edit image' : 'Select image'}
                </Button>

                {this.renderImagePreview(result)}

                <Modal
                    width={800}
                    title="Select an image"
                    visible={visible}
                    footer={this.renderFooter()}
                    onCancel={this.closeModal.bind(this)}
                >
                    <div className="image-selector-container">
                        <div className="image-selector-left">
                            <div className="image-selector-title">
                                Upload image file:
                            </div>

                            <div className="image-selector-add-block">
                                <div style={{ display: 'none' }}>
                                    <form>
                                        <input
                                            type="file"
                                            name="user[image]"
                                            ref={ref => this.selector = ref}
                                            multiple={false}
                                            onChange={this._onFileSelect.bind(this)} />
                                    </form>
                                </div>

                                <div className="image-selector-add-button">
                                    <Button
                                        onClick={this._onAddButtonClick.bind(this)}
                                    >
                                        <Icon type="plus" />
                                    </Button>
                                </div>

                                {this.renderSelectedImage()}
                            </div>

                            {this.renderSizesBlock()}
                        </div>

                        <div className="image-selector-right">
                            <div className="image-selector-image-block">
                                {this.renderImageBlock()}
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>

        );
    }
}

export default ImageSelector;