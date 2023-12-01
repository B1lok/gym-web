import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Info} from "@mui/icons-material";
import {COACH_BOX_IMAGE, COACH_GYM_IMAGE, COACH_POOL_IMAGE} from "../constants";

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
                    image={coach.specialization === 'GYM' ? COACH_GYM_IMAGE :
                        coach.specialization === 'BOX' ? COACH_BOX_IMAGE : COACH_POOL_IMAGE}
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