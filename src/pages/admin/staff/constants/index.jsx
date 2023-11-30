import {Button} from "@mui/material";
import {Delete, Visibility} from "@mui/icons-material";
import React from "react";

export const ADMIN_COLUMNS = (setAdminIdToRemove, setAdminDialogOpen) => [
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
        field: 'takeRole',
        headerName: 'Remove Admin Role',
        width: 250,
        renderCell: ({row: {id}}) => {
            return (
                <>
                    <Button
                        onClick={() => {
                            setAdminIdToRemove(id)
                            setAdminDialogOpen(true)
                        }}
                        variant="outlined"
                        startIcon={<Delete/>}
                        sx={{backgroundColor: "#f44336", color: 'white'}}>
                        Remove
                    </Button>
                </>
            )
        }
    }
]

export const COACHE_RECORD_COLUMNS = [
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

export const COACH_COLUMNS = (handleCoachesRecordsDialog, handleRemovingCoachDialog) => [
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
                    <Button
                        onClick={() => {
                            handleCoachesRecordsDialog(id)
                        }}
                        variant="outlined"
                        startIcon={<Visibility/>}
                        sx={{backgroundColor: "#79db69", color: 'white'}}>
                        See records
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
                    <Button
                        onClick={() => {
                            handleRemovingCoachDialog(id, specialization)
                        }}
                        variant="outlined"
                        startIcon={<Delete/>}
                        sx={{backgroundColor: "#f44336", color: 'white'}}>
                        Remove
                    </Button>
                </>
            )
        }
    }
]