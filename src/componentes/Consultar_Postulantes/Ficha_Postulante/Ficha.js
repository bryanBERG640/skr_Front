//LIBRERIAS 
import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

//RUTAS
import Datos from "./Datos";
import Citas from "./Citas";
import Entrevistas from "./Entrevistas";
import Examenes from "./Examenes";






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
            style={{alignContent: "center"}}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={this.handleChange}
            >
              <LinkTab label="Datos" href="page1" style={{background:"#9e5aaa"}}/>
              <LinkTab label="Citas" href="page2" style={{background:"#6D107D"}}/>
              <LinkTab label="Entrevistas" href="page3" style={{background:"#9e5aaa"}}/>
              <LinkTab label="Examenes" href="page4"style={{background:"#6D107D"}} />
            </Tabs>
          </AppBar>
          {value === 0 && (<TabContainer><Datos /></TabContainer>)}
          {value === 1 && (<TabContainer><Citas></Citas></TabContainer>)}
          {value === 2 && (<TabContainer><Entrevistas /></TabContainer>)}
          {value === 3 && (<TabContainer><Examenes /></TabContainer>)}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTabs);
