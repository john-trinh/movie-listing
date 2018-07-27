import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../logo.svg";

export default class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }
  handleChange(value) {
    this.props.searchText(value);
  }

  render() {
    return (
      <div className="header">
        <Container>
          <Row>
            <Col xs="12" sm="6" xs="4">
              <a className="logo" href="/">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
            </Col>
            <Col xs="12" sm="6" xs="8">
              <div className="search-box">
                <input type="text" onChange={e => this.handleChange(e.target.value)} placeholder="Search..."/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
