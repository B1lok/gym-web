import {LOGIN_ROUTE, MAIN_ROUTE, SIGNUP_ROUTE} from "../utils/constants";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";

export const unauthenticatedRoutes = [
    {path : MAIN_ROUTE, element: <Main/>},
    {path : LOGIN_ROUTE, element: <Login/>},
    {path : SIGNUP_ROUTE, element: <SignUp/>}
]

export const userRoutes = [
    {path : MAIN_ROUTE, element: <Main/>},
]