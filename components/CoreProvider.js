/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import { Component } from 'react';

import 'antd/dist/antd.css';
import '../css/untill-base.scss';
import '../css/antd_custom.scss';

export class CoreProvider extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return this.props.children;
    }
}