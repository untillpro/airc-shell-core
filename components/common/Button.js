import React, { Component } from 'react';

import { Button } from 'antd';

class BaseButton extends Component {
    handleClick(event) {
        const { onClick, disabled } = this.props;

        if (!onClick || disabled) return false;

        onClick(event);
    }

    render() {
        const { text, children } = this.props;

        return (
            <Button 
                {...this.props}
                onClick={(event) => this.handleClick(event)}

            >
                {text || children}
            </Button>
        );
    }
}

export default BaseButton;
