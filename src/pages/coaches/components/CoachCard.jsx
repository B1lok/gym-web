import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Info} from "@mui/icons-material";

const CoachCard = ({coach, setSelectedCoach, setCoachDialog}) => {
    return (
        <Grid item key={coach} xs={12} sm={6} md={4}>
            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={coach.specialization === 'GYM' ? "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGd5bXxlbnwwfHwwfHx8MA%3D%3D" :
                        coach.specialization === 'SWIMMING_POOL' ? "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :
                            "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"}
                />
                <CardContent sx={{flexGrow: 1,}}>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                        {coach.specialization === 'GYM' ? "Gym coach" :
                            coach.specialization === 'SWIMMING_POOL' ? "Swimming coach" : "Box coach"
                        }
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6" align="center">
                        {`${coach.coachFirstName} ${coach.coachLastName}`}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <Button onClick={() => {
                        setSelectedCoach(coach)
                        setCoachDialog(true)
                    }}
                            variant="contained"
                            sx={{
                                backgroundColor: '#ffc107',
                                borderRadius: '20px',
                                color: 'white',
                                '&:hover': {backgroundColor: '#ff8f00'}
                            }}
                    >Information<Info/>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CoachCard;