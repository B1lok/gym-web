import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, coachRoutes, unauthenticatedRoutes, userRoutes} from "../router/routes";
import {ADMIN_ROUTE, MAIN_ROUTE} from "../utils/constants";
import {AuthContext} from "../context/authContext";

const AppRouter = () => {
    const {isAuth, roles, isLoading} = useContext(AuthContext)

    if (isLoading) return null;

    if (roles.includes('ROLE_ADMIN')) {
        return (
            <Routes>
                <>
                    {adminRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}

                    <Route path="*" element={<Navigate to={ADMIN_ROUTE}/>}/>
                </>
            </Routes>
        )
    } else if (roles.includes('ROLE_COACH')) {
        return (
            <Routes>
                <>
                    {coachRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        )
    } else if (roles.includes('ROLE_USER')) {
        return (
            <Routes>
                <>
                    {userRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <>
                    {unauthenticatedRoutes.map(route => <Route
                        key={route.path} element={route.element} path={route.path}/>)}
                </>
                <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
            </Routes>
        )
    }
};

export default AppRouter;