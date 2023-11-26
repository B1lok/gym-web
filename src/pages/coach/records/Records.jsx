import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import {useFetching} from "../../../hooks/useFetching";
import CoachService from "../../../api/CoachService";
import {DataGrid} from "@mui/x-data-grid";

const Records = () => {

    const [records, setRecords] = useState([])
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [recordIdToDelete, setRecordIdToDelete] = useState(null)
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)

    const [fetchRecords, isRecordsLoading, recordsError] = useFetching(async () => {
        const response = await CoachService.getAllMyRecords()
        setRecords(response.data)
    })

    const handleRecordCancellation = async () => {
        const response = await CoachService.cancelRecordById(recordIdToDelete)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchRecords()
            setCancelDialogOpen(false)
            setRecordIdToDelete(null)
        }
    }

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
            field: 'cancel',
            headerName: 'Cancel training',
            width: 250,
            renderCell: ({row: {trainingStatus, id}}) => {
                if (trainingStatus === 'ACTIVE') return (
                    <Button variant="contained" sx={{color: "white", backgroundColor: "#ff784e"}}
                            onClick={() => {
                                setRecordIdToDelete(id)
                                setCancelDialogOpen(true)
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

    useEffect(() => {
        fetchRecords()
    }, []);
    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            <h1>Records</h1>
            {errorButtonVisible && (
                <Alert
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999
                    }}
                    onClose={() => setErrorButtonVisible(false)}
                    severity="error"
                >
                    {errorButtonMessage}
                </Alert>)}
            <Box m="40px 0 0 0" height="75vh" sx={{
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
            <Dialog
                open={cancelDialogOpen}
                TransitionComponent={Slide}
                keepMounted
                onClose={() => setCancelDialogOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Record cancellation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to cancel this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialogOpen(false)}>Close</Button>
                    <Button onClick={handleRecordCancellation}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Records;