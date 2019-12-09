import React from 'react';
import { Modal as AntdModal } from 'antd';

class Modal extends AntdModal {
    getClass() {
        const { size, className = '' } = this.props;
        let  result = '';

        switch (size) {
            case 'small': result = '__small'; break; 
            case 'large': result = '__large'; break;
<<<<<<< HEAD
            default: result = '__medium'; break;
=======
            default: result = '__medium'; 
>>>>>>> 6128527331bd2646d6e9c944a35bd62a965ce8a3
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