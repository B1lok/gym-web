import React, {useEffect, useState} from 'react';
import * as styles from './HeaderDesktop.styles';
import AuthButtons from "../auth-buttons/AuthButtons";
import HeaderLogo from "../header-logo/HeaderLogo";
import {PAGES} from "../../constants";
import UserService from "../../../../../../api/UserService";
import {useFetching} from "../../../../../../hooks/useFetching";
import {
    AppBar,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
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
        <AppBar elevation={4} sx={styles.headerContainer}>
            <HeaderLogo/>
            <Toolbar disableGutters>
                <List sx={styles.list}>
                    {PAGES.map((page, index) => (
                        <ListItem key={index} sx={styles.listItem}>
                            <ListItemButton href={page.link} sx={styles.listItemButton}>
                                <ListItemText primary={page.title} sx={styles.listItemText}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
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