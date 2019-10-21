import React, { Component } from "react";
import { getCliente } from "../../request/request";
import { connect } from "react-redux";
import { setCliente } from "../../actions/postulanteB";

class Autompletado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valores: [],
      suggestions: [],
      text: ""
    };
  }

  onTextChanged = e => {
    const handleSelect = this.props.valores.map(perf => perf.descripcion);
    const value = e.target.value;
    //console.log(value)
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = handleSelect.sort().filter(v => regex.test(v));
      // console.log("Regex " + regex)
      // console.log("Suggestions: " + suggestions)
      // console.log("Tamaño suggestion: " + suggestions.length)
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
      //console.log("El tamaño de suggestion es 0:")
      return null;
    }
    //console.log("El tamaño de suggestion no es 0: " + suggestions.length)
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
      if (vari.descripcion === text) {
        this.props.dispatchSetCliente(vari);
        return vari;
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
  dispatchSetCliente: value => dispatch(setCliente(value))
});

export default connect(
  null,
  mapDispatchProps
)(Autompletado);
