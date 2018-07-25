import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";

class MovieList extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.length === 0 && !this.props.loading ? (
          <p>No Result </p>
          ):(
            <Row>{this.props.movies.map(movie => <Movie movie={movie} key={movie.id}/>)}</Row>
          )
        }

      </div>
    );
  }
}

export default MovieList;

const Movie = props => {
  return (
    <Col xs="12" sm="6" lg="4">
      <Card>
        <a href="javascript:void(0)">
          <CardImg
            top
            width="100%"
            src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
            alt="{props.movie.title}"
          />
          <CardBody>
            <CardTitle>{props.movie.title}</CardTitle>
            <CardText>{props.movie.overview}</CardText>
          </CardBody>
        </a>
      </Card>
    </Col>
  );
};
