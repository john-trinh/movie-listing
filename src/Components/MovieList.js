import React, { Component } from "react";
import { Row } from "reactstrap";
import MovieItem from './MovieItem';

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
            <Row>{this.props.movies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}</Row>
          )
        }

      </div>
    );
  }
}

export default MovieList;
