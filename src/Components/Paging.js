import React, { Component } from 'react'
import {Button}  from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight  } from '@fortawesome/free-solid-svg-icons';

export default class Paging extends Component {

  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState ({
  //     currentPage: this.props.paging.currentPage,
  //     totalPage: this.props.paging.totalPage
  //   })
  // }

  render() {
    return (
      <div className="paging-wrap">
        <Button color="success" disabled={this.props.paging.currentPage === 1 ? true: false}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <span className="page-number">{this.props.paging.currentPage }/{this.props.paging.totalPage}</span>
        <Button color="success">
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    )
  }
}
