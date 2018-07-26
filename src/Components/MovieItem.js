import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import { Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import MoviePosters from './MoviePosters';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  handleClick(id) {
    this.setState({showModal: true, movieId: id});
  }

  closeModal(status) {
    if(status) {
      this.setState({showModal: false});
    }
  }


  render() {
    const that = this;
    return (
      <Col xs="12" sm="6" lg="4">
        <Card>
          <a href="javascript:void(0)" onClick={() => that.handleClick(this.props.movie.id)}>
            <CardImg
              top
              width="100%"
              src={`https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}
              alt="{this.props.movie.title}"
            />
            <CardBody>
              <CardTitle>{this.props.movie.title}</CardTitle>
              <CardText>{this.props.movie.overview}</CardText>
            </CardBody>
          </a>
        </Card>
        {this.state.showModal ? <MoviePosters isOpenModal={true} id= {this.state.movieId} closedModal={this.closeModal.bind(this)}/> : null}
      </Col>
    );
  }
}
