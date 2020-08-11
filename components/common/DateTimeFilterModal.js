/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from 'react';
import moment from 'moment';

import { Modal, Button } from 'antd';

import { DateTimeFilter } from './';

// props:
// - from
// - to
// - format

class DateTimeFilterModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            from: null,
            to: null
        };

        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleDateTimeChanged = this.handleDateTimeChanged.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { from, to } = this.props;

        this.setState({ from, to });
    }

    componentDidUpdate(oldProps) {
        const { from, to } = this.props;

        if (oldProps.from !== from || oldProps.to !== to) {
            this.setState({ from, to });
        }
    }

    handleChange(values) {
        console.log('++++ handleChange ++++', values);

        if (values && typeof values === 'object') {
            console.log('++++++ setState +++++++++');
            this.setState({
                from: values.from,
                to: values.to
            });
        }
    }

    handleButtonPress() {
        this.setState({
            open: true
        });
    }

    handleOk() {
        console.log("handleOk", this.state);
        const { from, to } = this.state;
        const { onChange } = this.props;
        
        /*
        const { from: fromOld, to: toOld, onChange } = this.props;

        if ((fromOld && !fromOld.isSame(from)) || (toOld && toOld.isSame(to))) {
            if (onChange && typeof onChange === 'function') {
                onChange([from, to]);
            }
        } 
        */

        if (onChange && typeof onChange === 'function') {
            onChange([from, to]);
        }

        this.setState({ open: false });
    }

    handleCancel() {
        this.setState({ open: false });
    }

    handleDateTimeChanged() {
        return null;
    }

    renderDate() {
        const { from, to, format } = this.props;

        return moment(from).format(format) + ' - ' + moment(to).format(format)
    }

    render() {
        const { open } = this.state;
        const { from, to, fromTime, toTime, periods } = this.props;

        return (
            <div className="datepicker-light">
                {this.renderDate()}

                <Button
                    onClick={this.handleButtonPress}
                >
                    Change date
                </Button>

                <Modal
                    title="Select date"
                    visible={open}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <DateTimeFilter
                        showCustom
                        periods={periods}

                        from={from}
                        to={to}
                        fromTime={fromTime}
                        toTime={toTime}

                        onTabChange={null}
                        onChange={this.handleChange}
                    />
                </Modal>
            </div>
        );
    }
}

export default DateTimeFilterModal;
