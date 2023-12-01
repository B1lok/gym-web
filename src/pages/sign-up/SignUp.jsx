import React, {useContext} from 'react';
import * as styles from './SignUp.styles';
import {useNavigate} from "react-router-dom";
import {SIGNIN_ROUTE} from "../../utils/constants";
import {AuthContext} from "../../context/authContext";
import AuthService from "../../api/AuthService";
import {Alert, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";
import InputMask from "react-input-mask";
import {signIn} from "../../utils/utils";

const SignUp = () => {
    const navigate = useNavigate()
    const {setIsAuth, setToken, setRoles} = useContext(AuthContext)

    const signUpSchema = z
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
            password: string()
                .min(1, 'Password is required')
                .min(8, '8 characters are required')
                .max(32, 'Too long'),
            confirmPassword: string()
        })
        .refine(data => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ['confirmPassword']
        })

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data) => {
        delete data.confirmPassword
        const signUpResponse = await AuthService.signUp(data)

        if ('message' in signUpResponse) {
            setError('root.serverError', {
                type: signUpResponse.message
            })
            return
        }

        const signInData = {email: data.email, password: data.password}
        const signInResponse = await AuthService.signIn(signInData)

        if ('message' in signInResponse) {
            setError('root.serverError', {
                type: signInResponse.message
            })
            return
        }

        signIn(navigate, setIsAuth, setToken, setRoles, signInResponse.data.token)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={styles.main}
            >
                <Typography component="h1" variant="h4">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                                render={({field, fieldState: {error}}) => (
                                    <InputMask
                                        {...field}
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
                                        label="Email"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        error={Boolean(error)}
                                        helperText={error?.message}
                                        id="confirm-password"
                                        label="Confirm password"
                                        type="password"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" fullWidth sx={{mt: 3}}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{mt: 1, mb: 3}}>
                        <Grid item>
                            <Link href={SIGNIN_ROUTE} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    {errors.root?.serverError &&
                        <Alert severity={"error"}>{errors.root.serverError?.type ?? 'Unknown error'}</Alert>
                    }
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;