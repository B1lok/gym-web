import React, {useState} from 'react';
import * as styles from './Faq.styles'
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import {FAQ_QUESTIONS} from "./constants";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import {ArrowForwardIos} from "@mui/icons-material";

const Faq = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <PageLayout hasHeader hasFooter>
            <Container sx={styles.container}>
                <Typography variant="h4" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                <Box>
                    {FAQ_QUESTIONS.map((question, index) => (
                        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleAccordion(`panel${index}`)}>
                            <AccordionSummary expandIcon={<ArrowForwardIos/>} sx={styles.acordionSummary}>
                                <Typography>{question.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{question.text}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </PageLayout>
    );
};

export default Faq;