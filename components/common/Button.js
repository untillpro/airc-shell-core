import React, { Component } from 'react';

class Button extends Component {
    getClass() {
        let c = '';

        if (this.props.full) c +='full ';
        if (this.props.bordered) c +='bordered ';
        if (this.props.primary) c +='primary ';
        if (this.props.secondary) c +='secondary ';
        if (this.props.success) c +='success ';
        if (this.props.warning) c +='warning ';
        if (this.props.danger) c +='danger ';

        return c;
    }
    
    render() {
        const { isLink, link } = this.props;

        if (isLink) {
            return (
                <a 
                    href={link}
                    className={`btn ${this.getClass()}  ${this.props.className}`}
                    title={this.props.title || ''}
                    onClick={this.props.onClick || null}
                    tabIndex={this.props.tabIndex || 1}
                >
                    {this.props.text || this.props.children}
                </a>
            );
        }

        return (
            <div
                className={`btn ${this.getClass()} ${this.props.className}`}
                title={this.props.title || ''}
                onClick={this.props.onClick || null}
                tabIndex={this.props.tabIndex || 1}
            >
                {this.props.text || this.props.children}
            </div>
        );

    }
}

export default Button;