import React, { Component } from "react";
import { withStyles, Typography, Link } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const styles = theme => ({
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#1d4a81',
        color: 'white',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            paddingLeft: '250px'
        },
    },
});

class Footer extends Component {

    render() {
        const { classes } = this.props;

        return(                      
            <div className={classes.footer}>
                <Typography variant="subtitle2">Criado por: Thiago Souza</Typography>                
                <Typography variant="subtitle2">
                    Github: <Link href="https://github.com/thsouza/" target="_blank" color="secondary" rel="noopener noreferrer">https://github.com/thsouza</Link>
                    &nbsp; 
                    LinkedIn: <Link href="https://www.linkedin.com/in/souzathiago82/" target="_blank" color="secondary" rel="noopener noreferrer">https://www.linkedin.com/in/souzathiago82</Link>
                </Typography>
            </div>              
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Footer));