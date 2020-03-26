import React, { Component } from "react";
import { InputNumber } from 'antd';

/*
    Documentation: https://ant.design/components/input-number/
*/

class NumberInput extends Component {
    constructor() {
        super();

        this.state = {
            value: null
        };
    }

    componentDidMount() {
        const { value } = this.props;

        if (value) {
            this.setState({value});
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { value } = nextProps
        
        if (this.state.value !== value) {
            this.setState({value});
        }
    }

    handleChange(value) {
        const { onChange } = this.props;
        const v = Number(value) ? Number(value) : 0;

        this.setState({ value: v });

        if (onChange && typeof onChange === 'function') {
            onChange(v);
        }
    }

    render() {
        const { value } = this.state;

        return (
            <InputNumber 
                {...this.props}
                value={value}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

export default NumberInput;