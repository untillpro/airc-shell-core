/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
    return (
        <div className='ushell-login-block-form'>
            {props.children}
        </div>
    );
};

LoginForm.propTypes = {
    children: PropTypes.node
};

export default LoginForm;
