import React from 'react';
import * as styles from './MyTable.styles';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const MyTable = ({rows, columns, ...props}) => {
    return (
        <Box sx={styles.table} {...props}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                autoPageSize
            />
        </Box>
    );
};

export default MyTable;