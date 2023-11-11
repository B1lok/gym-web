import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {MAIN_ROUTE, SIGNUP_ROUTE} from "../utils/constants";
import {useNavigate} from "react-router-dom";
import AuthService from "../API/AuthService";
import {AuthContext} from "../context/authContext";
import {jwtDecode} from "jwt-decode";

const Login = () => {

    const {setIsAuth, setToken, setRoles} = useContext(AuthContext)
    const navigate = useNavigate()
    const [authError, setAuthError] = useState(null)
    const [loginError, setLoginError] = useState(null)
    const [passwordError, setPasswordError] = useState('')
    const [user, setUser] = useState({
        login: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await AuthService.signIn(user)

        if ('message' in response) {
            setAuthError(response.message)
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
    const handleLoginChange = (e) => {
        setUser({...user, login: e.target.value})
        if (/^[a-zA-Z0-9_.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(e.target.value)) {
            setLoginError('')
        } else {
            setLoginError("Invalid login")
        }
    };
    const handlePasswordChange = (e) => {
        setUser({...user, password: e.target.value})
        if (e.target.value.length === 0) {
            setPasswordError("Invalid password")
        } else {
            setPasswordError('')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
                    <TextField
                        onChange={handleLoginChange}
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                    />
                    {loginError && (
                        <Typography variant="body2" color="error">
                            {loginError}
                        </Typography>
                    )}
                    <TextField
                        onChange={handlePasswordChange}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {passwordError && (
                        <Typography variant="body2" color="error">
                            {passwordError}
                        </Typography>
                    )}
                    {authError && (
                        <Typography variant="body2" color="error">
                            {authError}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={loginError === null || passwordError === null ||
                            loginError !== '' || passwordError !== ''}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href={SIGNUP_ROUTE} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;