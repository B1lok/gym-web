import React, {useContext, useState} from 'react';
import * as styles from './Sidebar.styles';
import {DEFAULT_TABS, TABS} from "./constants";
import {AuthContext} from "../../../../context/authContext";
import {
    Box,
    Button,
    Chip,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Slide,
    useTheme
} from "@mui/material";
import {ChevronLeft, ChevronRight, Logout} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {signOut} from "../../../../utils/utils";

const Sidebar = ({hasHeader, hasFooter, sx, children}) => {
    const {setIsAuth, setToken, setRoles} = useContext(AuthContext)
    const navigate = useNavigate()
    const theme = useTheme();
    const [isSidebarOpened, setIsSidebarOpened] = useState(false)
    const [isSignOutDialogOpened, setIsSignOutDialogOpened] = useState(false)
    const {roles} = useContext(AuthContext)
    const filteredTabs = TABS.filter(tab => roles.includes(tab.role))

    if (roles.length > 1) {
        filteredTabs.shift()
        filteredTabs.unshift({...TABS[0], tab: DEFAULT_TABS})
    }

    const handleSidebar = () => {
        setIsSidebarOpened(isSidebarOpened => !isSidebarOpened)
    }

    const handleSignOutDialog = () => {
        setIsSignOutDialogOpened(isSignOutDialogOpened => !isSignOutDialogOpened)
    }

    const handleSignOut = () => {
        signOut(navigate, setIsAuth, setToken, setRoles)
    }

    return (
        <Box sx={styles.sidebar}>
            <CssBaseline/>
            <styles.SidebarDrawer variant="permanent" open={isSidebarOpened}>
                {hasHeader && <styles.SidebarDrawerSpacer/>}
                <List sx={styles.list}>
                    <ListItem disablePadding sx={styles.listItem}>
                        <ListItemButton
                            onClick={handleSidebar}
                            sx={styles.listItemButtonCollapse(isSidebarOpened, theme)}
                        >
                            <ListItemIcon sx={styles.listItemIconCollapse(isSidebarOpened, theme)}>
                                {isSidebarOpened ? <ChevronLeft/> : <ChevronRight/>}
                            </ListItemIcon>
                            {isSidebarOpened && <ListItemText primary="Collapse"/>}
                        </ListItemButton>
                    </ListItem>
                </List>
                {filteredTabs.map(tabContent => (
                    <>
                        <Divider sx={styles.divider(isSidebarOpened)}>
                            {isSidebarOpened && <Chip label={tabContent.title}/>}
                        </Divider>
                        <List sx={styles.list}>
                            {tabContent.tab.map((listItem, index) => (
                                <ListItem key={index} disablePadding sx={styles.listItem}>
                                    <ListItemButton href={listItem.link} sx={styles.listItemButton(isSidebarOpened)}>
                                        <ListItemIcon sx={styles.listItemIcon(isSidebarOpened)}>
                                            {listItem.icon}
                                        </ListItemIcon>
                                        {isSidebarOpened && <ListItemText primary={listItem.title}/>}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ))}
                <List sx={styles.listSignOut}>
                    <ListItem disablePadding sx={styles.listItem}>
                        <ListItemButton
                            onClick={handleSignOutDialog}
                            sx={styles.listItemButtonSignOut(isSidebarOpened, theme)}
                        >
                            <ListItemIcon sx={styles.listItemIconSignOut(isSidebarOpened, theme)}>
                                <Logout/>
                            </ListItemIcon>
                            {isSidebarOpened && <ListItemText primary="Sign out"/>}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Dialog
                    open={isSignOutDialogOpened}
                    onClose={handleSignOutDialog}
                    TransitionComponent={Slide}
                >
                    <DialogTitle sx={styles.dialogTitle}>
                        Are you sure?
                    </DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions sx={styles.dialogActions}>
                        <Button onClick={handleSignOutDialog}>Cancel</Button>
                        <Button onClick={handleSignOut} autoFocus>Sign out</Button>
                    </DialogActions>
                </Dialog>
                {hasFooter && <styles.SidebarDrawerSpacer/>}
            </styles.SidebarDrawer>
            <Box component="main" padding="32px" overflow="auto" sx={sx}>
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;