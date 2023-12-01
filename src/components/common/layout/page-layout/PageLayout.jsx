import React from 'react';
import * as styles from './PageLayout.styles';
import Header from "../header/Header";
import Footer from "../footer/Footer";

const PageLayout = ({hasHeader, hasFooter, children}) => {
    return (
        <div style={styles.page}>
            {hasHeader &&
                <>
                    <nav style={styles.nav}></nav>
                    <div style={styles.header}><Header/></div>
                </>
            }
            <div style={styles.main}>
                {children}
            </div>
            {hasFooter &&
                <div style={styles.footer}><Footer/></div>
            }
        </div>
    );
};

export default PageLayout;