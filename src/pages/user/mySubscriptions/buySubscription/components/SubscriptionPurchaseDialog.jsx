import React, {useState} from 'react';
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
import * as styles from "../../../../admin/subscriptions/Subscriptions.styles";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import UserService from "../../../../../api/UserService";

const SubscriptionPurchaseDialog = ({
                                        subscriptionPurchaseDialogOpen,
                                        setSubscriptionPurchaseDialog,
                                        subscriptionToBuy,
                                        coaches
                                    }) => {
    const [subscriptionCreation, setSubscriptionCreation] = useState({
        coachId: '',
        purchaseDate: ''
    })
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)

    const handleSubscriptionPurchase = async (event) => {
        event.preventDefault()
        const response = await UserService.purchaseSubscription(subscriptionCreation, subscriptionToBuy.id)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            setSubscriptionPurchaseDialog(false)
        }
    }

    const handleSubscriptionDateChange = (date) => {
        const today = dayjs();
        const afterWeekDate = dayjs().add(7, 'days');

        const selectedDate = dayjs(date);

        if ((selectedDate.isBefore(afterWeekDate) || selectedDate.isSame(afterWeekDate)) && (selectedDate.isAfter(today) || selectedDate.isSame(today))) {
            setSubscriptionCreation({...subscriptionCreation, purchaseDate: selectedDate.format('YYYY-MM-DD')})
        } else {
            setSubscriptionCreation({...subscriptionCreation, purchaseDate: ''})
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
                open={subscriptionPurchaseDialogOpen}
                onClose={() => setSubscriptionPurchaseDialog(false)}
                onSubmit={handleSubscriptionPurchase}
                keepMounted
                noValidate
                fullWidth
                style={{zIndex: 500}}
            >
                <DialogTitle align="center">Select subscription start date</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <Stack spacing={2} alignItems="center">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{zIndex: 1000}} label="Select training day"
                                            onChange={handleSubscriptionDateChange}
                                            minDate={dayjs()}
                                            maxDate={dayjs().add(7, 'days')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        {subscriptionToBuy.withCoach ? (
                            <FormControl variant="standard" required sx={{width: '50%', zIndex: 1000}}>
                                <InputLabel id="coach-label">Select coach</InputLabel>
                                <Select
                                    value={subscriptionCreation.coachId}
                                    onChange={(event) =>
                                        setSubscriptionCreation({...subscriptionCreation, coachId: event.target.value})}
                                    id="coach"
                                    labelId="coach-label"
                                    label="Coach"
                                >
                                    {coaches.filter(coach => coach.specialization === subscriptionToBuy.subscriptionType)
                                        .map(coach => (
                                            <MenuItem
                                                key={coach.id}
                                                value={coach.id}>{`${coach.coachFirstName} ${coach.coachLastName}`}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        ) : null}
                    </Stack>
                </DialogContent>
                <DialogActions sx={styles.actions}>
                    <Button variant="outlined" onClick={() => setSubscriptionPurchaseDialog(false)}>Close</Button>
                    <Button type="submit"
                            variant="contained"
                            disabled={subscriptionCreation.purchaseDate === ''
                                || (subscriptionToBuy.withCoach && subscriptionCreation.coachId === '')}>
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubscriptionPurchaseDialog;