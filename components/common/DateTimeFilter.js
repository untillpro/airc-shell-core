import _ from 'lodash';
import React, { Component } from 'react';
import { Tabs, DatePicker, Button, Empty } from 'antd';
import { DatetimeRangePicker } from 'rc-datetime-picker';
import moment from 'moment';

import "rc-datetime-picker/dist/picker.css";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// onChange

/*
Props: 
- onTabChange
- onChange
- onPeriodSelected

- from
- to
- fromTime
- toTime

- periods
- currentTab

- error 
- errorMessage 

- showCustom
- customTitle
*/

const CUSTOM_DEFAULT_NAME = "Custom";
const CUSTOM_TAB_CODE = "custom";

class DateTimeFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            currentTab: null,

            from: null,
            to: null,

            isCustom: false,
        };

        this.handleSelectPeriod = this.handleSelectPeriod.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        const { from, to, unix, showCustom } = this.props;

        if (unix) {
            this.setState({
                isCustom: !!showCustom,
                from: from ? moment.unix(from) : null,
                to: to ? moment.unix(to) : null
            });
        } else {
            this.setState({
                isCustom: !!showCustom,
                from: from ? moment(from) : null,
                to: to ? moment(to) : null
            });
        }
    }

    handleSelectPeriod(period) {
        const { onPeriodSelected, fromTime, toTime } = this.props;

        let from = null;
        let to = null;

        if (period) {
            if (period.from && typeof period.from === 'function') {
                from = period.from();

                if (fromTime && typeof fromTime === 'object') {
                    from.hour(fromTime.hour()).minute(fromTime.minute()).second(0).millisecond(0);
                }
            }

            if (period.to && typeof period.to === 'function') {
                to = period.to();

                if (toTime && typeof toTime === 'object') {
                    to.hour(toTime.hour()).minute(toTime.minute()).second(0).millisecond(0);
                }
            }

            this.handleChange([from, to]);
        }

        if (onPeriodSelected && typeof onPeriodSelected === 'function') {
            onPeriodSelected(period)
        }
    }

    handleChange(dates) {
        const { onChange, unix } = this.props;
        const [from, to] = dates;

        this.setState({ from, to });

        if (onChange && typeof onChange === 'function') {
            if (unix) {
                onChange({
                    "from": from ? from.unix() : null,
                    "to": to ? to.unix() : null,
                })
            } else {
                onChange({
                    "from": from ? from.valueOf() : null,
                    "to": to ? to.valueOf() : null,
                })
            }

        }
    }

    handleTabChange(tab) {
        const { isCustom } = this.state;
        const { onTabChange } = this.props;

        console.log('handle tab change', tab);

        if (tab === CUSTOM_TAB_CODE) {
            if (!isCustom) {
                this.setState({ isCustom: true });
            }
        } else {
            if (onTabChange && typeof onTabChange === 'function') {
                onTabChange(tab)
            }

            if (isCustom) {
                this.setState({ isCustom: false });
            }
        }
    }

    getPeriods() {
        const { periods, showCustom, customTitle } = this.props;

        let result = [];

        if (showCustom === true) {
            result.push({
                name: customTitle || CUSTOM_DEFAULT_NAME,
                code: CUSTOM_TAB_CODE
            });
        }

        if (periods && _.isArray(periods) && periods.length > 0) {
            result = _.concat(result, periods)
        }

        return result;
    }

    rederPeriods() {
        const periods = this.getPeriods();

        console.log('periods is : ', periods);

        if (_.size(periods) > 0) {
            return (
                <div className="date-time-filter-periods">
                    <Tabs
                        defaultActiveKey={_.first(periods).code}
                        animated={false}
                        onChange={this.handleTabChange}
                    >
                        {periods.map((p) => {
                            if (p.code === CUSTOM_TAB_CODE) {
                                return <TabPane tab={p.name} key={p.code}></TabPane>
                            }

                            return (
                                <TabPane tab={p.name} key={p.code}>
                                    {p.periods && _.isArray(p.periods) && p.periods.length > 0 ?
                                        p.periods.map(period => {
                                            return (
                                                <Button key={`${period.code}`} size={"small"} onClick={() => this.handleSelectPeriod(period)}>
                                                    {period.name}
                                                </Button>
                                            );
                                        })
                                        : <Empty description="No periods found" />}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </div>
            );
        }

        return null;
    }

    renderPicker() {
        const { from, to } = this.state;

        return (
            <div className="date-time-filter-pickers">
                <RangePicker
                    disabled={true}
                    allowEmpty={[true, true]}
                    value={[from, to]}
                    onChange={this.handleChange}
                    showTime
                    format={"YYYY-MM-DD HH:mm"}
                />
            </div>
        );
    }

    renderCalendars() {
        return (
            <div>
                <DatetimeRangePicker showTimePicker shortcuts />
            </div>
        );
    }

    renderError() {
        const { error, errorMessage } = this.props;

        if (error && errorMessage) {
            return (
                <div className="date-time-filter-error">
                    {errorMessage}
                </div>
            );
        }

        return null;
    }

    render() {
        const { isCustom } = this.state;

        return (
            <div className="date-time-filter">
                {this.rederPeriods()}

                {isCustom === true ? this.renderCalendars() : this.renderPicker()}

                {this.renderError()}
            </div>
        );
    }
}

export default DateTimeFilter;