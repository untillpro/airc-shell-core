import React from 'react';

export default (props) => {
    const { text } = props;

    return (
        <div className="form-row-error">
            {text}
        </div>
    );
};