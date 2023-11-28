import React, {useEffect, useState} from 'react';
import * as styles from './Subscriptions.styles'
import {useFetching} from "../hooks/useFetching";
import SubscriptionService from "../api/SubscriptionService";
import PageLayout from "../components/common/layout/page-layout/PageLayout";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";
import SubscriptionCard from "../components/SubscriptionCard";
import {Add} from "@mui/icons-material";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([
        {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}
    ])
    const [subscriptionIdToDelete, setSubscriptionIdToDelete] = useState(null)
    const [fetchSubscriptions, isSubscriptionsLoading, subscriptionError] = useFetching(async () => {
        const response = await SubscriptionService.getAllSubscriptions()
        setSubscriptions(response.data)
    })

    const [isSubscriptionOpened, setIsSubscriptionOpened] = useState(false)
    const [isSubscriptionRemovalDialogOpened, setIsSubscriptionRemovalDialogOpened] = useState(false)

    const subscriptionSchema = z
        .object({
            type: string()
                .min(1, 'Select type'),
            price: z.coerce.string()
                .min(1, 'Select price')
                .pipe(z.coerce.number()),
            duration: z.coerce.string()
                .min(1, 'Select duration')
                .pipe(z.coerce.number()),
            visits: z.coerce.string()
                .min(1, 'Select the number of visits')
                .pipe(z.coerce.number()),
            coach: z.coerce.boolean(),
        })

    const defaultValues = {
        type: '',
        duration: '',
        visits: '',
        price: '',
        coach: true,
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        reset,
        control,
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(subscriptionSchema),
    })

    const handleSubscriptionDialog = () => {
        setIsSubscriptionOpened(isDialogOpened => !isDialogOpened)
    }

    const handleSubscriptionRemovalDialog = () => {
        setIsSubscriptionRemovalDialogOpened(isSubscriptionRemovalDialogOpened => !isSubscriptionRemovalDialogOpened)
    }

    const handleSubscriptionRemoval = async () => {
        const response = await SubscriptionService.deleteSubscriptionById(subscriptionIdToDelete)
        if ('message' in response) {
            // setErrorButtonMessage(response.message)
            // setErrorButtonVisible(true)
        } else {
            fetchSubscriptions()
            handleSubscriptionRemovalDialog()
            setSubscriptionIdToDelete(null)
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
    }

    useEffect(() => {
        fetchSubscriptions()
    }, []);

    return (
        <PageLayout>
            <Box sx={styles.layout}>
                <Typography variant="h2" align="center" gutterBottom>Subscriptions</Typography>
                {subscriptions.length === 0 ? (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button
                            onClick={handleSubscriptionDialog}
                            variant="contained"
                            size="large"
                            color="primary"
                        >
                            Create new subscription
                        </Button>
                    </Box>
                ) : (
                    <IconButton onClick={handleSubscriptionDialog} color="primary" disableRipple sx={styles.addIcon}>
                        <Add/>
                    </IconButton>
                )}
                <Grid container spacing={2} columns={{xs: 4, sm: 8, md: 12}}>
                    {subscriptions.map(subscription => (
                        <Grid key={subscription.id} item xs={12} sm={6} lg={4}>
                            <SubscriptionCard
                                key={subscription.id}
                                subscription={subscription}
                                setSubscriptionIdToDelete={setSubscriptionIdToDelete}
                                setDeleteDialogOpen={setIsSubscriptionRemovalDialogOpened}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Dialog
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    open={isSubscriptionOpened}
                    onClose={handleSubscriptionDialog}
                    keepMounted
                    noValidate
                    fullWidth
                >
                    <DialogTitle align="center">Subscription</DialogTitle>
                    <DialogContent sx={styles.dialogContent}>
                        <Stack spacing={2}>
                            <FormControl variant="standard" required>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    {...register('type')}
                                    defaultValue={defaultValues.type}
                                    error={Boolean(errors.type)}
                                    id="type"
                                    labelId="type-label"
                                    label="Type"
                                >
                                    <MenuItem value={"Gym"}>Gym</MenuItem>
                                    <MenuItem value={"Box"}>Box</MenuItem>
                                    <MenuItem value={"Pool"}>Pool</MenuItem>
                                </Select>
                                <FormHelperText>{errors.type?.message}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="duration-label">Duration</InputLabel>
                                <Select
                                    {...register('duration')}
                                    defaultValue={defaultValues.duration}
                                    error={Boolean(errors.duration)}
                                    id="duration"
                                    labelId="duration-label"
                                    label="Duration"
                                >
                                    <MenuItem value={-1}>Unlimited</MenuItem>
                                    <MenuItem value={7}>7 days</MenuItem>
                                    <MenuItem value={14}>2 weeks</MenuItem>
                                    <MenuItem value={21}>3 weeks</MenuItem>
                                    <MenuItem value={30}>30 days</MenuItem>
                                </Select>
                                <FormHelperText>{errors.duration?.message}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="visits-label">Visits</InputLabel>
                                <Select
                                    {...register('visits')}
                                    defaultValue={defaultValues.visits}
                                    error={Boolean(errors.visits)}
                                    id="visits"
                                    labelId="visits-label"
                                    label="Visits"
                                >
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                </Select>
                                <FormHelperText>{errors.visits?.message}</FormHelperText>
                            </FormControl>
                            <TextField
                                {...register('price')}
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                                id="price"
                                label="Price"
                                type="number"
                                required
                                variant="standard"
                            />
                            {/*<FormControl>*/}
                            {/*    <InputLabel htmlFor="coach">Coach</InputLabel>*/}
                            {/*    <Checkbox {...register('coach')} id="coach" disableRipple/>*/}
                            {/*</FormControl>*/}
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="check"
                                        control={control}
                                        defaultValue={true}
                                        render={({field}) => <Checkbox {...register('coach')}/>}
                                    />
                                }
                                label="Coach"
                                labelPlacement="start"
                                sx={{justifyContent: 'start'}}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={styles.actions}>
                        <Button variant="outlined" onClick={() => reset(defaultValues)}>Clear</Button>
                        <Button type="submit" variant="contained">Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isSubscriptionRemovalDialogOpened}
                    onClose={setIsSubscriptionRemovalDialogOpened}
                    TransitionComponent={Slide}
                    keepMounted
                >
                    <DialogTitle>Deleting the subscription</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this subscription?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubscriptionRemovalDialog}>Disagree</Button>
                        <Button onClick={handleSubscriptionRemoval}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </PageLayout>
    );
};

export default Subscriptions;