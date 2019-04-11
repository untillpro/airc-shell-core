import React, { Component } from 'react';

class Grid extends Component {
    getGap () {
        switch (this.props.gap) {
            case 32: return 'gap-32';
            case 24: return 'gap-24';
            case 16: return 'gap-16';
            case 8: return 'gap-8';
            default: return 'gap-16';
        }
    }

    render () {
        return (
            <div className={
                `
                    grid 
                    ${this.props.rows > 0 ? `row-${this.props.rows}`: ''} 
                    ${this.props.cols > 0 ? `col-${this.props.cols}`: 'col-3'}
                    ${this.getGap()}

                `
            }>
                {this.props.children}
            </div>
        );
    }
}

export default Grid;