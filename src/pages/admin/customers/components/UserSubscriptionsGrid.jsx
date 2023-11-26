import React from 'react';
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const UserSubscriptionsGrid = ({subscriptions}) => {
    const columns = [
        {
            field: "subscriptionType",
            headerName: "Subscription Type",
            width: 250
        },
        {
            field: "subscriptionWithCoach",
            headerName: "Is subscription with coach",
            width: 250
        },
        {
            field: "purchaseDate",
            headerName: "Date of purchase",
            width: 250
        },
        {
            field: "expirationDate",
            headerName: "Date of expiration",
            width: 250
        },
        {
            field: "trainingsLeft",
            headerName: "Number of trainings left",
            width: 250,
            valueGetter: (params) => {
                if (params.row.trainingsLeft === -1) {
                    return "UNLIMITED";
                }
                return params.row.trainingsLeft;
            },
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
        },
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
                rows={subscriptions}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default UserSubscriptionsGrid;