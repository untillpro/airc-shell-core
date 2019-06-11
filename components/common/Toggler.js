import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

class Toggler extends Component {
    constructor() {
        super();

        this.state = {
            checked: false
        };
    }

    componentDidMount() {
        const { checked } = this.props;

        this.setState({
            checked: !!checked
        });
    }

    componentWillReceiveProps(newProps) {
        const { checked } = newProps;

        if (this.state.checked !== checked) {
            this.setState({ checked });
        }
    }

    handleClick() {
        const { onChange } = this.props;
        const { checked } = this.state;

        if (onChange) {
            onChange(!checked);
        }

        this.setState({ checked: !checked });
    }

    render() {
        const { checked } = this.state;
        const { right, size } = this.props;

        return (
            <div 
                className={`toggler ${ right ? 'right' : ''}`}
                onClick={this.handleClick.bind(this)}
            >
                {right ? (<label>{this.props.label}</label>) : null}

                <Switch checked={checked} size={size || 'small'} />

                {!right ? (<label>{this.props.label}</label>) : null}
            </div>
        );
    }
}

Toggler.propTypes = {
    id: PropTypes.string,
    right: PropTypes.bool,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default Toggler;
