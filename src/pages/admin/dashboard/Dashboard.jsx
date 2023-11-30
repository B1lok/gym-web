import React, {useEffect, useState} from 'react';
import * as styles from './Dashboard.styles';
import Statistics from "./components/Statistics";
import Chart from "./components/Chart";
import {useFetching} from "../../../hooks/useFetching";
import AdminService from "../../../api/AdminService";
import PageLayout from "../../../components/common/layout/page-layout/PageLayout";
import Sidebar from "../../../components/common/layout/sidebar/Sidebar";

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
        <PageLayout hasHeader hasFooter>
            <Sidebar hasHeader hasFooter sx={styles.main}>
                <Statistics
                    numberOfCoaches={statistic.numberOfCoaches}
                    numberOfCustomers={statistic.numberOfCustomers}
                    overallSubscriptionsSold={statistic.overallSubscriptionsSold}
                    subscriptionSoldThisMonth={statistic.subscriptionSoldThisMonth}/>
                <Chart monthlyData={statistic.eachMonthStatistic}/>
            </Sidebar>
        </PageLayout>
    );
};

export default Dashboard;