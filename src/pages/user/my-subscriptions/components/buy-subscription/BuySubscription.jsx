import React, {useEffect, useState} from 'react';
import BuySubscriptionCard from "./components/BuySubscriptionCard";
import SubscriptionPurchaseDialog from "./components/SubscriptionPurchaseDialog";
import CoachService from "../../../../../api/CoachService";
import SubscriptionService from "../../../../../api/SubscriptionService";
import {useFetching} from "../../../../../hooks/useFetching";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide} from "@mui/material";
import {Close} from "@mui/icons-material";

const BuySubscription = ({dialogOpen, setDialogOpen}) => {
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriptionPurchaseDialog, setSubscriptionPurchaseDialog] = useState(false)
    const [coaches, setCoaches] = useState([])
    const [subscriptionToBuy, setSubscriptionToBuy] = useState({})
    const [fetchSubscription, isSubscriptionsLoading, subscriptionsError] = useFetching(async () => {
        const response = await SubscriptionService.getAllSubscriptions();
        setSubscriptions(response.data)
    })

    const [fetchCoaches, isCoachesLoading, coachesError] = useFetching(async () => {
        const response = await CoachService.getAllCoaches()
        setCoaches(response.data)
    })


    useEffect(() => {
        fetchSubscription()
        fetchCoaches()
    }, []);

    return (
        <>
            <SubscriptionPurchaseDialog
                subscriptionPurchaseDialogOpen={subscriptionPurchaseDialog}
                setSubscriptionPurchaseDialog={setSubscriptionPurchaseDialog}
                subscriptionToBuy={subscriptionToBuy}
                coaches={coaches}
            />
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                scroll='paper'
                fullScreen
                TransitionComponent={Slide}
                sx={{zIndex: 100}}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setDialogOpen(false)}
                    aria-label="close"
                >
                    <Close/>
                </IconButton>
                <DialogTitle sx={{textAlign: 'center', fontSize: '24px', color: '#3e4396', fontWeight: 'bold'}}>
                    Buy new subscriptions
                </DialogTitle>
                <DialogContent>
                    <Box m="20px" sx={{textAlign: 'center'}}>
                        <Grid container spacing={3} mt="20px">
                            {subscriptions.map(subscription => (
                                <Grid key={subscription.id} item xs={12} sm={6} xl={4}>
                                    <BuySubscriptionCard
                                        key={subscription.id}
                                        subscription={subscription}
                                        setSubscriptionToBuy={setSubscriptionToBuy}
                                        setSubscriptionPurchaseDialog={setSubscriptionPurchaseDialog}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BuySubscription;