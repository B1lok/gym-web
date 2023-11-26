import React, {useEffect, useState} from 'react';
import * as styles from './HeaderDesktop.styles';
import AuthButtons from "../auth-buttons/AuthButtons";
import HeaderLogo from "../header-logo/HeaderLogo";
import {PAGES} from "../../constants";
import UserService from "../../../../../../api/UserService";
import {useFetching} from "../../../../../../hooks/useFetching";
import {AppBar, IconButton, Link, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

const HeaderDesktop = ({isAuth}) => {
    const [user, setUser] = useState({firstName: 'Unknown', lastName: 'user'})
    const [fetchSelf, isLoading, error] = useFetching(async () => {
        const response = await UserService.getSelf()
        setUser(response.data)
    })

    useEffect(() => {
        fetchSelf()
    }, []);

    return (
        <AppBar elevation={2} sx={styles.headerContainer}>
            <HeaderLogo/>
            <Toolbar disableGutters sx={styles.headerLinks}>
                <Tabs value={0}>
                    {PAGES.map((page, index) => (
                        <Tab key={index} label={page.title} href={page.link}/>
                    ))}
                </Tabs>
            </Toolbar>
            <Toolbar disableGutters>
                {isAuth ? (
                    <Link href="/profile" underline="none">
                        <IconButton disableRipple>
                            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                            <AccountCircle/>
                        </IconButton>
                    </Link>
                ) : (
                    <AuthButtons/>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default HeaderDesktop;