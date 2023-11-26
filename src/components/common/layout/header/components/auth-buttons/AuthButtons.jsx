import React from 'react';
import * as styles from './AuthButtons.styles';
import {SIGNIN_ROUTE, SIGNUP_ROUTE} from "../../../../../../utils/constants";
import {Box, Button, Link} from "@mui/material";

const AuthButtons = () => {
    return (
        <Box sx={styles.authButtons}>
            <Link href={SIGNIN_ROUTE} sx={styles.link}>
                <Button variant="outlined" sx={styles.button}>Sign in</Button>
            </Link>
            <Link href={SIGNUP_ROUTE} sx={styles.link}>
                <Button variant="contained" disableElevation sx={styles.button}>Sign up</Button>
            </Link>
        </Box>
    );
};

export default AuthButtons;