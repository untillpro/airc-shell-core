import React, { Component } from 'react';
import log from 'Log';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false
        };
    }

    handleClick() {
        const { opened } = this.state;

        if (!opened) this.setState({ opened: true });
    }

    handleBlur() {
        const { opened } = this.state;

        if (opened) this.setState({ opened: false });
    }

    handleChange(event) {
        log('Search field change event: ', event.target.value);
    }

    renderSearch() {
        const { opened } = this.state;

        if (opened) {
            return (
                <input 
                    type='text' 
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                    autoFocus
                />
            );
        }

        return (
            <i 
                className='icon-search' 
                onClick={(event) => this.handleClick(event)}
            />
        );
    }

    render() {
        return (
            <div className='inline-search'>
                {this.renderSearch()}
                
            </div>
        );
    }
}

export default Search;