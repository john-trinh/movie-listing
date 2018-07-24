import React, { Component } from "react";
import "./App.css";
import Loader from 'react-loader-spinner'
// import MovieListJS from './MovieList.json';
import { Container } from "reactstrap";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed";
    fetch(url).then(res => {
      console.log("res", res);
      if (res) {
        res.json().then(data => {
          this.setState({
            movies: data
          });
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-contain">
          <Container>

            {this.state.movies.length === 0 ? (
              <div className="loading">
                <Loader className="loading" type="TailSpin" color="#00BFFF" height="100"	width="100"/>
              </div>
            ) : (
              <MovieList movies={this.state.movies} />
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
