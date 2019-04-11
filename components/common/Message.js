import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (
            <div className={`ushell-message-block ${this.props.type || ''}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Message;