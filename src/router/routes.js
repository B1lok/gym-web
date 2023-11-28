import {
    ADMIN_ROUTE_CUSTOMERS,
    ADMIN_ROUTE_STAFF,
    COACH_ROUTE_RECORDS,
    COACHES_ROUTE,
    FAQ_ROUTE,
    MAIN_ROUTE,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE
} from "../utils/constants";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import Main from "../pages/main/Main";
import Faq from "../pages/faq/Faq";
import Coaches from "../pages/coaches/Coaches";
import Customers from "../pages/admin/customers/Customers";
import Records from "../pages/coach/records/Records";
import Staff from "../pages/admin/staff/Staff";
import Subscriptions from "../pages/Subscriptions";

export const defaultRoutes = [
    {path: MAIN_ROUTE, element: <Main/>},
    {path: FAQ_ROUTE, element: <Faq/>},
    {path: COACHES_ROUTE, element: <Coaches/>},
    {path: 'subscriptions', element: <Subscriptions/>},
]

export const unauthenticatedRoutes = [
    ...defaultRoutes,
    {path: SIGNIN_ROUTE, element: <SignIn/>},
    {path: SIGNUP_ROUTE, element: <SignUp/>}
]

export const userRoutes = [
    ...defaultRoutes,
]

export const adminRoutes = [
    ...defaultRoutes,
    {path: ADMIN_ROUTE_CUSTOMERS, element: <Customers/>},
    // {path: ADMIN_ROUTE_SUBSCRIPTIONS, element: <Subscriptions/>},
    {path: ADMIN_ROUTE_STAFF, element: <Staff/>},
]

export const coachRoutes = [
    ...defaultRoutes,
    {path: COACH_ROUTE_RECORDS, element: <Records/>},
]