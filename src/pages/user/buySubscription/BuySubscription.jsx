import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import SubscriptionService from "../../../api/SubscriptionService";
import {Box, Grid} from "@mui/material";
import BuySubscriptionCard from "./components/BuySubscriptionCard";

const BuySubscription = () => {
    const [subscriptions, setSubscriptions] = useState([])
    const [fetchSubscription, isSubscriptionsLoading, subscriptionsError] = useFetching(async () => {
        const response = await SubscriptionService.getAllSubscriptions();
        setSubscriptions(response.data)
    })
    const [carouselState, setCarouselState] = useState({
        currentIndex: 0,
    });

    useEffect(() => {
        fetchSubscription()
    }, []);
    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            <h1>Subscriptions</h1>
            <Grid container spacing={3} mt="20px">
                {subscriptions.map(subscription => (
                    <Grid key={subscription.id} item xs={12} sm={6}>
                        <BuySubscriptionCard key={subscription.id} subscription={subscription}
                        ></BuySubscriptionCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BuySubscription;