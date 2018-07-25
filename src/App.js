import React, { Component } from "react";
import "./App.css";
import Loader from "react-loader-spinner";
import { Container } from "reactstrap";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Sorting from "./Components/Sorting";
import moment from 'moment'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      moviesToShow: [],
      isLoading: true,
      sortValue:''
    };
  }

  componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed";
    fetch(url).then(res => {
      if (res) {
        res.json().then(data => {
          let that = this;
          setTimeout(function() {
            that.setState({
              moviesData: data,
              moviesToShow: data.results,
              isLoading: false
            });
          }, 500);
        });
      }
    });
  }

  handleSearch(value) {
    let movieList = this.state.moviesData.results.slice();

    if (value.trim().length !== 0) {
      movieList = movieList.filter(movie => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
      });
      this.setState({
        moviesToShow: movieList
      });
    } else if (this.state.sortValue) {
      this.handleSort(this.state.sortValue);
    }
  }

  handleSort(value) {
    switch (value) {
      case ('a-to-z'): this.ascendingSort(value); break;
      case ('release-day'): this.releaseDateSort(value); break;
      case ('popularity'): this.popularitySort(value); break;
    }
  }

  ascendingSort(value) {
    let movieList = this.state.moviesData.results.slice();
    movieList.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    this.setState({
      sortValue: value,
      moviesToShow: movieList
    });
  }

  releaseDateSort(value) {
    let movieList = this.state.moviesData.results.slice();
    movieList.sort((a, b) => {
      const timeA = moment(a.release_date);
      const timeB = moment(b.release_date);
      if (timeA.isAfter(timeB)) {
        return -1;
      } else {
        return 1;
      }
    });
    this.setState({
      sortValue: value,
      moviesToShow: movieList
    });
  }

  popularitySort(value) {
    let movieList = this.state.moviesData.results.slice();
    movieList.sort((a, b) => a.popularity - b.popularity);
    this.setState({
      sortValue: value,
      moviesToShow: movieList
    });
  }

  render() {
    return (
      <div className="App">
        <Header searchText={this.handleSearch.bind(this)} />
        <div className="main-contain">
          <Container>
            <div className="sort-compo">
              <Sorting sortBy={this.handleSort.bind(this)}></Sorting>
            </div>
            {this.state.isLoading ? (
              <div className="loading">
                <Loader className="loading" type="TailSpin" color="#00BFFF" height="100" width="100"/>
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
