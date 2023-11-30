import React from 'react';
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import {Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

const Coaches = () => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <PageLayout hasHeader hasFooter>
            <Container sx={{py: 8}} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random?wallpapers"
                                />
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        Heading
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the
                                        content.
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent: 'center'}}>
                                    <Button size="small">View</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PageLayout>
    );
};

export default Coaches;