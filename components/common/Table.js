import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {
    render() {
        const { disabled } = this.props;
        
        return <ReactTable {...this.props} className={disabled ? "disabled" : ""} />;
    }
}

export default Table;
