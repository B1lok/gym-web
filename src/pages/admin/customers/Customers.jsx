import React, {useEffect, useState} from 'react';
import {DataGrid, GridCloseIcon} from "@mui/x-data-grid";
import {useFetching} from "../../../hooks/useFetching";
import AdminService from "../../../api/AdminService";
import {
    Alert,
    Box,
    Button,
    ButtonGroup,
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
import UserSubscriptionsGrid from "./components/UserSubscriptionsGrid";
import UserTrainingsGrid from "./components/UserTrainingsGrid";
import {AdminPanelSettings, Sports} from "@mui/icons-material";

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

    const columns = [
        {field: "id", headerName: "ID", width: 100},
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
                            <Button sx={{color: "#a4a9fc"}} onClick={() => {
                                setSelectedCustomerId(id)
                                setAdminDialogOpen(true)
                            }}>
                                Admin
                                <AdminPanelSettings></AdminPanelSettings>
                            </Button>
                            <Button sx={{color: "#e99592"}} onClick={() => {
                                setSelectedCustomerId(id)
                                setCoachDialogOpen(true)
                            }}>
                                Coach
                                <Sports></Sports>
                            </Button>
                        </ButtonGroup>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        fetchCustomers()
    }, []);

    return (
        <Box m="20px">
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
                    rows={customers}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
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
            <Dialog open={open}
                    onClose={handleClose}
                    scroll='paper'
                    fullScreen
                    TransitionComponent={Slide}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <GridCloseIcon/>
                </IconButton>
                <DialogTitle id="scroll-dialog-title"
                             sx={{textAlign: 'center', fontSize: '24px', color: '#3e4396', fontWeight: 'bold'}}>
                    Customer Details
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Customer subscriptions</DialogContentText>
                    <UserSubscriptionsGrid subscriptions={customerSubscriptions}></UserSubscriptionsGrid>
                    <DialogContentText>Customer trainings</DialogContentText>
                    <UserTrainingsGrid trainings={customerTrainings}></UserTrainingsGrid>
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
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Specialization</InputLabel>
                        <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            label="Specialization"
                            value={coachSpecialization}
                            onChange={handleCoachSpecializationChange}
                        >
                            <MenuItem value={"GYM"}>Gym Coach</MenuItem>
                            <MenuItem value={"SWIMMING_POOL"}>Swimming coach</MenuItem>
                            <MenuItem value={"BOX"}>Box coach</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCoachDialogOpen(false)}>Disagree</Button>
                    <Button onClick={handleGivingCoachRole} autoFocus>
                        Give coach role
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default Customers;