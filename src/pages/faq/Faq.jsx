import React, {useState} from 'react';
import * as styles from './Faq.styles'
import PageLayout from "../../components/common/layout/page-layout/PageLayout";
import {FAQ_QUESTIONS} from "./constants";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import {ArrowForwardIos} from "@mui/icons-material";

const Faq = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAccordion = (panel) => (event, isExpanded) => {
        setIsExpanded(isExpanded ? panel : false);
    }

    return (
        <PageLayout hasHeader hasFooter>
            <Container sx={styles.container}>
                <Typography variant="h4" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                <Box>
                    {FAQ_QUESTIONS.map((question, index) => (
                        <Accordion
                            key={index}
                            expanded={isExpanded === `panel${index}`}
                            onChange={handleAccordion(`panel${index}`)}
                            elevation={isExpanded === `panel${index}` ? 3 : 0}
                            sx={styles.accordion}
                        >
                            <AccordionSummary expandIcon={<ArrowForwardIos/>} sx={styles.accordionSummary}>
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