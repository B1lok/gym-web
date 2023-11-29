import React, {useState} from 'react';
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
import {DataGrid} from "@mui/x-data-grid";
import UserService from "../../../../api/UserService";

const UserTrainingsGrid = ({trainings, fetchChangedData}) => {

    const [cancelDialogOpen, setCancelDialog] = useState(false)
    const [trainingToCancelId, setTrainingToCancelId] = useState(null)
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)
    const handleTrainingCancellation = async () => {
        const response = await UserService.cancelTrainingById(trainingToCancelId)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            await fetchChangedData()
            setCancelDialog(false)
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
    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
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
                    rows={trainings}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            <Dialog
                open={cancelDialogOpen}
                TransitionComponent={Slide}
                keepMounted
                onClose={() => setCancelDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Training cancellation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to cancel this training?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialog(false)}>Close</Button>
                    <Button onClick={handleTrainingCancellation}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTrainingsGrid;