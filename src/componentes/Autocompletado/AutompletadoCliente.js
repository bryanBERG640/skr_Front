import React, { Component } from 'react';
import { getCliente } from "../../request/request";

class AutompletadoCliente extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientes: [],
            clientesAux: [],
            suggestions: [],
            text: '',
        }
    }

    componentWillMount = () => {
        this.getCliente();
    };
    getCliente = async () => {
        const nuevoGet = await getCliente();
        this.setState({ clientes: nuevoGet.data });
        console.log("_----" + this.state.clientes)
    };

    onTextChanged = (e) => {
        const handleSelect = this.state.clientes.map(perf =>
            perf.descripcion
        );
        console.log("handleSelect " + handleSelect)
        this.setState({ clientesAux: handleSelect })
        console.log("clientesAux " + this.state.clientesAux)

        const value = e.target.value;
        console.log(value)
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = handleSelect.sort().filter(v => regex.test(v));
            console.log("Regex " + regex)
            console.log("Suggestions: " + suggestions)
            console.log("Tamaño suggestion: " + suggestions.length)
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            console.log("El tamaño de suggestion es 0:")
            return null;
        }
        console.log("El tamaño de suggestion no es 0: " + suggestions.length)
        return (
            <ul>
                {suggestions.map((cliente) => <li onClick={() => this.suggestionSelected(cliente)}>{cliente}</li>)}
            </ul>
        )
    }

    render() {

        const { text } = this.state;
        return (
            <div>
                <input className="form-control" type="text" value={text} onChange={this.onTextChanged}></input>
                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutompletadoCliente;