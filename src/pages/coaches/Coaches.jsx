import React, {useEffect, useState} from 'react';
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import {
    Avatar,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import {useFetching} from "../../hooks/useFetching";
import CoachService from "../../api/CoachService";
import {AccessTime, Email, LocalPhone, School} from "@mui/icons-material";
import CoachCard from "./components/CoachCard";
import * as styles from "../admin/subscriptions/Subscriptions.styles";

const Coaches = () => {
    const [coaches, setCoaches] = useState([])
    const [fetchCoaches, isCoachesLoading, coachesError] = useFetching(async () => {
        const response = await CoachService.getAllCoaches()
        setCoaches(response.data)
    })
    const [selectedCoach, setSelectedCoach] = useState({})
    const [coachDialog, setCoachDialog] = useState(false)

    useEffect(() => {
        fetchCoaches()
    }, []);

    return (
        <PageLayout hasHeader hasFooter>
            <Container sx={{py: 8}} maxWidth="md">
                <Grid container spacing={4}>
                    {coaches.map((coach, index) => (
                        <CoachCard
                            key={index}
                            coach={coach}
                            setSelectedCoach={setSelectedCoach}
                            setCoachDialog={setCoachDialog}
                        />
                    ))}
                </Grid>
            </Container>
            <Dialog
                component="form"
                open={coachDialog}
                onClose={() => setCoachDialog(false)}
                keepMounted
                noValidate
                fullWidth
            >
                <DialogTitle
                    align="center">{`${selectedCoach.coachFirstName} ${selectedCoach.coachLastName}`}</DialogTitle>
                <DialogContent sx={styles.dialogContent}>
                    <List sx={{bgcolor: 'background.paper'}}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Email/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`Email`} secondary={selectedCoach.coachEmail}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LocalPhone/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`Phone`} secondary={selectedCoach.coachPhoneNumber}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <School/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`Education`} secondary={selectedCoach.education}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccessTime/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`Experience`} secondary={selectedCoach.experience}/>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions sx={styles.actions}>
                    <Button variant="outlined" onClick={() => setCoachDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </PageLayout>
    );
};

export default Coaches;