import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    renderHeader() {
        if (!this.props.header) return null;

        return (
            <div class="ushell-message-block-header">
                {this.props.header}
            </div>
        );
    }

    renderFooter() {
        if (!this.props.footer) return null;

        return (
            <div class="ushell-message-block-footer">
                {this.props.footer}
            </div>
        );
    }

    renderContent() {
        return (
            <div class="ushell-message-block-content">
                {this.props.children}
            </div>
        );
    }

    render() {
        return (
            <div className={`ushell-message-block ${this.props.type || ''}`}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderFooter()}
            </div>
        );
    }
}

Message.propTypes = {
    type: PropTypes.string, 
    children: PropTypes.node
};

export default Message;
