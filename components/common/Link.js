import React from 'react';

const Link = (props) => {
    return (
        <a {...props}>
            {props.text}
        </a>
    );
}; 

export default Link;