import React, {useState} from 'react';
import {RunCircle, Straight} from "@mui/icons-material";
import {useFetching} from "../../../../hooks/useFetching";
import UserService from "../../../../api/UserService";
import UserTrainingsGrid from "./UserTrainingsGrid";
import TrainingEnroll from "./TrainingEnroll";
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
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Subscription Details
                    </Typography>
                    <Typography variant="h5" component="div">
                        {userSubscription.subscriptionType}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Trainings left
                        : {userSubscription.trainingsLeft === -1 ? 'UNLIMITED' : `${userSubscription.trainingsLeft}`}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Dates : {`${userSubscription.purchaseDate} - ${userSubscription.expirationDate}`}
                    </Typography>
                    {userSubscription.subscriptionWithCoach && (
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            Coach : {`${userSubscription.coachFirstName} ${userSubscription.coachLastName}`}
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    {userSubscription.subscriptionWithCoach && (
                        <Button variant="contained" sx={{backgroundColor: '#ff9800', color: 'white'}}
                                onClick={() => handleTrainingDialogOpen(userSubscription.id)}>
                            Trainings <RunCircle/>
                        </Button>
                    )}
                    {userSubscription.subscriptionWithCoach
                        && userSubscription.trainingsLeft !== 0
                        && checkForAllowedDate(userSubscription.expirationDate) && (
                            <Button variant="contained" sx={{backgroundColor: '#8bc34a', color: 'white'}}
                                    onClick={() => {
                                        setTrainingEnrollDialogOpen(true)
                                    }}>
                                Enroll<Straight/>
                            </Button>
                        )}
                </CardActions>
            </Card>
            <Dialog open={trainingDialogOpen}
                    onClose={() => setTrainingDialogOpen(false)}
                    scroll='paper'
                    fullScreen
                    TransitionComponent={Slide}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setTrainingDialogOpen(false)}
                    aria-label="close"
                >
                    <GridCloseIcon/>
                </IconButton>
                <DialogTitle id="scroll-dialog-title"
                             sx={{textAlign: 'center', fontSize: '24px', color: '#3e4396', fontWeight: 'bold'}}>
                    Trainings
                </DialogTitle>
                <DialogContent>
                    <UserTrainingsGrid trainings={trainings} fetchChangedData={fetchChangedData}></UserTrainingsGrid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTrainingDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <TrainingEnroll trainingEnrollDialogOpen={trainingEnrollDialogOpen}
                            setTrainingEnrollDialogOpen={setTrainingEnrollDialogOpen}
                            userSubscription={userSubscription} fetchChangedData={fetchChangedData}>
            </TrainingEnroll>
        </>
    );
};

export default UserSubscriptionCard;
