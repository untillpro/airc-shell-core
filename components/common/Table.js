import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {
    render() {
        return <ReactTable {...this.props} />;
    }
}

export default Table;