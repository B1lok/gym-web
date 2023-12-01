import React from "react";
import {Button} from "@mui/material";

export const USER_TRAININGS_COLUMNS = (setTrainingToCancelId, setCancelDialog) => [
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
        field: 'cancel',
        headerName: 'Cancel training',
        width: 250,
        renderCell: ({row: {trainingStatus, id}}) => {
            if (trainingStatus === 'ACTIVE') return (
                <Button variant="contained" sx={{color: "white", backgroundColor: "#ff784e"}}
                        onClick={() => {
                            setTrainingToCancelId(id)
                            setCancelDialog(true)
                        }}>
                    Cancel
                </Button>
            )
        }
    },
    {
        field: "trainingType",
        headerName: "Type of training",
        width: 250
    },
    {
        field: "coach",
        headerName: "Coach",
        width: 250,
        renderCell: ({row: {coachFirstName, coachLastName}}) => {
            return `${coachFirstName} ${coachLastName}`
        }
    }
]