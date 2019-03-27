import React from 'react';

var cn = require('classnames');

const FormRowLabel = (props) => {
    const { label, tip, error } = props;

    return (
        <div className={cn('form-row-label', { 'error': error })}>
            <div className="grid row-1 col-2">
                {label ? (
                    <div className="cell align-left">
                        <label className="form-input-label">{label}</label>
                    </div>
                ) : null}
                
                {tip ? (
                    <div className="cell align-right">
                        {tip}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default FormRowLabel;