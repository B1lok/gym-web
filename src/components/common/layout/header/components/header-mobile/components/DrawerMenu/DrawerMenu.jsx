import React from 'react';
import * as styles from "./DrawerMenu.styles";
import AuthButtons from "../../../auth-buttons/AuthButtons";
import {PAGES} from "../../../../constants";
import {Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {AccountBox} from "@mui/icons-material";

const DrawerMenu = ({isAuth, isDrawerOpened, handleDrawer}) => {
    return (
        <Drawer anchor="top" open={isDrawerOpened} onClose={handleDrawer} disableScrollLock sx={styles.drawer}>
            <Box sx={styles.upperContainer}>
                {isAuth ? (
                    <List onClick={handleDrawer} sx={styles.list}>
                        <ListItemButton href="/profile" sx={styles.listItem}>
                            <ListItemIcon sx={styles.listIcon}>
                                <AccountBox/>
                            </ListItemIcon>
                            <ListItemText primary="Profile"/>
                        </ListItemButton>
                    </List>
                ) : (
                    <AuthButtons/>
                )}
            </Box>
            <Divider sx={styles.divider}/>
            <List sx={styles.list}>
                {PAGES.map((page, index) => (
                    <ListItemButton key={index} href={page.link} sx={styles.listItem}>
                        <ListItemIcon sx={styles.listIcon}>
                            {page.icon}
                        </ListItemIcon>
                        <ListItemText primary={page.title}/>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default DrawerMenu;