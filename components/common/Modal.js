/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from 'react';
import { Modal as AntdModal } from 'antd';
import { withStackEvents } from 'stack-events';

import {
    KEY_ESCAPE
} from 'keycode-js';

class Modal extends PureComponent {
    constructor() {
        super();

        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        console.log("Modal component did mount!");

        this.props.pushEvents({
            'keydown': this.handleKey
        })
    }

    componentWillUnmount() {
        this.props.popEvents();
    }


    handleKey(event) {
        const { onCancel } = this.props;
        const { keyCode } = event;

        console.log("Modal clicked: ");

        switch (keyCode) {
            case KEY_ESCAPE:
                if (onCancel && typeof onCancel === 'function') {
                    event.preventDefault();
                    event.stopPropagation();

                    onCancel()
                }
                
                return;

            default: return;
        }
    }

    getClass() {
        const { size, className = '' } = this.props;
        let result = '';

        switch (size) {
            case 'small': result = '__small'; break;
            case 'large': result = '__large'; break;
            default: result = '__medium'; break;
        }

        return `${className} ${result}`;
    }

    render() {
        return (
            <AntdModal
                {...this.props}
                keyboard={false}
                className={this.getClass()}
            />
        );
    }
}

export default withStackEvents(Modal);