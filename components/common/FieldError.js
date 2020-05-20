/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';

export default (props) => {
    const { text } = props;

    return (
        <div className="form-row-error">
            {text}
        </div>
    );
};