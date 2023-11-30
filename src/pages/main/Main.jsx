import React from 'react';
import * as styles from "./Main.styles"
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import {Button, Container, Typography} from "@mui/material";

const Main = () => {
    return (
        <PageLayout hasHeader hasFooter>
            <Container sx={styles.headerContainer}>
                <Typography variant="h3" mb={3} sx={{textAlign: 'center', color: 'white'}}>
                    WELCOME TO OUR GYM
                </Typography>
                <Typography variant="h5" mb={3} sx={{textAlign: 'center', color: 'white'}}>
                    Get ready to embark on a journey to a healthier you.
                </Typography>
                <Button variant="contained" sx={styles.locationButton} href="https://maps.app.goo.gl/S9F5k5C7TwsmJpNt7"
                        target="_blank">OUR LOCATION</Button>
            </Container>
            <Container sx={styles.containerAbout}>
                <Typography variant="h3" sx={{marginBottom: "20px"}}>ABOUT US</Typography>
                <Typography variant="body1" sx={{marginBottom: "10px"}}>
                    The gym, often regarded as a temple of physical transformation, is a
                    sanctuary where individuals embark on journeys to enhance their fitness, strength, and overall
                    well-being. This modern fitness haven offers a dynamic space for people of all ages and
                    backgrounds to pursue their health and fitness goals. Whether you're a seasoned athlete seeking
                    to push your limits, a novice looking to kickstart a healthier lifestyle, or simply someone in
                    search of stress relief, the gym provides a diverse array of equipment and resources to cater to
                    your needs. With its pulsating energy, motivating atmosphere, and a community of like-minded
                    individuals striving for personal improvement, the gym is not just a place to exercise; it's a
                    place where aspirations are realized, limits are pushed, and bodies and minds are
                    transformed.
                </Typography>
                <Typography variant="body1">
                    Beyond its physical benefits, the gym serves as a hub for social interaction and personal
                    growth. It's a place where friendships are forged through shared sweat and determination, where
                    individuals find solace and empowerment in their daily workouts. The gym is a testament to human
                    resilience and the pursuit of excellence, as it encourages individuals to break through
                    barriers, set and achieve goals, and develop the discipline required for a healthier, more
                    fulfilling life. As we step into this realm of self-improvement and self-discovery, the gym
                    becomes not just a destination, but an integral part of our journey towards a happier, healthier
                    future.
                </Typography>
            </Container>
        </PageLayout>
    );
};

export default Main;