export const headerContainer = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/img/gym-entry.jpg)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
};

export const locationButton = {
    backgroundColor: 'transparent',
    border: '2px solid white',
    color: 'white',
    fontWeight: 'medium',
    fontSize: '1.25rem',
    margin: '0.5rem',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    transition: 'background-color 0.3s',

    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white'
    },
}
export const containerAbout = {
    backgroundColor: '#F0F8FF',
    marginTop: '20px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
}