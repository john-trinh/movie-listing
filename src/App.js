import React, { Component } from "react";
import "./App.css";
import Loader from "react-loader-spinner";
import { Container, Button } from "reactstrap";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import Sorting from "./Components/Sorting";
import Paging from './Components/Paging';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp} from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
      moviesToShow: [],
      isLoading: true,
      sortValue:'',
      paging: {
        currentPage: 1,
        totalPage: ''
      }
    };
  }

  componentDidMount() {
    this.getData({page: this.state.paging.currentPage});
  }

  getData(params) {
    const url =
    `https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=${params.page}`;
    fetch(url).then(res => {
      if (res) {
        res.json().then(data => {
          let that = this;
          setTimeout(function() {
            that.setState({
              moviesData: data,
              moviesToShow: data.results,
              isLoading: false,
              paging: {
                currentPage: data.page,
                totalPage: data.total_pages
              }
            });
          }, 100000);
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
    } else {
      this.setState({
        moviesToShow: movieList
      });
    }
  }

  handleSort(value) {
    switch (value) {
      case ('a-to-z'): this.ascendingSort(value); break;
      case ('release-day'): this.releaseDateSort(value); break;
      case ('popularity'): this.popularitySort(value); break;
      default: break;
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
    movieList.sort((a, b) => (b.popularity - a.popularity));
    this.setState({
      sortValue: value,
      moviesToShow: movieList
    });
  }

  handleScrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  changePage(value) {
    this.setState({
      moviesData: [],
      moviesToShow: [],
      isLoading: true,
      sortValue: ''
    });

    if (value === 'next' && this.state.paging.currentPage < this.state.paging.totalPage ) {
      this.getData({page: this.state.paging.currentPage + 1});
    } else if (value === 'prev' && this.state.paging.currentPage > 1) {
      this.getData({page: this.state.paging.currentPage - 1});
    } else {
      this.getData({page: 1});
    }
  }

  render() {
    return (
      <div className="App">
        <Header searchText={this.handleSearch.bind(this)} />
        <div className="main-contain">
          <Container>
            {this.state.isLoading ? (
              <div className="loading">
                <Loader className="loading" type="TailSpin" color="#00BFFF" height="100" width="100"/>
              </div>
            ) : (
              <div className="movies-section">
                <div className="sort-compo">
                  <Sorting sortBy={this.handleSort.bind(this)} isReset={this.state.sortValue ? false : true}></Sorting>
                </div>
                <MovieList movies={this.state.moviesToShow} loading={this.state.isLoading}/>
                <Paging paging={this.state.paging} changePage={this.changePage.bind(this)}/>
              </div>
            )}
          </Container>
        </div>
        <div className="scroll-top">
          <Button color="primary" onClick={this.handleScrollTop.bind(this)}><FontAwesomeIcon icon={faArrowUp} /></Button>
        </div>
      </div>
    );
  }
}

export default App;
