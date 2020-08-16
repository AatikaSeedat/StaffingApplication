import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import {store} from "../../store/Store";

const columns = [
    {id: 'ShiftId', label: 'Shift ID', minWidth: 170},
    {id: 'PersonId', label: 'PersonId', minWidth: 100},
    {id: 'ShiftStartDate', label: 'Start Date', minWidth: 170, align: 'right',},
    {id: 'ShiftEndDate', label: 'End Date', minWidth: 170, align: 'right',},
    {id: 'ShiftType', label: 'Shift Type', minWidth: 170, align: 'right',},
    {id: 'Location', label: 'Location', minWidth: 100},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 740,
    },
});

function ShiftsTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedRow, setSelectedRow] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(props.shifts);

    // function getData() {
    //     var request = new XMLHttpRequest();
    //     request.open('GET', '/shifts', false);  // `false` makes the request synchronous
    //     request.send(null);

    //     if (request.status === 200) {
    //         return JSON.parse(request.responseText);
    //     }
    // }


    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.shifts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.ShiftId}
                                          onClick={() => {setSelectedRow(row.ShiftId);
                                          console.log(row);

                                          store.dispatch({
                                              type: "SET_SELECTED_ROW",
                                              payload: row
                                          });
                                              console.log("selected row   "+ selectedRow)}
                                          }
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.shifts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const mapStateToProps = state => {
    return {
        shifts: state.shifts

    }
}


export default connect(mapStateToProps, {})(ShiftsTable);