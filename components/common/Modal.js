import React from 'react';
import { Modal as AntdModal } from 'antd';

class Modal extends AntdModal {
    getClass() {
        const { size, className = '' } = this.props;
        let  result = '';

        switch (size) {
            case 'small': result = '__small'; break; 
            case 'large': result = '__large'; break;
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