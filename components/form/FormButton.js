import React, { Component } from 'react';

class FormButton extends Component {
    render() {
        const { text, submit } = this.props;
        return (
            <div className="form-row-button">
                <button
                    type={submit ? 'submit' : 'button'}
                    {...(this.props.input ? this.props.input : {})}
                    className="btn form-submit" 
                >
                    {text}
                </button>
            </div>
        );
    }
}

export default FormButton;