import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const FormRowLabel = (props) => {
    const { label, tip, error } = props;

    return (
        <div className={cn('form-row-label', { error })}>
            <div className='grid row-1 col-2'>
                {label ? (
                    <div className='cell align-left'>
                        <label className='form-input-label'>{label}</label>
                    </div>
                ) : null}
                
                {tip ? (
                    <div className='cell align-right'>
                        {tip}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

FormRowLabel.propTypes = {
    label: PropTypes.string, 
    tip: PropTypes.node, 
    error: PropTypes.bool
};

export default FormRowLabel;
