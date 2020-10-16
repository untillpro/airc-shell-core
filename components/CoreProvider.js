import React, { Component } from 'react';

import 'antd/dist/antd.css';
import '../css/untill-base.css';
import '../css/antd_custom.css';

export class CoreProvider extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return this.props.children;
    }
}