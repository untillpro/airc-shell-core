/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';

import Icon from './Icon';

class Message extends Component {
    renderHeader() {
        if (!this.props.header) return null;

        return (
            <div className="message-header">
                {this.props.header}
            </div>
        );
    }

    renderFooter() {
        if (!this.props.footer) return null;

        return (
            <div className="message-footer">
                {this.props.footer}
            </div>
        );
    }

    renderContent() {
        return (
            <div className="message-content">
                {this.props.children}
            </div>
        );
    }

    renderIcon() {
        let { type } = this.props;
        let icon = 'info';

        switch (type) {
            case 'success': 
                icon = 'check-circle'; 
                break;

            case 'warning': 
                icon = 'warning'; 
                break;

            case 'error': 
                icon = 'close-circle'; 
                break;

            default: 
                icon = 'info-circle'; 
                type = 'info';
        }

        return (
            <div className={`message-icon ${type}`}>
                <Icon type={icon} theme="filled"/>
            </div>
        );
    }

    render() {
        const { type } = this.props;

        return (
            <div className={`message paper ${type || ''}`}>
                {this.renderIcon()}

                <div className="message-body">
                    {this.renderHeader()}
                    {this.renderContent()}
                    {this.renderFooter()}
                </div>
            </div>
        );
    }
}

export default Message;
