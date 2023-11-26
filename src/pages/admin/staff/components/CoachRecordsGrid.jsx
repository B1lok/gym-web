import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const CoachRecordsGrid = ({records}) => {

    const columns = [
        {
            field: "trainingDate",
            headerName: "Date of the training",
            width: 200
        },
        {
            field: "trainingStart",
            headerName: "Training beginning",
            width: 250
        },
        {
            field: "trainingEnd",
            headerName: "Training ending",
            width: 250
        },
        {
            field: "trainingStatus",
            headerName: "Training status",
            width: 250
        },
        {
            field: "trainingType",
            headerName: "Type of training",
            width: 250
        },
        {
            field: "customer",
            headerName: "Customer",
            width: 250,
            renderCell: ({row: {userFirstName, userLastName}}) => {
                return `${userFirstName} ${userLastName}`
            }
        },
        {
            field: "userEmail",
            headerName: "Customer email",
            width: 250
        }
    ]

    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            <Box height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    color: 'white',
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: "#94e2cd",
                },
                "& .MuiDataGrid-columnHeaders, .MuiDataGrid-columnTitles": {
                    color: 'white',
                    backgroundColor: "#3e4396",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#1F2A40",
                },
                "& .MuiDataGrid-footerContainer, .MuiDataGrid-toolbar": {
                    color: 'white',
                    backgroundColor: "#3e4396",
                },
                "& .MuiCheckbox-root": {
                    color: `#b7ebde !important`,
                },
            }}>
                <DataGrid
                    rows={records}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default CoachRecordsGrid;