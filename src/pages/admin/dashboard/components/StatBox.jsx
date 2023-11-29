import React from 'react';
import {Box, Typography} from "@mui/material";

const StatBox = ({title, subtitle, icon}) => {
    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{color: "#e0e0e0"}}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{color: "#4cceac"}}>
                    {subtitle}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{color: "#3da58a"}}
                >
                </Typography>
            </Box>
        </Box>
    );
};

export default StatBox;