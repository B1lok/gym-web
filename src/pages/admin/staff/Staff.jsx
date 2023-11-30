import React, {useEffect, useState} from 'react';
import * as styles from './Staff.styles';
import {ADMIN_COLUMNS, COACH_COLUMNS, COACHE_RECORD_COLUMNS} from "./constants";
import {useFetching} from "../../../hooks/useFetching";
import AdminService from "../../../api/AdminService";
import PageLayout from "../../../components/common/layout/page-layout/PageLayout";
import Sidebar from "../../../components/common/layout/sidebar/Sidebar";
import MyTable from "../../../components/ui/my-table/MyTable";
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
    Slide,
    Typography
} from "@mui/material";
import {GridCloseIcon} from "@mui/x-data-grid";

const Staff = () => {
    const [admins, setAdmins] = useState([])
    const [coaches, setCoaches] = useState([])
    const [adminDialogOpen, setAdminDialogOpen] = useState(false)
    const [adminIdToRemove, setAdminIdToRemove] = useState(null)
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)
    const [coachRecordsDialogOpen, setCoachRecordsDialogOpen] = useState(false)
    const [coachRecords, setCoachRecords] = useState([])
    const [coachDialogOpen, setCoachDialogOpen] = useState(false)
    const [coachIdToRemove, setCoachIdToRemove] = useState(null)
    const [coachIdToReplace, setCoachIdToReplace] = useState('')
    const [coachesToReplace, setCoachesToReplace] = useState([])

    const [fetchAdmins, isAdminsLoading, adminsError] = useFetching(async () => {
        const response = await AdminService.getAllAdmins()
        setAdmins(response.data)
    })

    const [fetchCoaches, isCoachesLoading, coachesError] = useFetching(async () => {
        const response = await AdminService.getAllCoaches()
        setCoaches(response.data)
    })

    const [fetchCoachRecords, isRecordsLoading, recordsError] = useFetching(async (id) => {
        const response = await AdminService.getCoachRecords(id)
        setCoachRecords(response.data)
    })

    const handleCoachDialog = async (coachId) => {
        await fetchCoachRecords(coachId)
        setCoachRecordsDialogOpen(true)
    }

    const handleRemovingAdminRole = async () => {
        const response = await AdminService.removeAdminRole(adminIdToRemove)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchAdmins()
            setAdminDialogOpen(false)
        }
    }

    const handleRemovingCoachRole = async () => {
        if (coachIdToReplace === '') {
            setErrorButtonMessage('Select coach to replace')
            setErrorButtonVisible(true)
            return
        }
        const response = await AdminService.removeCoachRole(coachIdToRemove, coachIdToReplace)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            setCoachIdToReplace('')
            setCoachIdToRemove(null)
            fetchCoaches()
            setCoachDialogOpen(false)
        }
    }

    const handleCoachToRemoveId = (e) => {
        setCoachIdToReplace(e.target.value)
    }

    const handleRemovingCoachDialog = async (coachId, specialization) => {
        setCoachIdToRemove(coachId)
        await setCoachesToReplace(coaches.filter(coach => coach.id !== coachId && coach.specialization === specialization))
        setCoachDialogOpen(true)
    }

    useEffect(() => {
        fetchAdmins()
        fetchCoaches()
    }, []);

    return (
        <PageLayout hasHeader>
            <Sidebar hasHeader sx={styles.main}>
                <Typography variant="h3" align="center">Gym staff</Typography>
                {errorButtonVisible && (
                    <Alert
                        onClose={() => setErrorButtonVisible(false)}
                        severity="error"
                        sx={styles.alert}
                    >
                        {errorButtonMessage}
                    </Alert>
                )}
                <Typography variant="h3">Admins</Typography>
                <MyTable
                    rows={admins}
                    columns={ADMIN_COLUMNS(setAdminIdToRemove, setAdminDialogOpen)}
                    height="40vh"
                />
                <Typography variant="h3" mt={2}>Coaches</Typography>
                <MyTable
                    rows={coaches}
                    columns={COACH_COLUMNS(handleCoachDialog, handleRemovingCoachDialog)}
                    height="40vh"
                />
                <Dialog
                    open={adminDialogOpen}
                    onClose={() => setAdminDialogOpen(false)}
                    TransitionComponent={Slide}
                >
                    <DialogTitle id="alert-dialog-title">
                        Removing the admin role
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to remove the admin role from this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAdminDialogOpen(false)}>Disagree</Button>
                        <Button onClick={handleRemovingAdminRole} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={coachRecordsDialogOpen}
                    onClose={() => setCoachRecordsDialogOpen(false)}
                    scroll='paper'
                    fullScreen
                    TransitionComponent={Slide}
                >
                    <IconButton
                        onClick={() => setCoachRecordsDialogOpen(false)}
                        edge="start"
                        color="inherit"
                        aria-label="close"
                    >
                        <GridCloseIcon/>
                    </IconButton>
                    <DialogTitle
                        id="scroll-dialog-title"
                        sx={styles.coachDialog}>
                        Coach Records
                    </DialogTitle>
                    <DialogContent>
                        <MyTable
                            rows={coachRecords}
                            columns={COACHE_RECORD_COLUMNS}
                            height="75vh"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCoachRecordsDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={coachDialogOpen}
                    onClose={() => setCoachDialogOpen(false)}
                    TransitionComponent={Slide}
                >
                    <DialogTitle id="alert-dialog-title">
                        Removing the coach role
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            If you want to remove coach role, select coach to replace
                        </DialogContentText>
                        {coachesToReplace.length === 0 ? (
                            <h3>You can not remove this coach</h3>
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Coach to replace</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="demo-simple-select"
                                    label="Specialization"
                                    value={coachIdToReplace}
                                    onChange={handleCoachToRemoveId}
                                >
                                    {coachesToReplace.map(coach => (
                                        <MenuItem key={coach.id} value={coach.id}>
                                            {`${coach.coachFirstName} ${coach.coachLastName}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCoachDialogOpen(false)}>Close</Button>
                        {coachesToReplace.length !== 0 && (
                            <Button onClick={handleRemovingCoachRole} autoFocus>
                                Remove
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </Sidebar>
        </PageLayout>
    );
};

export default Staff;