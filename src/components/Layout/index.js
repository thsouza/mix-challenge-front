import React, { Component, Fragment } from "react";
import { withStyles, Drawer, Divider, List, AppBar, Toolbar, IconButton, Hidden, ListItem, ListItemIcon, ListItemText, CssBaseline } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Footer from "../Footer";
import Logo from "../../assets/premix-logo.png";
import Trato from "../../pages/Trato";
import Confinamento from "../../pages/Confinamento";
import { logout, isAdmin } from "../../services/auth";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#1d4a81',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            paddingLeft: '250px'
        },        
    }
});

const menuList = [
    { 
        label: 'Trato', 
        page: <Trato></Trato>, 
        icon: <HomeWorkOutlinedIcon></HomeWorkOutlinedIcon>,
        access: '' 
    },
    { 
        label: 'Confinamento', 
        page: <Confinamento></Confinamento>, 
        icon: <ListAltOutlinedIcon></ListAltOutlinedIcon>,
        access: 'admin' 
    },
]

class Layout extends Component {
    state = {
        mobileOpen: false,
        page: <Trato></Trato>
    };
  
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    clickItem = (page) => {
        this.setState({ page: page });
    }

    clickSair = () => {
        logout();
        this.props.history.goBack();
    }

    render() {
        const { classes, theme } = this.props;
        const { mobileOpen, page } = this.state;
    
        const drawer = (
            <div>
                <Hidden smDown>
                    <div className={classes.toolbar} />
                </Hidden>
                <Divider />
                <List>
                    {menuList.map(item => (
                        (item.access === '' ? 
                            <ListItem button key={item.label} onClick={() => {this.clickItem(item.page)}}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                            :
                            isAdmin() && 
                            <ListItem button key={item.label} onClick={() => {this.clickItem(item.page)}}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        )
                    ))}
                </List>                
                <Divider />
                <List>
                    <ListItem button key="sair" onClick={this.clickSair}>
                        <ListItemIcon><ExitToAppOutlinedIcon></ExitToAppOutlinedIcon></ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItem>
                </List>
            </div>
        );
    
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="absolute" className={classes.appBar}>
                        <Toolbar>
                            <Hidden mdUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <img src={Logo} alt="Logo" height="50px" />
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        { page }                         
                        <Footer></Footer>                        
                    </main>                                                            
                </div>                       
            </Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Layout));