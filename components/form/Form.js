import React from 'react';

const Form = (props) => {
    return (
        <div className="ushell-login-block-form">
            {props.children}
        </div>
    );
};

export default Form;