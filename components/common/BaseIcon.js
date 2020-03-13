/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';

export default (props) => {
    if (props.icon) {
        return <i className={props.icon} />
    }

    return null;
};