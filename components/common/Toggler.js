import React, { Component, Fragment } from 'react';

class ActiveToggler extends Component {
    render() {
        let { id, right } = this.props;

        if (!id) id = "activeToggler";

        return (
            <Fragment>
                <input 
                    id={id}
                    className={`toggler ${ right ? 'right' : ''}`}
                    checked={this.props.checked}
                    onChange={(evt) => this.props.onChange(evt)}
                    type="checkbox"
                    value="true"
                />

                <label
                    htmlFor={id}
                >
                    { !right ? (<i />) : null}
                    
                    {this.props.label}
                    
                    { right ? (<i />) : null}
                </label>
            </Fragment>
        );
    }
}

export default ActiveToggler;