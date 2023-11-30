import {Button, ButtonGroup} from "@mui/material";
import {AdminPanelSettings, Sports} from "@mui/icons-material";
import React from "react";

export const CUSTOMER_COLUMNS = (handleClickOpen, setSelectedCustomerId, setCoachDialogOpen, setAdminDialogOpen) => [
    {
        field: "id",
        headerName: "ID",
        width: 100
    },
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
        field: 'information',
        headerName: 'Details',
        width: 150,
        renderCell: ({row: {id}}) => {
            return (
                <>
                    <Button onClick={() => handleClickOpen(id)} fullWidth sx={{color: "#3da58a"}}>
                        View Details
                    </Button>
                </>
            )
        }
    },
    {
        field: 'actions',
        headerName: 'Give roles',
        width: 250,
        renderCell: ({row: {id}}) => {
            return (
                <>
                    <ButtonGroup
                        disableElevation
                        aria-label="Disabled elevation buttons"
                    >
                        <Button
                            onClick={() => {
                                setSelectedCustomerId(id)
                                setAdminDialogOpen(true)
                            }}
                            startIcon={<AdminPanelSettings/>}
                            sx={{color: "#a4a9fc"}}
                        >
                            Admin
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedCustomerId(id)
                                setCoachDialogOpen(true)
                            }}
                            startIcon={<Sports/>}
                            sx={{color: "#e99592"}}
                        >
                            Coach
                        </Button>
                    </ButtonGroup>
                </>
            )
        }
    },
]

export const USER_SUBSCRIPTION_COLUMNS = [
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

export const USER_TRAINING_COLUMNS = [
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
    },
]