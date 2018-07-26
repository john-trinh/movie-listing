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

  handleNextPage() {
    this.props.changePage('next');
  }

  handlePrevPage() {
    this.props.changePage('prev');
  }

  render() {
    return (
      <div className="paging-wrap">
        <Button
          color="success"
          disabled={this.props.paging.currentPage === 1 ? true: false}
          onClick={this.handlePrevPage.bind(this)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <span className="page-number">{this.props.paging.currentPage } of {this.props.paging.totalPage}</span>
        <Button
          color="success"
          onClick={this.handleNextPage.bind(this)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    )
  }
}
