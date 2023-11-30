import {Drawer, styled} from "@mui/material";

const sidebarDrawerWidth = 240;

const openedMixin = (theme) => ({
    width: sidebarDrawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

export const SidebarDrawerSpacer = styled('div')(
    ({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar and above footer
        ...theme.mixins.toolbar,
    }))

export const SidebarDrawer = styled(Drawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: sidebarDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

export const sidebar = {
    zIndex: 1,
    display: 'flex',
    maxWidth: '100%',
}

export const divider = (isSidebarOpened) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: '32px',
    transform: !isSidebarOpened ? 'translateY(-50%)' : 'none',
    borderColor: 'black',
    "&::before, &::after": {
        borderColor: "black",
    },
})

export const list = {}

export const listItem = {
    display: 'block',
}

export const listItemButton = (isSidebarOpened) => ({
    minHeight: 48,
    justifyContent: isSidebarOpened ? 'initial' : 'center',
})

export const listItemButtonCollapse = (isSidebarOpened, theme) => ({
    ...listItemButton(isSidebarOpened),
    color: theme.palette.info.main,
})

export const listItemIcon = (isSidebarOpened) => ({
    minWidth: 0,
    marginRight: isSidebarOpened ? 3 : 'auto',
    justifyContent: 'center',
})

export const listItemIconCollapse = (isSidebarOpened, theme) => ({
    ...listItemIcon(isSidebarOpened),
    color: theme.palette.info.main,
})