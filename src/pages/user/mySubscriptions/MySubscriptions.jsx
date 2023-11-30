import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../api/UserService";
import {Box, Button, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import UserSubscriptionCard from "./components/UserSubscriptionCard";
import BuySubscription from "./buySubscription/BuySubscription";

const MySubscriptions = () => {

    const [subscriptions, setSubscriptions] = useState([])
    const navigate = useNavigate()
    const [buySubscriptionDialogOpen, setBuySubscriptionDialogOpen] = useState(false)
    const [fetchSubscriptions, isLoading, subscriptionsError] = useFetching(async () => {
        const response = await UserService.getMySubscriptions()
        setSubscriptions(response.data)
    })

    useEffect(() => {
        fetchSubscriptions()
    }, []);

    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            <h1>My Subscriptions</h1>
            <Button size="large" variant="contained"
                    color="success" onClick={() => setBuySubscriptionDialogOpen(true)}
                    sx={{marginTop: '15px'}}>
                Buy new subscription
                <Add sx={{marginLeft: '5px'}}></Add>
            </Button>
            <Grid container spacing={3} mt="20px">
                {subscriptions.map(subscription => (
                    <Grid key={subscription.id} item xs={12} sm={6}>
                        <UserSubscriptionCard key={subscription.id}
                                              userSubscription={subscription}
                                              fetchSubscriptions={fetchSubscriptions}
                        ></UserSubscriptionCard>
                    </Grid>
                ))}
            </Grid>
            <BuySubscription dialogOpen={buySubscriptionDialogOpen} setDialogOpen={setBuySubscriptionDialogOpen}/>

        </Box>
    );
};

export default MySubscriptions;