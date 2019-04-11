import React, { Component } from 'react';
import cn from 'classnames';

class FormButton extends Component {
    render() {
        const { text, submit } = this.props;
        return (
            <div className="form-row-button">
                <button
                    type={submit ? 'submit' : 'button'}
                    {...(this.props.input ? this.props.input : {})}
                    className={cn('btn')}
                >
                    {text}
                </button>
            </div>
        );
    }
}

export default FormButton;