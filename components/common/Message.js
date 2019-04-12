import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    render() {
        return (
            <div className={`ushell-message-block ${this.props.type || ''}`}>
                {this.props.children}
            </div>
        );
    }
}

Message.propTypes = {
    type: PropTypes.string, 
    children: PropTypes.node
};

export default Message;
