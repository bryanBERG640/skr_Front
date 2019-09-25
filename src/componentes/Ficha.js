import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Datos from "./ficha.postulantes/Datos";
import Citas from "./ficha.postulantes/Citas";
import Entrevistas from "./ficha.postulantes/Entrevistas";
import Examenes from "./ficha.postulantes/Examenes";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 1 * 1 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class NavTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{ background: "#6D107D", alignContent: "center" }}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={this.handleChange}
            >
              <LinkTab label="Datos" href="page1" />
              <LinkTab label="Citas" href="page2" />
              <LinkTab label="Entrevistas" href="page3" />
              <LinkTab label="Examenes" href="page4" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <Datos />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <Citas></Citas>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <Entrevistas />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer>
              <Examenes />
            </TabContainer>
          )}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTabs);
