/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false
        };
    }

    handleClick() {
        const { opened } = this.state;

        if (!opened) this.setState({ opened: true });
    }

    handleBlur() {
        const { opened } = this.state;

        if (opened) this.setState({ opened: false });
    }

    handleChange(event) {
        const { onChange } = this.props;

        if (onChange && typeof onChange === 'function') {
            onChange(event)
        }
    }

    renderSearch() {
        const { defaultValue } = this.props;
        const { opened } = this.state;

        if (opened) {
            return (
                <input 
                    value={defaultValue}
                    type='text' 
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                    autoFocus
                    allowClear
                />
            );
        }

        return (
            <i 
                className='icon-search' 
                onClick={(event) => this.handleClick(event)}
            />
        );
    }

    render() {
        return (
            <div className='inline-search'>
                {this.renderSearch()}
                
            </div>
        );
    }
}

export default Search;