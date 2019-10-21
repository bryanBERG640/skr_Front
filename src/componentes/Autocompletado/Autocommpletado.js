<<<<<<< HEAD
import React, { Component } from 'react';
import { connect } from 'react-redux';//Sirve para conectar las librerias de react y redux, se utiliza para cada componente que se quiera  dar acceso al store
import { changeValor } from '../../actions/postulanteB';
=======
import React, { Component } from "react";
import { getCliente } from "../../request/request";
import { connect } from "react-redux";
import { setCatalogo } from "../../actions/postulanteB";
>>>>>>> 6cecd87d1742565ca13f7095401fb58adfe8f0ee

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

<<<<<<< HEAD
    suggestionSelected(value) {
        this.props.dispatchChangeValor(value)//Se almacena en el store una funcion
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }
=======
  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }
>>>>>>> 6cecd87d1742565ca13f7095401fb58adfe8f0ee

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
        this.props.dispatchSetCatalogo(vari);
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
<<<<<<< HEAD
    dispatchChangeValor: value => dispatch(changeValor(value))
});

export default connect(null,mapDispatchProps)(Autompletado);
=======
  dispatchSetCatalogo: value => dispatch(setCatalogo(value))
});

export default connect(
  null,
  mapDispatchProps
)(Autompletado);
>>>>>>> 6cecd87d1742565ca13f7095401fb58adfe8f0ee
