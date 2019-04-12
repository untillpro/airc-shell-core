import React, { Component } from 'react';

class Button extends Component {
    handleClick(event) {
        const { onClick, disabled } = this.props;

        if(!onClick || disabled) return false;

        onClick(event);
    }

    getClass() {
        let c = '';

        if (this.props.full) c +='full ';
        if (this.props.bordered) c +='bordered ';
        if (this.props.primary) c +='primary ';
        if (this.props.secondary) c +='secondary ';
        if (this.props.success) c +='success ';
        if (this.props.warning) c +='warning ';
        if (this.props.danger) c +='danger ';
        if (this.props.icon) c +='icon ';
        if (this.props.disabled) c +='disabled ';

        return c;
    }
    
    renderText() {
        let res = null;
        const { text, children } = this.props;

        if (text) res = <span>{this.props.text}</span>;
        else if (children) res = children;

        return res;
    }
    
    render() {
        const { isLink, link, icon } = this.props;

        if (isLink) {
            return (
                <a 
                    href={link}
                    className={`btn ${this.getClass()} ${this.props.className || ''}`}
                    title={this.props.title || false}
                    onClick={(event) => this.handleClick(event)}
                    tabIndex={this.props.tabIndex || 1}
                >
                    { icon ? <i className={icon} /> : null }

                    {this.renderText()}
                </a>
            );
        }

        return (
            <div
                className={`btn ${this.getClass()} ${this.props.className}`}
                title={this.props.title || ''}
                onClick={(event) => this.handleClick(event)}
                tabIndex={this.props.tabIndex || 1}
            >
                { icon ? <i className={icon} /> : null }
                {this.renderText()}
            </div>
        );

    }
}

export default Button;