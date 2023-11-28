import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import SubscriptionService from "../api/SubscriptionService";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    Slide,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";
import SubscriptionCard from "../components/SubscriptionCard";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";

const Subscriptions1 = () => {
    const [subscriptions, setSubscriptions] = useState([])
    const [creationDialogOpen, setCreationDialog] = useState(false)
    const [deletionDialogOpen, setDeletionDialogOpen] = useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [subscriptionIdToDelete, setSubscriptionIdToDelete] = useState(null)
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)


    const [fetchSubscriptions, isSubscriptionsLoading, subscriptionError] = useFetching(async () => {
        const response = await SubscriptionService.getAllSubscriptions()
        setSubscriptions(response.data)
    })

    const createSubscriptionSchema = z
        .object({
            selectType: string()
                .min(1, 'selectType'),
            price: string()
                .min(1, 'price'),
            selectVisits: string()
                .min(1, 'selectVisits'),
            selectDuration: string()
                .min(1, 'selectDuration'),
            withCoach: string(),
        })

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        control
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(createSubscriptionSchema)
    })

    const handleSubscriptionCreation = async () => {

    }
    const onSubmit = async (data) => {
        alert(data)
        console.log(data)
    }


    const handleSubscriptionDeletion = async () => {
        const response = await SubscriptionService.deleteSubscriptionById(subscriptionIdToDelete)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchSubscriptions()
            setDeletionDialogOpen(false)
            setSubscriptionIdToDelete(null)
        }
    }

    useEffect(() => {
        fetchSubscriptions()
    }, []);

    return (
        <Box m="20px" sx={{textAlign: 'center'}}>
            <h1>Subscriptions</h1>
            {errorButtonVisible && (
                <Alert
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999
                    }}
                    onClose={() => setErrorButtonVisible(false)}
                    severity="error"
                >
                    {errorButtonMessage}
                </Alert>)}
            <Button size="large" onClick={() => setCreationDialog(true)} variant="contained" color="success"
                    sx={{marginTop: '15px'}}>
                Create new subscription
                <Add sx={{marginLeft: '5px'}}></Add>
            </Button>
            <Grid container spacing={3} mt="20px">
                {subscriptions.map(subscription => (
                    <Grid key={subscription.id} item xs={12} sm={6}>
                        <SubscriptionCard key={subscription.id} subscription={subscription}
                                          setSubscriptionIdToDelete={setSubscriptionIdToDelete}
                                          setDeleteDialogOpen={setDeletionDialogOpen}
                        ></SubscriptionCard>
                    </Grid>
                ))}
            </Grid>
            <Dialog sx={{textAlign: 'center'}}
                    open={creationDialogOpen} onClose={() => setCreationDialog(false)}>
                <DialogTitle>Create new subscription</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new subscription please fill out the form
                    </DialogContentText>
                    {/*<FormControl fullWidth sx={{mt: 2}}>*/}
                    {/*    <InputLabel id="select-type">Select type</InputLabel>*/}
                    {/*    <Controller*/}
                    {/*        name="selectType"*/}
                    {/*        control={control}*/}
                    {/*        defaultValue=""*/}
                    {/*        render={({field}) => (*/}
                    {/*            <Select*/}
                    {/*                {...field}*/}
                    {/*                labelId="select-type"*/}
                    {/*                id="type-select"*/}
                    {/*                label="Type"*/}
                    {/*            >*/}
                    {/*                <MenuItem value={"GYM"}>Gym</MenuItem>*/}
                    {/*                <MenuItem value={"SWIMMING_POOL"}>Swimming pool</MenuItem>*/}
                    {/*                <MenuItem value={"BOX"}>Box section</MenuItem>*/}
                    {/*            </Select>*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*< /FormControl>*/}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <TextField
                                {...register('price')}
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                                label="Price"
                            />
                        </FormControl>
                        <Button type="submit">Create</Button>
                    </Box>


                    {/*<FormControl fullWidth sx={{mt: 2}}>*/}
                    {/*    <InputLabel id="select-visits">Select amount of visits</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="select-visits"*/}
                    {/*        id="visits-select"*/}
                    {/*        label="Visits"*/}
                    {/*        value=""*/}
                    {/*        {...register('selectVisits')}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={3}>3</MenuItem>*/}
                    {/*        <MenuItem value={5}>5</MenuItem>*/}
                    {/*        <MenuItem value={8}>8</MenuItem>*/}
                    {/*        <MenuItem value={10}>10</MenuItem>*/}
                    {/*        <MenuItem value={12}>12</MenuItem>*/}
                    {/*        <MenuItem value={-1}>UNLIMITED</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl fullWidth sx={{mt: 2}}>*/}
                    {/*    <InputLabel id="select-duration">Select subscription duration</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="select-duration"*/}
                    {/*        id="duration-select"*/}
                    {/*        label="Duration"*/}
                    {/*        {...register('selectDuration')}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={31}>Month</MenuItem>*/}
                    {/*        <MenuItem value={93}>Tree months</MenuItem>*/}
                    {/*        <MenuItem value={365}>Year</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                    {/*<FormControl sx={{mt: 2}}>*/}
                    {/*    <FormControlLabel*/}
                    {/*        control={<Checkbox color="success" {...register('withCoach')} defaultChecked/>}*/}
                    {/*        label="With coach"/>*/}
                    {/*</FormControl>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreationDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deletionDialogOpen}
                TransitionComponent={Slide}
                keepMounted
                onClose={() => setDeletionDialogOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Deleting the subscription</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this subscription?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeletionDialogOpen(false)}>Disagree</Button>
                    <Button onClick={handleSubscriptionDeletion}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};


export default Subscriptions1;