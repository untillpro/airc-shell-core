import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FormRowLabel from './FormRowLabel';

class FormInput extends Component {
    constructor() {
        super();

        this.state = {
            showPass: false
        };
    }

    toggleShowPass() {
        const { showPass } = this.state;

        this.setState({ showPass: !showPass });
    }

    renderLabel() {
        const { label, tip, error } = this.props;

        if (label || tip) {
            return (
                <FormRowLabel 
                    label={label} 
                    tip={tip} 
                    error={error} 
                />
            );
        }

        return null;
    }

    renderToggler() {
        const { type, showToggler } = this.props;

        if (type === 'password' && showToggler) {
            return (
                <div 
                    className='form-row-field-pass-tgl'
                    onClick={this.toggleShowPass.bind(this)}
                >
                    <i className='icon-eye-solid' />
                </div>
            );
        }

        return null;
    }

    renderInput() {
        const { type, error } = this.props;
        const { showPass } = this.state;

        let t = type || 'text';

        if (t === 'password') {
            if (showPass) {
                t = 'text';
            }
        }

        return (
            <div className='form-row-field'>
                <input 
                    {...(this.props.input ? this.props.input : {})}
                    className={cn('form-input', { error })} 
                    type={t}
                />

                {this.renderToggler()}
            </div>
        );
    }

    render() {
        return (
            <Fragment>
                {this.renderLabel()}
                {this.renderInput()}
            </Fragment>
        );
    }
}

FormInput.propTypes = {
    label: PropTypes.string,
    tip: PropTypes.node,
    error: PropTypes.bool,
    type: PropTypes.string,
    showToggler: PropTypes.bool,
    input: PropTypes.object
};

export default FormInput;
