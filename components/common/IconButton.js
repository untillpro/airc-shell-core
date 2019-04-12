import React, { Component } from 'react';

class IconButton extends Component {
    handleClick(event) {
        const { onClick, disabled } = this.props;

        if(!onClick || disabled) return false;

        onClick(event);
    }

    getClass() {
        let c = '';

        if (this.props.primary) c +='primary ';
        if (this.props.secondary) c +='secondary ';
        if (this.props.success) c +='success ';
        if (this.props.warning) c +='warning ';
        if (this.props.danger) c +='danger ';
        if (this.props.disabled) c +='disabled ';

        return c;
    }

    getIcon() {
        const { icon, title } = this.props;

        return <img src={icon} alt={title} />;
    }

    render() {
        const { isLink, link } = this.props;

        if (isLink) {
            return (
                <a 
                    href={link}
                    className={`icon-btn ${this.getClass()} ${this.props.className || ''}`}
                    title={this.props.title || false}
                    onClick={(event) => this.handleClick(event)}
                    tabIndex={this.props.tabIndex || 1}
                >
                    {this.getIcon()}
                </a>
            );
        }

        return (
            <div
                className={`icon-btn ${this.getClass()} ${this.props.className}`}
                title={this.props.title || ''}
                onClick={(event) => this.handleClick(event)}
                tabIndex={this.props.tabIndex || 1}
            >
                {this.getIcon()}
            </div>
        );

    }
}

export default IconButton;