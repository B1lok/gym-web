import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {adminRoutes, coachRoutes, unauthenticatedRoutes, userRoutes} from "../router/routes";
import {MAIN_ROUTE} from "../utils/constants";
import {AuthContext} from "../context/authContext";

const AppRouter = () => {
    const {roles, isLoading} = useContext(AuthContext)

    if (isLoading) return null;

    const getRoutes = (routes) => (
        <Routes>
            <>
                {routes.map(route => (
                    <Route path={route.path} element={route.element} key={route.path}/>
                ))}
            </>
            <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
        </Routes>
    )

    let routes;

    if (roles.includes('ROLE_ADMIN')) {
        routes = adminRoutes;
    } else if (roles.includes('ROLE_COACH')) {
        routes = coachRoutes;
    } else if (roles.includes('ROLE_USER')) {
        routes = userRoutes;
    } else {
        routes = unauthenticatedRoutes;
    }

    return getRoutes(routes)
};

export default AppRouter;