/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import { Radio } from 'antd';

import Logger from '../../classes/Logger'

class LocationSelector extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            value: null
        };
    }

    componentDidMount() {
        Logger.log(this.props.value, 'Defaul location is: ',);
        this.setState({ value: this.props.value });
    }

    onChange(event) {
        const value = event.target.value;

        Logger.log(event, 'LocationSelector.onLocationSelect event: ');
        const { onChange } = this.props;

        if (onChange && typeof onChange === 'function') {
            onChange(value);
        }

        this.setState({ value });
    }

    renderLocations() {
        const { value } = this.state;
        const { locations } = this.props;



        return (
            <Radio.Group onChange={this.onChange} value={value}>
                {_.map(locations, (location, index) => {
                    return (
                        <Radio key={`location_${index}`} className="grid-location-selector-radio" value={parseInt(index)}>
                            {location}
                        </Radio>
                    );
                })}
            
            </Radio.Group>
        )
    }

    renderHeader() {
        const { title } = this.props;

        if (title && typeof title === 'string') {
            return (
                <div className="grid-location-selector-header">
                    {title}
                </div>
            );
        }

        return null;

    }

    render() {
        const { locations } = this.props;

        Logger.log(locations, 'Locations: ');

        if (locations && _.isObject(locations) && _.size(locations) > 0) {   
            return (
                <div className="grid-location-selector">
                    {this.renderHeader()}
                    {this.renderLocations()}
                </div>
            );
        }

        return null;
    }
}


export default LocationSelector;