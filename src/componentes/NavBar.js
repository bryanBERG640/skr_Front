import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import logo from '../Imagenes/logo.png'
import './styles/NavBarLogo.css'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
});

const options = [
    'Solicitud de Requerimiento',
    'Definicion de Perfil',
    'Reclutamiento y Selección',
    '____________________________',
    'Postulantes',
    'Citas',
    '____________________________',
    'Comparativo',
    'Métricas',
    'Riesgos'
  ];

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;   
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.handleClick} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <a className="Navbar__brand" href="/">
                <img className="Navbar_logo" src ={logo} alt= "Logo"/>
              </a>
            </Typography>
            <Menu id="long-menu" open={open} onClose={this.handleClose}>
            {options.map(option => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={this.handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
