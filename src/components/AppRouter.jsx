import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, unauthenticatedRoutes, userRoutes} from "../router/routes";
import {ADMIN_ROUTE, MAIN_ROUTE} from "../utils/constants";
import {AuthContext} from "../context/authContext";

const AppRouter = () => {
    const {isAuth, roles} = useContext(AuthContext)

    if (!isAuth) {
        return (
            <Routes>
                <>
                    {unauthenticatedRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        )
    } else if (roles.includes('ROLE_ADMIN')) {
        console.log(roles)
        console.log("TRUE")
        return (
            <Routes>
                <>
                    {adminRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={ADMIN_ROUTE}/>}/>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <>
                    {userRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        )
    }
};

export default AppRouter;