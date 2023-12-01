import React from 'react';
import * as styles from './MyTable.styles';
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const MyTable = ({rows, columns, text, textSize, ...props}) => {
    return (
        <>
            {text && <Typography align="center" fontSize={textSize}>{text}</Typography>}
            <Box sx={styles.table} {...props}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
};

export default MyTable;