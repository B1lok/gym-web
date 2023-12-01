import React, {useEffect, useState} from 'react';
import * as styles from './Subscriptions.styles'
import {useFetching} from "../../../hooks/useFetching";
import SubscriptionService from "../../../api/SubscriptionService";
import PageLayout from "../../../components/common/layout/page-layout/PageLayout";
import {
    Alert,
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
import SubscriptionCard from "./components/SubscriptionCard";
import {Add} from "@mui/icons-material";
import Sidebar from "../../../components/common/layout/sidebar/Sidebar";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([])
    const [subscriptionIdToDelete, setSubscriptionIdToDelete] = useState(null)
    const [errorButtonMessage, setErrorButtonMessage] = useState('')
    const [errorButtonVisible, setErrorButtonVisible] = useState(false)
    const [fetchSubscriptions, isSubscriptionsLoading, subscriptionError] = useFetching(async () => {
        const response = await SubscriptionService.getAllSubscriptions()
        setSubscriptions(response.data)
    })

    const [isSubscriptionOpened, setIsSubscriptionOpened] = useState(false)
    const [isSubscriptionRemovalDialogOpened, setIsSubscriptionRemovalDialogOpened] = useState(false)
    const [isSubscriptionUpdateDialogOpened, setIsSubscriptionUpdateDialogOpened] = useState(false)
    const [subscriptionToUpdate, setSubscriptionToUpdate] = useState({})

    const subscriptionSchema = z
        .object({
            subscriptionType: string()
                .min(1, 'Select type'),
            price: z.coerce.string()
                .min(1, 'Select price')
                .pipe(z.coerce.number()),
            durationInDays: z.coerce.string()
                .min(1, 'Select duration')
                .pipe(z.coerce.number()),
            visitsAmount: z.coerce.string()
                .min(1, 'Select the number of visits')
                .pipe(z.coerce.number()),
            withCoach: z.coerce.boolean(),
        })

    const defaultValues = {
        subscriptionType: '',
        durationInDays: '',
        visitsAmount: '',
        price: '',
        withCoach: false,
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
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchSubscriptions()
            handleSubscriptionRemovalDialog()
            setSubscriptionIdToDelete(null)
        }
    }

    const handleSubscriptionCreation = async (data) => {
        const response = await SubscriptionService.createSubscription(data)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchSubscriptions()
            setIsSubscriptionOpened(false)
        }
        reset()
    }

    const handleSubscriptionUpdate = async () => {
        if (subscriptionToUpdate.price <= 0) {
            setErrorButtonMessage("Enter valid price")
            setErrorButtonVisible(true)
            return
        }
        const response = await SubscriptionService.updateSubscription(subscriptionToUpdate)
        if ('message' in response) {
            setErrorButtonMessage(response.message)
            setErrorButtonVisible(true)
        } else {
            fetchSubscriptions()
            setIsSubscriptionUpdateDialogOpened(false)
        }
    }

    useEffect(() => {
        fetchSubscriptions()
    }, []);

    return (
        <PageLayout hasHeader>
            <Sidebar hasHeader sx={styles.main}>
                <Typography variant="h3" align="center" gutterBottom>Subscriptions</Typography>
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
                                setSubscriptionToUpdate={setSubscriptionToUpdate}
                                subscription={subscription}
                                setUpdateDialogOpen={setIsSubscriptionUpdateDialogOpened}
                                setSubscriptionIdToDelete={setSubscriptionIdToDelete}
                                setDeleteDialogOpen={setIsSubscriptionRemovalDialogOpened}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Dialog
                    component="form"
                    onSubmit={handleSubmit(handleSubscriptionCreation)}
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
                                <Controller
                                    name="subscriptionType"
                                    control={control}
                                    defaultValue={defaultValues.subscriptionType}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            error={Boolean(errors.subscriptionType)}
                                            id="type"
                                            labelId="type-label"
                                            label="Type"
                                        >
                                            <MenuItem value={"GYM"}>Gym</MenuItem>
                                            <MenuItem value={"BOX"}>Box</MenuItem>
                                            <MenuItem value={"SWIMMING_POOL"}>Pool</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.subscriptionType?.message}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="duration-label">Duration</InputLabel>
                                <Controller
                                    name="durationInDays"
                                    control={control}
                                    defaultValue={defaultValues.durationInDays}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            error={Boolean(errors.durationInDays)}
                                            id="duration"
                                            labelId="duration-label"
                                            label="Duration"
                                        >
                                            <MenuItem value={31}>Month</MenuItem>
                                            <MenuItem value={93}>Tree months</MenuItem>
                                            <MenuItem value={365}>Year</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.durationInDays?.message}</FormHelperText>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="visits-label">Visits</InputLabel>
                                <Controller
                                    name="visitsAmount"
                                    control={control}
                                    defaultValue={defaultValues.visitsAmount}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            error={Boolean(errors.visitsAmount)}
                                            id="visits"
                                            labelId="visits-label"
                                            label="Visits"
                                        >
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={-1}>UNLIMITED</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.visitsAmount?.message}</FormHelperText>
                            </FormControl>
                            <Controller
                                name="price"
                                control={control}
                                defaultValue={defaultValues.price}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(errors.price)}
                                        helperText={errors.price?.message}
                                        id="price"
                                        label="Price"
                                        type="number"
                                        required
                                        variant="standard"
                                    />
                                )}
                            />
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="check"
                                        control={control}
                                        render={({field}) => (
                                            <Checkbox {...register('withCoach')}
                                                      defaultChecked={defaultValues.withCoach}/>
                                        )}
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
                    component="form"
                    onSubmit={handleSubscriptionUpdate}
                    open={isSubscriptionUpdateDialogOpened}
                    onClose={() => setIsSubscriptionUpdateDialogOpened(false)}
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
                                    value={String(subscriptionToUpdate.subscriptionType)}
                                    onChange={(e) =>
                                        setSubscriptionToUpdate((prev) => ({
                                            ...prev,
                                            subscriptionType: e.target.value,
                                        }))
                                    }
                                >
                                    <MenuItem value={"GYM"}>Gym</MenuItem>
                                    <MenuItem value={"BOX"}>Box</MenuItem>
                                    <MenuItem value={"SWIMMING_POOL"}>Pool</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="duration-label">Duration</InputLabel>
                                <Select
                                    value={parseInt(subscriptionToUpdate.durationInDays, 10)}
                                    onChange={(e) =>
                                        setSubscriptionToUpdate((prev) => ({
                                            ...prev,
                                            durationInDays: e.target.value,
                                        }))
                                    }
                                    id="duration"
                                    labelId="duration-label"
                                    label="Duration"
                                >
                                    <MenuItem value={31}>Month</MenuItem>
                                    <MenuItem value={93}>Tree months</MenuItem>
                                    <MenuItem value={365}>Year</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" required>
                                <InputLabel id="visits-label">Visits</InputLabel>
                                <Select
                                    value={parseInt(subscriptionToUpdate.visitsAmount, 10)}
                                    onChange={(e) =>
                                        setSubscriptionToUpdate((prev) => ({
                                            ...prev,
                                            visitsAmount: e.target.value,
                                        }))
                                    }
                                    id="visits"
                                    labelId="visits-label"
                                    label="Visits"
                                >
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                    <MenuItem value={-1}>UNLIMITED</MenuItem>
                                </Select>
                                <FormHelperText>{errors.visitsAmount?.message}</FormHelperText>
                            </FormControl>
                            <TextField
                                value={subscriptionToUpdate.price}
                                onChange={(e) =>
                                    setSubscriptionToUpdate((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                                id="price"
                                type="number"
                                required
                                variant="standard"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={Boolean(subscriptionToUpdate.withCoach)}
                                              onChange={(e) =>
                                                  setSubscriptionToUpdate((prev) => ({
                                                      ...prev,
                                                      withCoach: e.target.checked,
                                                  }))
                                              }
                                              name="withCoach"/>
                                }
                                label="Coach"
                                labelPlacement="start"
                                sx={{justifyContent: 'start'}}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={styles.actions}>
                        <Button variant="outlined" onClick={() => reset(defaultValues)}>Clear</Button>
                        <Button type="submit" variant="contained">Update</Button>
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
            </Sidebar>
        </PageLayout>
    );
};

export default Subscriptions;