import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { useMediaQuery } from "react-responsive";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PersistentDrawerRight from "./sid-drawer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: "#FFF",
    textDecoration: "none"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },

  appBarStyle: {
    background: "#262625 linear-gradient(to right bottom, #430089, #82ffa1)"
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,

  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};

function ElevateAppBar(props) {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });

  if (isTabletOrMobile) {
    return (
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar className={classes.appBarStyle}>
            <Toolbar>
              <Typography className={classes.title} color="inherit">
                SaaStack
              </Typography>
              <PersistentDrawerRight />
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar className={classes.appBarStyle}>
            <Toolbar>
              <Typography className={classes.title} color="inherit">
                SaaStack
              </Typography>
              <Tabs aria-label="simple tabs example">
                <Link className={classes.link} to="/Posts">
                  <Tab label="Posts" />
                </Link>

                <Link className={classes.link} to="/Images">
                  <Tab label="Images" />
                </Link>

                <Link className={classes.link} to="/To-do">
                  <Tab label="To-do" />
                </Link>
              </Tabs>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
      </React.Fragment>
    );
  }
}

export default ElevateAppBar;
