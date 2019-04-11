import React, { Component } from 'react';

class ActiveToggler extends Component {
    render() {
        const { label, active, onClick, right } = this.props;

        return (
            <div
                className={`active-toggler ${active ? 'active' : ''} ${right ? 'right' : ''}`}
                onClick={onClick ? () => onClick() : null}
            >   
                {!right ? (<i className="icon-hide"></i>) : null}
                
                {label}

                {right ? (<i className="icon-hide"></i>) : null}
            </div>
        );
    }
}

export default ActiveToggler;