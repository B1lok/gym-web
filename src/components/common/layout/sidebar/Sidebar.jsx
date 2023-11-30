import React, {useContext, useState} from 'react';
import * as styles from './Sidebar.styles';
import {DEFAULT_TABS, TABS} from "./constants";
import {AuthContext} from "../../../../context/authContext";
import {
    Box,
    Chip,
    CssBaseline,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@mui/material";
import {ChevronLeft, ChevronRight} from '@mui/icons-material';

const Sidebar = ({hasHeader, hasFooter, sx, children}) => {
    const theme = useTheme();
    const [isSidebarOpened, setIsSidebarOpened] = useState(false)
    const {roles} = useContext(AuthContext)
    const filteredTabs = TABS.filter(tab => roles.includes(tab.role))

    if (roles.length > 1) {
        filteredTabs.shift()
        filteredTabs.unshift({...TABS[0], tab: DEFAULT_TABS})
    }

    const handleSidebar = () => {
        setIsSidebarOpened(isSidebarOpened => !isSidebarOpened)
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
                            <ListItemIcon
                                sx={styles.listItemIconCollapse(isSidebarOpened, theme)}
                            >
                                {isSidebarOpened ? <ChevronLeft/> : <ChevronRight/>}
                            </ListItemIcon>
                            <ListItemText primary="Collapse" sx={{opacity: isSidebarOpened ? 1 : 0}}/>
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
                                    <ListItemButton href={listItem.link} sx={styles.listItemButton}>
                                        <ListItemIcon sx={styles.listItemIcon}>
                                            {listItem.icon}
                                        </ListItemIcon>
                                        {isSidebarOpened && <ListItemText primary={listItem.title}/>}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ))}
                {hasFooter && <styles.SidebarDrawerSpacer/>}
            </styles.SidebarDrawer>
            <Box component="main" padding="32px" sx={sx}>
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;