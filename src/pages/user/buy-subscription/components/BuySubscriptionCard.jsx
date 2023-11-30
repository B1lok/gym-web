import React from 'react';
import * as styles from './BuySubscriptionCard.styles';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Shop} from "@mui/icons-material";

const BuySubscriptionCard = ({subscription}) => {
    return (
        <Card sx={{minWidth: 275, borderRadius: 8, border: '1px solid #e0e0e0'}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Subscription Details
                </Typography>
                <Typography variant="h5" component="div">
                    {subscription.subscriptionType}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    Price: {subscription.price}
                </Typography>
                <Typography variant="body2">
                    Visits Amount: {subscription.visitsAmount === -1 ? 'UNLIMITED' : `${subscription.visitsAmount}`}
                    <br/>
                    Duration in Days: {subscription.durationInDays}
                    <br/>
                    With Coach: {subscription.withCoach ? 'Yes' : 'No'}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'center'}}>
                <Button variant="contained" sx={{backgroundColor: '#6573c3', color: 'white'}}
                >Purchase<Shop/>
                </Button>
            </CardActions>
        </Card>
    );
};

export default BuySubscriptionCard;