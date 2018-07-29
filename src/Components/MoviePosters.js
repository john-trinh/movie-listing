import React, { Component } from "react";
import {Modal, ModalBody } from "reactstrap";
import Slider from "react-slick";
import Loader from "react-loader-spinner";

export default class MoviePosters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdropImg: [],
      isLoading: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const status = this.state.modal;
    this.setState({
      modal: !status
    });

    if (status) {
      this.props.closedModal(true);
    }
  }
  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/${this.props.id}/images?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed`;
    let imgResponse = await fetch(url);
    let imgResult = await imgResponse.json();
    let videoResponse = await fetch(videoUrl);
    let videoResult = await videoResponse.json();

    this.setState({
      backdropImg: imgResult.backdrops,
      trailer: videoResult.results[0].key,
      isLoading: false
    });
    this.toggle();
  }
  render() {
    const externalCloseBtn = (
      <button
        className="close"
        style={{position: "absolute", top: "15px", right: "15px", color: "#fff", fontSize:"30px", opacity: 1, zIndex: 2}}
        onClick={this.toggle}>
        &times;
      </button>
    );
    const settings = {
      dots:false,
      infinite: true,
      speed: 500,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '150px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: true,
            centerMode: false,
          }
        }
      ]
    };
    return (
      <div className="modal-wrap">
        {this.state.isLoading ? (
          <div className="loading">
            <Loader className="loading" type="TailSpin" color="#00BFFF" height="100" width="100"/>
          </div>
          ) : (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn} backdrop={'static'}>
              <ModalBody>
                <div className="slick-wrapper">
                  <Slider {...settings}>
                    <div className="trailer" >
                      <iframe src={`https://www.youtube.com/embed/${this.state.trailer}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    {this.state.backdropImg.map(img => (
                      <img src={`https://image.tmdb.org/t/p/original${img.file_path}`} key={img.file_path} alt={img.file_path}/>
                      )
                    )}
                  </Slider>
                </div>
              </ModalBody>
            </Modal>
          )
        }
      </div>
    );
  }
}
