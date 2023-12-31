import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Delete, Update} from "@mui/icons-material";

const SubscriptionCard = ({
                              subscription,
                              setSubscriptionIdToDelete,
                              setDeleteDialogOpen,
                              setSubscriptionToUpdate,
                              setUpdateDialogOpen
                          }) => {
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
                <Button variant="contained" sx={{backgroundColor: '#ff9800', color: 'white'}}
                        onClick={async () => {
                            await setSubscriptionToUpdate(subscription)
                            setUpdateDialogOpen(true)
                        }}>Update <Update/>
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#bf360c', color: 'white'}}
                        onClick={() => {
                            setSubscriptionIdToDelete(subscription.id)
                            setDeleteDialogOpen(true)
                        }}>Delete <Delete/></Button>
            </CardActions>
        </Card>
    );
};
export default SubscriptionCard;