import _ from 'lodash';
import React, { Component } from 'react';
import { Tabs, DatePicker, Button, Empty } from 'antd';
import moment from 'moment';


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

*/

const periods = [
    {
        "code": "weekly",
        "name": "Weekly",
        "order": 1,
        "periods": [
            {
                "code": "",
                "name": "",
                "from": () => moment(),
                "to": () => moment()
            }
        ]
    }
];

class DateTimeFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            currentTab: null,
            from: null,
            to: null
        };

        this.handleSelectPeriod = this.handleSelectPeriod.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        const { from, to } = this.props;
        
        this.setState({
            from: from ? moment(from) : null, 
            to: to ? moment(to) : null
        });
    }

    handleSelectPeriod(period) {
        const { onPeriodSelected } = this.props;

        let from = null
        let to = null

        if (period) {
            if (period.from && typeof period.from === 'function') {
                from = period.from()
            }

            if (period.to && typeof period.to === 'function') {
                to = period.to()
            }

            this.setState({ from, to });
        }

        if (onPeriodSelected && typeof onPeriodSelected === 'function') {
            onPeriodSelected(period)
        }
    }

    handleChange(dates) {
        const { onChange } = this.props;
        const [ from, to ] = dates;

        this.setState({ from, to });

        if (onChange && typeof onChange === 'function') {
            onChange({
                "from": from ? from.unix() : null, 
                "to": to ? to.unix() : null,
            })
        }
    }

    handleTabChange(tab) {
        const { onTabChange } = this.props;

        if (onTabChange && typeof onTabChange === 'function') {
            onTabChange(tab)
        }
    }

    rederPeriods() {
        const { periods } = this.props;

        console.log('I have this periods');
        console.log(periods);

        if (_.size(periods) > 0) {
            return (
                <div className="date-time-filter-periods">
                    <Tabs 
                        defaultActiveKey={_.first(periods).code} 
                        animated={false} 
                        onChange={this.handleTabChange}
                    >
                        {periods.map((p) => {
                            return (
                                <TabPane tab={p.name} key={p.code}>
                                    {p.periods && _.isArray(p.periods) && p.periods.length > 0 ? 
                                    p.periods.map(period => <Button size={"small"} onClick={() => this.handleSelectPeriod(period)}>{period.name}</Button>)
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

    renderCalendar() {
        const {from, to} = this.state;

        return (
            <div className="date-time-filter-pickers">
                <RangePicker 
                    allowEmpty={[true, true]}
                    value={[from, to]}
                    onChange={this.handleChange}
                    showTime 
                />
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

        return (
            <div className="date-time-filter">
                {this.rederPeriods()}
                {this.renderCalendar()}
                {this.renderError()}
            </div>
        );
    }
}

export default DateTimeFilter;