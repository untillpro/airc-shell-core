import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
    return (
        <a {...props}>
            {props.text}
        </a>
    );
}; 

Link.propTypes = {
    text: PropTypes.string
};

export default Link;
