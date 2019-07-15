import React, { Component } from 'react';
import { Modal as AntdModal } from 'antd';

class Modal extends Component {
    getClass() {
        const { size, className = '' } = this.props;
        let  result = '';

        switch (size) {
            case 'small': result = '__small'; 
            case 'large': result = '__large'; 
            default: result = '__medium'; 
        }

        return `${className} ${result}`;
    }

    render() {
        return <AntdModal 
            {...this.props} 
            className={this.getClass()}
        />;
    }
}

export default Modal;