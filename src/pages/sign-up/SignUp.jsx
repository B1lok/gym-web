import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE, SIGNIN_ROUTE} from "../../utils/constants";
import {AuthContext} from "../../context/authContext";
import AuthService from "../../api/AuthService";
import {jwtDecode} from "jwt-decode";
import {Alert, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";
import InputMask from "react-input-mask";

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
        register,
        handleSubmit,
        formState: {errors},
        setError,
        control
    } = useForm({
        mode: 'onTouched',
        // resolver: zodResolver(signUpSchema)
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

        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        setToken(signInResponse.data.token)
        localStorage.setItem('token', signInResponse.data.token)

        const decodedJwt = jwtDecode(signInResponse.data.token)
        setRoles(decodedJwt.roles)
        localStorage.setItem('roles', JSON.stringify(decodedJwt.roles))
        navigate(MAIN_ROUTE)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('firstName')}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName?.message}
                                id="firstName"
                                label="First Name"
                                autoComplete="given-name"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('lastName')}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                                id="lastName"
                                label="Last Name"
                                autoComplete="family-name"
                                required
                                fullWidth
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
                            <TextField
                                {...register('email')}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password')}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('confirmPassword')}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword?.message}
                                id="confirm-password"
                                label="Confirm password"
                                type="password"
                                required
                                fullWidth
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
                        <Alert severity={"error"}>{errors.root.serverError?.type ?? errors.root.serverError?.type ?? 'Unknown error'}</Alert>}
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;