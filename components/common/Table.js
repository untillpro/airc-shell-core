import ReactTable from 'react-table';

class Table extends ReactTable {

    componentDidUpdate(newProps, newState) {
        const { onTableDataUpdate } = this.props;

        if (onTableDataUpdate && typeof onTableDataUpdate === 'function') {
            onTableDataUpdate(newState.resolvedData);
        }
    }

}

export default Table;
