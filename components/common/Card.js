import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
    getAlign() {
        const { align } = this.props;

        if (align) {
            switch (align) {
                case 'left': return 'align-left';
                case 'right': return 'align-right';
                case 'center': return 'align-center';

                default: return '';
            }
        }

        return '';
    }

    getValign() {
        const { valign } = this.props;

        if (valign) {
            switch (valign) {
                case 'top': return 'align-top';
                case 'bottom': return 'align-bottom';
                case 'center': return 'align-center';

                default: return '';
            }
        }

        return '';
    }

    getType() {
        const { type } = this.props;

        if (type) {
            switch (type.toLowerCase()) {
                case 'small': return 'small';
                default: return '';
            }
        }
        
        return '';
    }

    renderIcon() {
        const { ico, title } = this.props;

        if (ico) {
            return (
                <div className='card-icon'>
                    <img 
                        src={ico} 
                        alt={title || ''}
                    />
                </div>
            );
        }

        return null;
    }

    renderTitle() {
        const { title } = this.props;
        
        if (title) {
            return (
                <div className='card-title'>
                    {title}
                </div>
            );
        }

        return null;
    }

    renderText() {
        const { text } = this.props;
        
        if (text) {
            return (
                <div className='card-text'>
                    {text}
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div 
                className={
                    `
                        card 
                        ${this.getAlign()}  
                        ${this.getValign()} 
                        ${this.props.onClick ? 'hoverable' : ''} ${this.getType()}
                    `
                }
                onClick={this.props.onClick || null}
            >
                {this.renderIcon()}
                {this.renderTitle()}
                {this.renderText()}
            </div>
        );
    }
}

Card.propTypes = {
    align: PropTypes.string,
    valign: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    ico: PropTypes.string
};

export default Card;
