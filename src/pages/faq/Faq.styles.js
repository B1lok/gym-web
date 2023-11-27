export const container = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    paddingTop: '32px',
    paddingBottom: '32px',
}

export const accordion = {
    '&.Mui-expanded': {
        borderRadius: '8px',
    }
}

export const accordionSummary = {
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}