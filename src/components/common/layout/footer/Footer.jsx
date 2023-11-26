import React from 'react';
import * as styles from "./Footer.styles";
import {SOCIAL_MEDIA} from "./constants";
import {IconButton, Link, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";

const Footer = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Paper elevation={4} sx={styles.footerContainer}>
            {SOCIAL_MEDIA.map((social, index) => (
                <Link key={index} href={social.link}>
                    <IconButton disableRipple>
                        {social.icon}
                        {isDesktop && <Typography sx={styles.socialText}>{social.text}</Typography>}
                    </IconButton>
                </Link>
            ))}
        </Paper>
    );
};

export default Footer;