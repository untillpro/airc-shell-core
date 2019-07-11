import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    renderHeader() {
        if (!this.props.header) return null;

        return (
            <div class="ushell-message-header">
                {this.props.header}
            </div>
        );
    }

    renderFooter() {
        if (!this.props.footer) return null;

        return (
            <div class="ushell-message-footer">
                {this.props.footer}
            </div>
        );
    }

    renderContent() {
        return (
            <div class="ushell-message-content">
                {this.props.children}
            </div>
        );
    }

    render() {
        return (
            <div className={`ushell-message ${this.props.type || ''}`}>
                <div className="content-container">
                    <div className="paper">
                        {this.renderHeader()}
                        {this.renderContent()}
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    type: PropTypes.string, 
    children: PropTypes.node
};

export default Message;
