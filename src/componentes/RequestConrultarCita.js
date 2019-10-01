import React, { Component } from "react";
import { getCitas } from "../request/request";
import { connect } from "react-redux"

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          postulanteB: []
        };
      }
    componentDidMount = () => {
        getCitas().then(response => {
            let nuevoGet = [];
            nuevoGet.push(response)
            this.setState({ resp: nuevoGet })
        }).catch(console.log)
    }
    render() {
        return (
            <div></div>
        )
    }
}