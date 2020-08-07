import React, { PureComponent } from 'react';
import moment from 'moment';

import { DatePicker, Space, Button } from 'antd';


const { RangePicker } = DatePicker;

// props:
// - from
// - to
// - format

class DatePickerLight extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleDateTimeChanged = this.handleDateTimeChanged.bind(this);
    }

    handleButtonPress() {
        this.setState({open: !this.state.open});
    }

    handleDateTimeChanged() {
        return null;
    }

    renderDate() {
        const { from, to, format } = this.props;

        return moment(from).format(format) + ' - ' + moment(to).format(format)
    }

    render() {
        const { open, format, from, to } = this.state;

        return (
            <div className="datepicker-light">
                <RangePicker 
                    disabled
                    value={ from, to}
                    open={open}
                    format={format}
                    showTime 
                    bordered={false}
                />

                <Button 
                    onClick={this.handleButtonPress} 
                >
                    Change date
                </Button>
            </div>
        );
    }
}

export default DatePickerLight;
