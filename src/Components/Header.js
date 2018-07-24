import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../logo.svg";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </Col>
            <Col xs="12" sm="6">
              <input
                type="text"
                onChange={e => this.handleChange(e.target.value)}
              />
              <button>Search</button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
