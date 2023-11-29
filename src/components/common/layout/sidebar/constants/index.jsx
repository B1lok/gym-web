import {
    ADMIN_ROUTE_CUSTOMERS,
    ADMIN_ROUTE_STAFF,
    ADMIN_ROUTE_SUBSCRIPTIONS,
    COACH_ROUTE_RECORDS,
    PROFILE_ROUTE,
    PROFILE_ROUTE_SUBSCRIPTIONS
} from "../../../../../utils/constants";
import {CardMembership, Dashboard, Edit, Group, Groups, ManageAccounts, PendingActions} from "@mui/icons-material";

export const DEFAULT_TABS = [
    {title: 'Profile', link: PROFILE_ROUTE, icon: <ManageAccounts/>},
]

export const USER_TABS = [
    ...DEFAULT_TABS,
    {title: 'Subscriptions', link: PROFILE_ROUTE_SUBSCRIPTIONS, icon: <CardMembership/>},
]

export const COACH_TABS = [
    {title: 'Schedule', link: COACH_ROUTE_RECORDS, icon: <PendingActions/>},
]

export const ADMIN_TABS = [
    {title: 'Dashboard', link: ADMIN_ROUTE_SUBSCRIPTIONS, icon: <Dashboard/>},
    {title: 'Users', link: ADMIN_ROUTE_CUSTOMERS, icon: <Groups/>},
    {title: 'Staff', link: ADMIN_ROUTE_STAFF, icon: <Group/>},
    {title: 'Subscriptions', link: ADMIN_ROUTE_SUBSCRIPTIONS, icon: <Edit/>},
]

export const TABS = [
    {title: 'user', tab: USER_TABS, role: 'ROLE_USER'},
    {title: 'coach', tab: COACH_TABS, role: 'ROLE_COACH'},
    {title: 'admin', tab: ADMIN_TABS, role: 'ROLE_ADMIN'},
]