import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import * as styles from "../../../admin/subscriptions/Subscriptions.styles";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import UserService from "../../../../api/UserService";

const TrainingEnroll = ({
                            trainingEnrollDialogOpen,
                            setTrainingEnrollDialogOpen,
                            userSubscription,
                            fetchChangedData
                        }) => {
    const [training, setTraining] = useState({
        trainingDate: '',
        trainingStart: '',
        trainingEnd: ''
    })
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)
    const [trainingDuration, setTrainingDuration] = useState('')

    const handleTrainingEnroll = async (event) => {
        event.preventDefault()
        // await handleTrainingEndChange()
        const response = await UserService.enrollTraining(training, userSubscription.id, userSubscription.coachId)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            await fetchChangedData()
            setTrainingDuration('')
            setTraining({
                trainingDate: '',
                trainingStart: '',
                trainingEnd: ''
            })
            setTrainingEnrollDialogOpen(false)
        }
    }

    useEffect(() => {
        const handleTrainingEndChange = async () => {
            if (trainingDuration !== '' && training.trainingStart !== '') {
                const startTime = dayjs(training.trainingStart, 'HH:mm:ss');
                const endTime = startTime.add(trainingDuration, 'hours').format('HH:mm:ss');
                await setTraining({...training, trainingEnd: endTime});
            }
        };
        handleTrainingEndChange();
    }, [trainingDuration, training.trainingStart]);

    const handleTrainingDateChange = (date) => {
        const today = dayjs();
        const expirationDate = dayjs(userSubscription.expirationDate);

        const selectedDate = dayjs(date);

        if ((selectedDate.isBefore(expirationDate) || selectedDate.isSame(expirationDate)) && selectedDate.isAfter(today)) {
            setTraining({...training, trainingDate: selectedDate.format('YYYY-MM-DD')});
        } else {
            setTraining({...training, trainingDate: ''});
        }
    }
    const handleTrainingTimeChange = (time) => {
        const allowedStartTime = dayjs().set('hour', 8).set('minute', 0);
        const allowedEndTime = dayjs().set('hour', 18).set('minute', 0);

        const selectedTime = dayjs(time);

        if (selectedTime.isAfter(allowedStartTime) && selectedTime.isBefore(allowedEndTime)) {
            setTraining({...training, trainingStart: selectedTime.format('HH:mm:ss')});
        } else {
            setTraining({...training, trainingStart: ''});
        }
    }

    return (
        <>
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
            <Dialog
                component="form"
                onSubmit={handleTrainingEnroll}
                open={trainingEnrollDialogOpen}
                onClose={() => setTrainingEnrollDialogOpen(false)}
                keepMounted
                noValidate
                fullWidth
            >
                <DialogTitle align="center">Enroll for training</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <Stack spacing={2} alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Select training day"
                                            onChange={handleTrainingDateChange}
                                            minDate={dayjs().add(1, 'day')}
                                            maxDate={dayjs(userSubscription.expirationDate)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker disabled={training.trainingDate === ''}
                                            label="Select training time"
                                            onChange={handleTrainingTimeChange}
                                            minTime={dayjs().set('hour', 8)}
                                            maxTime={dayjs().set('hour', 18)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl variant="standard" required sx={{width: '50%'}}>
                            <InputLabel id="duration-label">Select training duration</InputLabel>
                            <Select
                                value={trainingDuration}
                                onChange={(event) => setTrainingDuration(event.target.value)}
                                id="duration"
                                labelId="duration-label"
                                label="Duration"
                            >
                                <MenuItem value={1}>{"One hour"}</MenuItem>
                                <MenuItem value={2}>{"Two hours"}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions sx={styles.actions}>
                    <Button variant="outlined" onClick={() => setTrainingEnrollDialogOpen(false)}>Close</Button>
                    <Button type="submit"
                            disabled={training.trainingDate === '' || training.trainingStart === '' || trainingDuration === ''}
                            variant="contained">
                        Enroll
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TrainingEnroll;