import React, {useContext, useEffect, useMemo, useState} from 'react';
import * as styles from './Profile.styles';
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import Sidebar from "../../components/common/layout/sidebar/Sidebar";
import {Controller, useForm} from "react-hook-form";
import {Alert, Box, Button, ButtonGroup, Grid, MenuItem, Select, TextField} from "@mui/material";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../api/UserService";
import {AuthContext} from "../../context/authContext";
import CoachService from "../../api/CoachService";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";
import InputMask from "react-input-mask";
import {useNavigate} from "react-router-dom";
import {signOut} from "../../utils/utils";

const Profile = () => {
    const userSchema = z
        .object({
            firstName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            lastName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            phoneNumber: string()
                .regex(new RegExp('^\\+38\\(0[0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}$'), 'Invalid phone number'),
            email: string()
                .email('Invalid email address'),
            // password: string()
            //     .min(1, 'Password is required')
            //     .min(8, '8 characters are required')
            //     .max(32, 'Too long'),
            // confirmPassword: string()
        })
    // .refine(data => data.password === data.confirmPassword, {
    //     message: "Passwords don't match",
    //     path: ['confirmPassword']
    // })

    const coachSchema = z
        .object({
            firstName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            lastName: string()
                .regex(new RegExp('^[a-zA-Z]+$'), 'Latin letters only')
                .max(32, 'Too long'),
            phoneNumber: string()
                .regex(new RegExp('^\\+38\\(0[0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}$'), 'Invalid phone number'),
            email: string()
                .email('Invalid email address'),
            education: string()
                .max(256, 'Too long'),
            experience: string()
                .max(512, 'Too long'),
            specialization: string(),
        })

    const [oldEmail, setOldEmail] = useState('')
    const navigate = useNavigate()
    const {isAuth, setIsAuth, token, setToken, roles, setRoles,} = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const [coachData, setCoachData] = useState({})
    const [fetchUserData, isUserDataLoading, userDataError] = useFetching(async () => {
        const response = await UserService.getSelf()
        setUserData(response.data)
        setOldEmail(response.data.email)
    })
    const [fetchCoachData, isCoachDataLoading, CoachDataError] = useFetching(async () => {
        const response = await CoachService.getSelf()
        setCoachData(response.data)
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset,
    } = useForm({
        mode: 'onTouched',
        defaultValues: useMemo(() => {
            return {...userData, ...coachData}
        }, [userData, coachData]),
        resolver: zodResolver(roles.includes('ROLE_COACH') ? coachSchema : userSchema),
    })

    useEffect(() => {
        fetchUserData();
        if (roles.includes('ROLE_COACH')) {
            fetchCoachData();
        }
    }, []);

    useEffect(() => {
        const resetData = () => {
            reset({...userData, ...coachData})
        }

        resetData()
    }, [userData, coachData]);

    const onSubmit = async (data) => {
        const userData = {}
        const coachData = {}

        if (roles.includes('ROLE_COACH')) {
            const coachUpdateResponse = await CoachService.updateSelf(data)

            if ('message' in coachUpdateResponse) {
                setError('root.serverError', {
                    type: coachUpdateResponse.message
                })
            }
        }

        const userUpdateResponse = await UserService.updateSelf(data)

        if ('message' in userUpdateResponse) {
            setError('root.serverError', {
                type: userUpdateResponse.message
            })
            return
        }

        if (oldEmail !== userUpdateResponse.data.email) {
            signOut(navigate, setIsAuth, setToken, setRoles)
        }
    }

    return (
        <PageLayout hasHeader hasFooter>
            <Sidebar hasHeader hasFooter sx={styles.main}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        id="firstName"
                                        label="First Name"
                                        autoComplete="given-name"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        id="lastName"
                                        label="Last Name"
                                        autoComplete="family-name"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                defaultValue=""
                                render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                                    <InputMask
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        mask="+38(099)999-99-99"
                                    >
                                        {() => <TextField
                                            error={Boolean(error)}
                                            helperText={error?.message}
                                            id="phone"
                                            label="Phone number"
                                            autoComplete="tel"
                                            required
                                            fullWidth
                                        />}
                                    </InputMask>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        {...register('password')}*/}
                        {/*        error={Boolean(errors.password)}*/}
                        {/*        helperText={errors.password?.message}*/}
                        {/*        id="password"*/}
                        {/*        label="Password"*/}
                        {/*        type="password"*/}
                        {/*        autoComplete="new-password"*/}
                        {/*        required*/}
                        {/*        fullWidth*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        {...register('confirmPassword')}*/}
                        {/*        error={Boolean(errors.confirmPassword)}*/}
                        {/*        helperText={errors.confirmPassword?.message}*/}
                        {/*        id="confirm-password"*/}
                        {/*        label="Confirm password"*/}
                        {/*        type="password"*/}
                        {/*        required*/}
                        {/*        fullWidth*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {}
                        {roles.includes('ROLE_COACH') && (
                            <>
                                <Grid item xs={12}>
                                    <Controller
                                        name="education"
                                        control={control}
                                        defaultValue=""
                                        render={({field, fieldState: {error}}) => (
                                            <TextField
                                                {...field}
                                                error={Boolean(error)}
                                                helperText={error?.message}
                                                id="eductaion"
                                                label="Eductaion"
                                                required
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="experience"
                                        control={control}
                                        defaultValue=""
                                        render={({field, fieldState: {error}}) => (
                                            <TextField
                                                {...field}
                                                error={Boolean(error)}
                                                helperText={error?.message}
                                                id="experience"
                                                label="Experience"
                                                required
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="specialization"
                                        control={control}
                                        defaultValue=""
                                        render={({field, fieldState: {error}}) => (
                                            <Select
                                                {...field}
                                                error={Boolean(error)}
                                                id="visits"
                                                labelId="visits-label"
                                                label="Visits"
                                                fullWidth
                                                disabled
                                            >
                                                <MenuItem value={"GYM"}>Gym</MenuItem>
                                                <MenuItem value={"BOX"}>Box</MenuItem>
                                                <MenuItem value={"SWIMMING_POOL"}>Pool</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <ButtonGroup fullWidth sx={{mt: 2}}>
                        <Button onClick={fetchUserData} variant="outlined">
                            Reset
                        </Button>
                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </ButtonGroup>
                    {errors.root?.serverError &&
                        <Alert severity={"error"}>{errors.root.serverError?.type ?? 'Unknown error'}</Alert>}
                </Box>
            </Sidebar>
        </PageLayout>
    );
};

export default Profile;