import React from 'react';
import {Box, Grid} from "@mui/material";
import StatBox from "./StatBox";
import {CreditCard, Person, Sell, SportsGymnastics} from "@mui/icons-material";

const Statistics = ({numberOfCustomers, numberOfCoaches, overallSubscriptionsSold, subscriptionSoldThisMonth}) => {

    return (
        <Grid container spacing={3} mt="20px">
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <Box
                    backgroundColor="#1F2A40"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                    width="100%"
                >
                    <StatBox
                        title={numberOfCustomers}
                        subtitle="Total number of customers"
                        icon={
                            <Person
                                sx={{color: "#3da58a", fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <Box
                    backgroundColor="#1F2A40"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                    width="100%"
                >
                    <StatBox
                        title={numberOfCoaches}
                        subtitle="Total number of coaches"
                        icon={
                            <SportsGymnastics
                                sx={{color: "#3da58a", fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <Box
                    backgroundColor="#1F2A40"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                    width="100%"
                >
                    <StatBox
                        title={overallSubscriptionsSold}
                        subtitle="Overall number of sold subscriptions"
                        icon={
                            <Sell
                                sx={{color: "#3da58a", fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <Box
                    backgroundColor="#1F2A40"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                    width="100%"
                >
                    <StatBox
                        title={subscriptionSoldThisMonth}
                        subtitle="Number of subscriptions sold this month"
                        icon={
                            <CreditCard
                                sx={{color: "#3da58a", fontSize: "26px"}}
                            />
                        }
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Statistics;