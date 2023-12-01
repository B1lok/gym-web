import React, {useState} from 'react';
import {USER_TRAININGS_COLUMNS} from "./constants";
import UserService from "../../../../../../../api/UserService";
import MyTable from "../../../../../../../components/ui/my-table/MyTable";
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

const UserTrainingsTable = ({trainings, fetchChangedData}) => {
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

    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            {errorButtonVisible && (
                <Alert
                    onClose={() => setErrorButtonVisible(false)}
                    severity="error"
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999
                    }}
                >
                    {errorButtonMessage}
                </Alert>)}
            <MyTable
                rows={trainings}
                columns={USER_TRAININGS_COLUMNS(setTrainingToCancelId, setCancelDialog)}
                text={'Trainings'}
                textSize={25}
                height="70vh"
            />
            <Dialog
                open={cancelDialogOpen}
                onClose={() => setCancelDialog(false)}
                TransitionComponent={Slide}
                keepMounted
            >
                <DialogTitle align="center">Cancel training</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to cancel this training?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelDialog(false)}>No</Button>
                    <Button onClick={handleTrainingCancellation}>Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTrainingsTable;