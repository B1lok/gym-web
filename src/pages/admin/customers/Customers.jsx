import React, {useEffect, useState} from 'react';
import * as styles from './Customers.styles';
import {CUSTOMER_COLUMNS, USER_SUBSCRIPTION_COLUMNS, USER_TRAINING_COLUMNS} from "./constants";
import {useFetching} from "../../../hooks/useFetching";
import AdminService from "../../../api/AdminService";
import Sidebar from "../../../components/common/layout/sidebar/Sidebar";
import PageLayout from "../../../components/common/layout/page-layout/PageLayout";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slide
} from "@mui/material";
import {GridCloseIcon} from "@mui/x-data-grid";
import MyTable from "../../../components/ui/my-table/MyTable";

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false);
    const [adminDialogOpen, setAdminDialogOpen] = useState(false)
    const [coachDialogOpen, setCoachDialogOpen] = useState(false)
    const [customerSubscriptions, setCustomerSubscriptions] = useState([])
    const [customerTrainings, setCustomerTrainings] = useState([])
    const [selectedCustomerId, setSelectedCustomerId] = useState(null)
    const [coachSpecialization, setCoachSpecialization] = useState('')
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)

    const handleClickOpen = async (id) => {
        await fetchCustomer(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCoachSpecializationChange = (e) => {
        setCoachSpecialization(e.target.value)
    }

    const handleGivingAdminRole = async () => {
        const response = await AdminService.giveAdminRole(selectedCustomerId)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchCustomers()
            setAdminDialogOpen(false)
        }
    }

    const handleGivingCoachRole = async () => {
        if (coachSpecialization === '') {
            setErrorButtonMessage('Select coach specialization')
            setErrorButtonVisible(true)
            return
        }
        const response = await AdminService.giveCoachRole(selectedCustomerId, {specialization: coachSpecialization})
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            setCoachSpecialization('')
            fetchCustomers()
            setCoachDialogOpen(false)
        }
    }

    const [fetchCustomers, isCustomersLoading, customersError] = useFetching(async () => {
        const response = await AdminService.getCustomers()
        setCustomers(response.data)
    })

    const [fetchCustomer, isCustomerLoading, customerError] = useFetching(async (id) => {
        const customerSubscriptions = await AdminService.getCustomerSubscriptions(id)
        const customerTrainings = await AdminService.getCustomerTrainings(id)
        setCustomerSubscriptions(customerSubscriptions.data)
        setCustomerTrainings(customerTrainings.data)
    })

    useEffect(() => {
        fetchCustomers()
    }, []);

    return (
        <PageLayout hasHeader>
            <Sidebar hasHeader sx={styles.main}>
                <MyTable
                    rows={customers}
                    columns={CUSTOMER_COLUMNS(handleClickOpen, setSelectedCustomerId, setCoachDialogOpen, setAdminDialogOpen)}
                    text={'Customers'}
                    textSize={25}
                    height="70vh"
                />
                {errorButtonVisible && (
                    <Alert
                        onClose={() => setErrorButtonVisible(false)}
                        severity="error"
                        sx={styles.alert}
                    >
                        {errorButtonMessage}
                    </Alert>)}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll='paper'
                    fullScreen
                    TransitionComponent={Slide}
                >
                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        edge="start"
                        color="inherit"
                    >
                        <GridCloseIcon/>
                    </IconButton>
                    <DialogTitle
                        id="scroll-dialog-title"
                        sx={styles.dialogTitle}>
                        Customer Details
                    </DialogTitle>
                    <DialogContent sx={styles.dialogContentTables}>
                        <DialogContentText mb={1}>Customer subscriptions</DialogContentText>
                        <MyTable
                            rows={customerSubscriptions}
                            columns={USER_SUBSCRIPTION_COLUMNS}
                            height="40vh"
                        />
                        <DialogContentText my={1}>Customer trainings</DialogContentText>
                        <MyTable
                            rows={customerTrainings}
                            columns={USER_TRAINING_COLUMNS}
                            height="40vh"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={adminDialogOpen}
                    onClose={() => setAdminDialogOpen(false)}
                    TransitionComponent={Slide}
                >
                    <DialogTitle id="alert-dialog-title">
                        Giving the admin role
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to grant the admin role to this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAdminDialogOpen(false)}>Disagree</Button>
                        <Button onClick={handleGivingAdminRole} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={coachDialogOpen}
                    onClose={() => setCoachDialogOpen(false)}
                    TransitionComponent={Slide}
                    scroll='paper'
                >
                    <DialogTitle id="alert-dialog-title">
                        Select coach specialization
                    </DialogTitle>
                    <DialogContent dividers>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Specialization</InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                label="Specialization"
                                value={coachSpecialization}
                                onChange={handleCoachSpecializationChange}
                            >
                                <MenuItem value={"GYM"}>Gym</MenuItem>
                                <MenuItem value={"BOX"}>Box</MenuItem>
                                <MenuItem value={"SWIMMING_POOL"}>Pool</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={styles.dialogActions}>
                        <Button onClick={() => setCoachDialogOpen(false)}>Disagree</Button>
                        <Button onClick={handleGivingCoachRole} autoFocus>
                            Give coach role
                        </Button>
                    </DialogActions>
                </Dialog>
            </Sidebar>
        </PageLayout>
    );
};

export default Customers;