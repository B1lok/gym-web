import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import {Remove} from "@mui/icons-material";

const AdminsGrid = ({admins, setAdminDialogOpen, setAdminIdToRemove}) => {

    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {
            field: "firstName",
            headerName: "Name",
            width: 200
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 250
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 250
        },
        {
            field: "email",
            headerName: "Email",
            width: 250
        },
        {
            field: 'takeRole',
            headerName: 'Remove Admin Role',
            width: 250,
            renderCell: ({row: {id}}) => {
                return (
                    <>
                        <Button variant="outlined" onClick={() => {
                            setAdminIdToRemove(id)
                            setAdminDialogOpen(true)
                        }} sx={{backgroundColor: "#f44336", color: 'white'}}>
                            Remove <Remove></Remove>
                        </Button>
                    </>
                )
            }
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
            <h1>Admins</h1>
            <DataGrid
                rows={admins}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default AdminsGrid;