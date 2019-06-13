import React from 'react';

export default (props) => {
    if (props.icon) {
        return <i className={props.icon} />
    }

    return null;
};