import React, {useEffect, useState} from 'react';
import * as styles from "./MySubscriptions.styles";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../api/UserService";
import {useNavigate} from "react-router-dom";
import UserSubscriptionCard from "./components/UserSubscriptionCard";
import BuySubscription from "./buySubscription/BuySubscription";
import PageLayout from "../../../components/common/layout/page-layout/PageLayout";
import Sidebar from "../../../components/common/layout/sidebar/Sidebar";
import {Button, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

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
        <PageLayout hasHeader>
            <Sidebar hasHeader sx={styles.main}>
                <Typography variant="h3" mb={2}>{subscriptions.length ? 'Subscriptions' : 'Nothing here...'}</Typography>
                <Button
                    onClick={() => setBuySubscriptionDialogOpen(true)}
                    variant="contained"
                    size="large"
                    color="success"
                    endIcon={<Add/>}
                >
                    Buy new subscription
                </Button>
                <Grid container spacing={3} mt="20px" columns={{xs: 4, sm: 8, md: 12}}>
                    {subscriptions.map(subscription => (
                        <Grid key={subscription.id} item xs={12} sm={6} lg={4}>
                            <UserSubscriptionCard
                                key={subscription.id}
                                userSubscription={subscription}
                                fetchSubscriptions={fetchSubscriptions}
                            />
                        </Grid>
                    ))}
                </Grid>
                <BuySubscription dialogOpen={buySubscriptionDialogOpen} setDialogOpen={setBuySubscriptionDialogOpen}/>
            </Sidebar>
        </PageLayout>
    );
};

export default MySubscriptions;