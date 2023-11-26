import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import {Remove, Visibility} from "@mui/icons-material";

const CoachesGrid = ({coaches, handleCoachesRecordsDialog, handleRemovingCoachDialog}) => {


    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "coachFirstName",
            headerName: "Name",
            width: 200
        },
        {
            field: "coachLastName",
            headerName: "Last Name",
            width: 250
        },
        {
            field: "coachPhoneNumber",
            headerName: "Phone Number",
            width: 250
        },
        {
            field: "coachEmail",
            headerName: "Email",
            width: 250
        },
        {
            field: "specialization",
            headerName: "Specialization",
            width: 250
        },
        {
            field: 'seeRecords',
            headerName: 'Coach records',
            width: 200,
            renderCell: ({row: {id}}) => {
                return (
                    <>
                        <Button variant="outlined" onClick={() => {
                            handleCoachesRecordsDialog(id)
                        }} sx={{backgroundColor: "#79db69", color: 'white'}}>
                            See records <Visibility></Visibility>
                        </Button>
                    </>
                )
            }
        },
        {
            field: 'removeRole',
            headerName: 'Remove coach role',
            width: 200,
            renderCell: ({row: {id, specialization}}) => {
                return (
                    <>
                        <Button variant="outlined" onClick={() => {
                            handleRemovingCoachDialog(id, specialization)
                        }} sx={{backgroundColor: "#f44336", color: 'white'}}>
                            Remove <Remove></Remove>
                        </Button>
                    </>
                )
            }
        }
    ]


    return (
        <Box m="70px 0 0 0" height="40vh" sx={{
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
            <h1>Coaches</h1>
            <DataGrid
                rows={coaches}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default CoachesGrid;