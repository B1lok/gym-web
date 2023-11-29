import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import Statistics from "./components/Statistics";
import Chart from "./components/Chart";
import {useFetching} from "../../../hooks/useFetching";
import AdminService from "../../../api/AdminService";

const Dashboard = () => {
    const [statistic, setStatistic] = useState({})
    const [fetchStatistic, isStatisticLoading, statisticError] = useFetching(async () => {
        const response = await AdminService.getStatistic();
        setStatistic(response.data)
    })

    useEffect(() => {
        fetchStatistic()
    }, []);

    return (
        <Box m="20px" alignItems="center" justifyContent="center">
            <Statistics numberOfCoaches={statistic.numberOfCoaches}
                        numberOfCustomers={statistic.numberOfCustomers}
                        overallSubscriptionsSold={statistic.overallSubscriptionsSold}
                        subscriptionSoldThisMonth={statistic.subscriptionSoldThisMonth}/>
            <Chart monthlyData={statistic.eachMonthStatistic}/>
        </Box>
    );
};

export default Dashboard;