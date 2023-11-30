import React, {useContext} from 'react';
import * as styles from './SignIn.styles';
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE, SIGNUP_ROUTE} from "../../utils/constants";
import {AuthContext} from "../../context/authContext";
import AuthService from "../../api/AuthService";
import {jwtDecode} from "jwt-decode";
import {Alert, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import {useForm} from "react-hook-form";

const SignIn = () => {
    const navigate = useNavigate()
    const {setIsAuth, setToken, setRoles} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        mode: 'onTouched'
    })

    const onSubmit = async (data) => {
        const response = await AuthService.signIn(data)

        if ('message' in response) {
            setError('root.serverError', {
                type: response.message
            })
            return
        }

        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)

        const decodedJwt = jwtDecode(response.data.token)
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('email')}
                                id="email"
                                label="Email"
                                autoComplete="email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password')}
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" fullWidth sx={{mt: 3}}>
                        Sign In
                    </Button>
                    <Grid container sx={{mt: 1, mb: 3}}>
                        <Grid item>
                            <Link href={SIGNUP_ROUTE} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {errors.root?.serverError &&
                        <Alert severity={"error"}>{errors.root.serverError?.type ?? 'Unknown error'}</Alert>}
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;