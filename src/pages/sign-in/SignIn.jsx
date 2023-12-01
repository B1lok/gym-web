import React, {useContext} from 'react';
import * as styles from './SignIn.styles';
import {useNavigate} from "react-router-dom";
import {SIGNUP_ROUTE} from "../../utils/constants";
import {AuthContext} from "../../context/authContext";
import AuthService from "../../api/AuthService";
import {Alert, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import {signIn} from "../../utils/utils";

const SignIn = () => {
    const navigate = useNavigate()
    const {setIsAuth, setToken, setRoles} = useContext(AuthContext)

    const {
        control,
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

        signIn(navigate, setIsAuth, setToken, setRoles, response.data.token)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={styles.main}>
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
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
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" fullWidth sx={{mt: 3}}>
                        Sign In
                    </Button>
                    <Grid container sx={{mt: 1, mb: 3}}>
                        <Grid item>
                            <Link href={SIGNUP_ROUTE} variant="body2">
                                Don't have an account? Sign Up
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

export default SignIn;