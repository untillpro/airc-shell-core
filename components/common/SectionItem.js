/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';

class SectionItem extends Component {
    render() {
        const { active, text, children, onClick, error } = this.props;
        
        return (
            <li 
                className={`sections-bar-item ${active ? 'selected' : ''} ${error ? 'has-error' : ''}`}
                onClick={ onClick ? event => onClick(event) : null }
            >
                {text ? text : children}
            </li>
        );
    }
}

export default SectionItem;