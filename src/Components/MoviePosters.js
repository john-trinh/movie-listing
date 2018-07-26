import React, { Component } from "react";
import {Modal, ModalBody } from "reactstrap";
import Slider from "react-slick";

export default class MoviePosters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdropImg: []
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
    let response = await fetch(url);
    let result = await response.json();
    this.setState({
      backdropImg: result.backdrops
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
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '150px',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: false,
          }
        }
      ]
    };
    return (
      <div className="modal-wrap">
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          external={externalCloseBtn}>
          <ModalBody>
            <div className="slick-wrapper">
            <Slider {...settings}>
              {this.state.backdropImg.map(img => (
                <img src={`https://image.tmdb.org/t/p/original${img.file_path}`} key={img.file_path}/>
                )
              )}
            </Slider>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
