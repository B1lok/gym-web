import {SIGNIN_ROUTE, MAIN_ROUTE, SIGNUP_ROUTE} from "../utils/constants";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";

export const unauthenticatedRoutes = [
    {path : MAIN_ROUTE, element: <Main/>},
    {path : SIGNIN_ROUTE, element: <SignIn/>},
    {path : SIGNUP_ROUTE, element: <SignUp/>}
]

export const userRoutes = [
    {path : MAIN_ROUTE, element: <Main/>},
]