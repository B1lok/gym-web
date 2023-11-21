import {MAIN_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE} from "../utils/constants";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";

export const defaultRoutes = [
    {path: MAIN_ROUTE, element: <Main/>},
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
]

export const coachRoutes = [
    ...defaultRoutes,
]