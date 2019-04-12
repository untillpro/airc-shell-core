import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ActiveToggler extends Component {
    render() {
        const { right } = this.props;
        
        let { id } = this.props;

        if (!id) id = 'activeToggler';

        return (
            <Fragment>
                <input 
                    id={id}
                    className={`toggler ${ right ? 'right' : ''}`}
                    checked={this.props.checked}
                    onChange={(evt) => this.props.onChange(evt)}
                    type='checkbox'
                    value='true'
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

ActiveToggler.propTypes = {
    id: PropTypes.string,
    right: PropTypes.bool,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default ActiveToggler;
