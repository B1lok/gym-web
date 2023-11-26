import React from 'react';
import * as styles from "./HeaderLogo.styles";
import {Link, Typography} from "@mui/material";
import {FitnessCenter} from "@mui/icons-material";

const HeaderLogo = () => {
    return (
        <Link href="/" underline="none" sx={styles.logo}>
            <FitnessCenter fontSize="large"/>
            <Typography variant="h4" noWrap sx={styles.logoText}>
                Gym
            </Typography>
        </Link>
    );
};

export default HeaderLogo;