import React, { Component } from "react";
import "./App.css";
import Loader from 'react-loader-spinner'
import { Container } from "reactstrap";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      moviesToShow: [],
      search: '',
      isLoading: false
    };
  }
  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed";
    fetch(url).then(res => {
      if (res) {
        res.json().then(data => {
          this.setState({
            moviesData: data,
            moviesToShow: data.results,
            isLoading: false
          });
        });
      }
    });
  }

  handleSearch(value) {
    let movieList = this.state.moviesData.results.slice();

    if (value.length) {
      movieList = movieList.filter(movie => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
      });
    }

    this.setState({
      moviesToShow: movieList
    });
  }

  render() {
    return (
      <div className="App">
        <Header searchText={this.handleSearch.bind(this)}/>
        <div className="main-contain">
          <Container>
            {this.state.isLoading ? (
              <div className="loading">
                <Loader className="loading" type="TailSpin" color="#00BFFF" height="100"	width="100"/>
              </div>
            ) : (
              <MovieList movies={this.state.moviesToShow} loading={this.state.isLoading}/>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
