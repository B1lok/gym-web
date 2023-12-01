import React, {useState} from 'react';
import {ArrowUpward, PendingActions} from "@mui/icons-material";
import {useFetching} from "../../../../../hooks/useFetching";
import UserService from "../../../../../api/UserService";
import UserTrainingsTable from "./components/user-trainings-table/UserTrainingsTable";
import TrainingEnroll from "./components/training-enroll-dialog/TrainingEnroll";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Typography
} from "@mui/material";
import {GridCloseIcon} from "@mui/x-data-grid";

const UserSubscriptionCard = ({userSubscription, fetchSubscriptions}) => {
    const [trainingDialogOpen, setTrainingDialogOpen] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [trainingEnrollDialogOpen, setTrainingEnrollDialogOpen] = useState(false)
    const [fetchTrainings, trainingsLoading, trainingsError] = useFetching(async (userSubscriptionId) => {
        const response = await UserService.getMyTrainingsInSubscription(userSubscriptionId)
        setTrainings(response.data)
    })

    const handleTrainingDialogOpen = async (userSubscriptionId) => {
        await fetchTrainings(userSubscriptionId)
        setTrainingDialogOpen(true)
    }

    const checkForAllowedDate = (expirationDate) => {
        const subscriptionExpirationDate = new Date(expirationDate)
        return subscriptionExpirationDate >= new Date()
    }

    const fetchChangedData = async () => {
        await fetchSubscriptions()
        await fetchTrainings(userSubscription.id)
    }

    return (
        <>
            <Card sx={{minWidth: 275, borderRadius: 8, border: '1px solid #e0e0e0', p: 0}}>
                <CardContent>
                    <Typography color="text.secondary" gutterBottom sx={{fontSize: 14}}>
                        Subscription Details
                    </Typography>
                    <Typography variant="h5" component="div">
                        {userSubscription.subscriptionType}
                    </Typography>
                    <Typography color="text.secondary" sx={{mb: 1.5}}>
                        Trainings left
                        : {userSubscription.trainingsLeft === -1 ? 'UNLIMITED' : `${userSubscription.trainingsLeft}`}
                    </Typography>
                    <Typography color="text.secondary" sx={{mb: 1.5}}>
                        Dates : {`${userSubscription.purchaseDate} - ${userSubscription.expirationDate}`}
                    </Typography>
                    {userSubscription.subscriptionWithCoach && (
                        <Typography color="text.secondary" sx={{mb: 1.5}}>
                            Coach : {`${userSubscription.coachFirstName} ${userSubscription.coachLastName}`}
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    {userSubscription.subscriptionWithCoach && (
                        <Button
                            onClick={() => handleTrainingDialogOpen(userSubscription.id)}
                            variant="contained"
                            endIcon={<PendingActions/>}
                            sx={{backgroundColor: '#ff9800', color: 'white'}}
                        >
                            Trainings
                        </Button>
                    )}
                    {userSubscription.subscriptionWithCoach
                        && userSubscription.trainingsLeft !== 0
                        && checkForAllowedDate(userSubscription.expirationDate) && (
                            <Button
                                onClick={() => {
                                    setTrainingEnrollDialogOpen(true)
                                }}
                                variant="contained"
                                endIcon={<ArrowUpward/>}
                                sx={{backgroundColor: '#8bc34a', color: 'white'}}
                            >
                                Enroll
                            </Button>
                        )}
                </CardActions>
            </Card>
            <Dialog
                open={trainingDialogOpen}
                onClose={() => setTrainingDialogOpen(false)}
                scroll='paper'
                fullScreen
                TransitionComponent={Slide}
            >
                <IconButton
                    onClick={() => setTrainingDialogOpen(false)}
                    edge="start"
                    color="inherit"
                    aria-label="close"
                >
                    <GridCloseIcon/>
                </IconButton>
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    <UserTrainingsTable trainings={trainings} fetchChangedData={fetchChangedData}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTrainingDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <TrainingEnroll
                trainingEnrollDialogOpen={trainingEnrollDialogOpen}
                setTrainingEnrollDialogOpen={setTrainingEnrollDialogOpen}
                userSubscription={userSubscription}
                fetchChangedData={fetchChangedData}
            >
            </TrainingEnroll>
        </>
    );
};

export default UserSubscriptionCard;
