import React, { Component } from "react";
import { changeValor } from "../../actions/postulanteB";
import { getCliente } from "../../request/request";
import { connect } from "react-redux";
import { setCarreraID, setEscuelaID } from "../../actions/postulanteB";
import { setCliente } from "../../actions/postulanteB";

class Autompletado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valores: [],
      suggestions: [],
      text: this.props.valor
    };
  }

  onTextChanged = e => {
    const handleSelect = this.props.valores.map(perf => perf.descripcion);
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = handleSelect.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(cliente => (
          <li onClick={() => this.suggestionSelected(cliente)}>{cliente}</li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    const variable = this.props.valores.map(vari => {
      if (vari.id_carrera !== undefined) {
        if (vari.descripcion === text) {
          this.props.dispatchSetCarrera(vari);
          return vari;
        }
      }
      if (vari.id_escuela !== undefined) {
        if (vari.descripcion === text) {
          this.props.dispatchSetEscuela(vari);
          return vari;
        }
      }
      if (vari.id_cliente !== undefined) {
        if (vari.descripcion === text) {
          this.props.dispatchSetCliente(vari);
          return vari;
        }
      }
    });
    return (
      <div>
        <input
          className="form-control"
          type="text"
          value={text}
          onChange={this.onTextChanged}
        ></input>
        {this.renderSuggestions()}
      </div>
    );
  }
}
const mapDispatchProps = dispatch => ({
  dispatchSetCarrera: value => dispatch(setCarreraID(value)),
  dispatchSetEscuela: value => dispatch(setEscuelaID(value)),
  dispatchSetCliente: value => dispatch(setCliente(value))
});

export default connect(
  null,
  mapDispatchProps
)(Autompletado);
