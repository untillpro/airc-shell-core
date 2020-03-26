import React from 'react';
import PropTypes from 'prop-types';

const Form = (props) => {
    return (
        <div className='ushell-login-block-form'>
            {props.children}
        </div>
    );
};

Form.propTypes = {
    children: PropTypes.node
};

export default Form;
