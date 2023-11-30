import {
    ADMIN_ROUTE_CUSTOMERS,
    ADMIN_ROUTE_DASHBOARD,
    ADMIN_ROUTE_STAFF,
    ADMIN_ROUTE_SUBSCRIPTIONS,
    COACH_ROUTE_RECORDS,
    COACHES_ROUTE,
    FAQ_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    PROFILE_ROUTE_SUBSCRIPTIONS,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE
} from "../utils/constants";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import Main from "../pages/main/Main";
import Faq from "../pages/faq/Faq";
import Coaches from "../pages/coaches/Coaches";
import MySubscriptions from "../pages/user/mySubscriptions/MySubscriptions";
import Records from "../pages/coach/records/Records";
import Customers from "../pages/admin/customers/Customers";
import Staff from "../pages/admin/staff/Staff";
import Subscriptions from "../pages/admin/subscriptions/Subscriptions";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Profile from "../pages/user/profile/Profile";

export const defaultRoutes = [
    {path: MAIN_ROUTE, element: <Main/>},
    {path: FAQ_ROUTE, element: <Faq/>},
    {path: COACHES_ROUTE, element: <Coaches/>},
]

export const authenticatedRoutes = [
    {path: PROFILE_ROUTE, element: <Profile/>},
]

export const unauthenticatedRoutes = [
    ...defaultRoutes,
    {path: SIGNIN_ROUTE, element: <SignIn/>},
    {path: SIGNUP_ROUTE, element: <SignUp/>},
]

export const userRoutes = [
    ...authenticatedRoutes,
    ...defaultRoutes,
    {path: PROFILE_ROUTE_SUBSCRIPTIONS, element: <MySubscriptions/>},
]

export const adminRoutes = [
    ...authenticatedRoutes,
    ...defaultRoutes,
    {path: ADMIN_ROUTE_CUSTOMERS, element: <Customers/>},
    {path: ADMIN_ROUTE_DASHBOARD, element: <Dashboard/>},
    {path: ADMIN_ROUTE_STAFF, element: <Staff/>},
    {path: ADMIN_ROUTE_SUBSCRIPTIONS, element: <Subscriptions/>},
]

export const coachRoutes = [
    ...authenticatedRoutes,
    ...defaultRoutes,
    {path: COACH_ROUTE_RECORDS, element: <Records/>},
]