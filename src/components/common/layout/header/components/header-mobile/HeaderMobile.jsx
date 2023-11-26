import React, {useState} from 'react';
import * as styles from "./HeaderMobile.styles";
import DrawerMenu from "./components/DrawerMenu/DrawerMenu";
import HeaderLogo from "../header-logo/HeaderLogo";
import {AppBar, IconButton} from "@mui/material";
import {Close, Menu} from "@mui/icons-material";

const HeaderMobile = ({isAuth}) => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false)

    const handleDrawer = () => {
        setIsDrawerOpened(isDrawerOpened => !isDrawerOpened)
    }

    return (
        <AppBar elevation={2} sx={styles.headerContainer}>
            <HeaderLogo/>
            {isDrawerOpened ? (
                <IconButton onClick={handleDrawer} disableRipple sx={styles.iconButton}>
                    <Close/>
                </IconButton>
            ) : (
                <IconButton onClick={handleDrawer} disableRipple sx={styles.iconButton}>
                    <Menu/>
                </IconButton>
            )}
            <DrawerMenu isAuth={isAuth} isDrawerOpened={isDrawerOpened} handleDrawer={handleDrawer}/>
        </AppBar>
    );
};

export default HeaderMobile;