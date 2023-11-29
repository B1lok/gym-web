import React, {useEffect, useState} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {Box} from "@mui/material";

const Chart = ({monthlyData}) => {

    function createData(time, amount) {
        return {time, amount};
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        if (monthlyData) {
            const newData = Object.entries(monthlyData).map(([month, amount]) => createData(month, amount));
            setData(newData);
        }
    }, [monthlyData]);
    return (
        <Box width="100%" mt="50px" height={300}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke="#333"
                        style={{fontFamily: 'Arial', fontSize: '12px'}}
                    />
                    <YAxis
                        stroke="#333"
                        style={{fontFamily: 'Arial', fontSize: '12px'}}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: '#555',
                                fontFamily: 'Arial',
                                fontSize: '18px',
                            }}
                        >
                            Subscription Sales
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke="#2196F3"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default Chart;