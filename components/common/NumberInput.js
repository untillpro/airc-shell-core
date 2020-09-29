/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from "react";
import { InputNumber } from 'antd';

/*
    Documentation: https://ant.design/components/input-number/
*/

class NumberInput extends PureComponent {
    handleChange(value) {
        const { onChange } = this.props;
        const v = Number(value) ? Number(value) : 0;

        if (onChange && typeof onChange === 'function') {
            onChange(v);
        }
    }

    render() {
        const { value } = this.props;

        return (
            <InputNumber 
                {...this.props}
                defaultValue={value}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

export default NumberInput;