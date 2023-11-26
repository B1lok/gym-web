import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const UserTrainingsGrid = ({trainings}) => {
    const columns = [
        {
            field: "trainingType",
            headerName: "Type of training",
            width: 250
        },
        {
            field: "trainingDate",
            headerName: "Date of training",
            width: 250
        },
        {
            field: "trainingStart",
            headerName: "Start time",
            width: 250
        },
        {
            field: "trainingEnd",
            headerName: "End time",
            width: 250
        },
        {
            field: "trainingStatus",
            headerName: "Training status",
            width: 250
        },
        {
            field: "coachFirstName",
            headerName: "Coach first name",
            width: 250
        },
        {
            field: "coachLastName",
            headerName: "Coach last name",
            width: 250
        }
    ]

    return (
        <Box m="20px 0 0 0" height="40vh" sx={{
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
                rows={trainings}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default UserTrainingsGrid;