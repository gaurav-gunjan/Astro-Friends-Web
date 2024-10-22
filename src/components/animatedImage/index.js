import React, { Component } from "react";
import scroll from "../../assets/images/wheel/wheel.png";
import Astromen from "../../assets/images/wheel/astromen.png";
import "./style.css";

class AnimatedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.imageRef = React.createRef();
    this.intersectionObserver = null;
  }

  componentDidMount() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setState({ isVisible: true });
          } else {
            this.setState({ isVisible: false });
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (this.imageRef.current) {
      this.intersectionObserver.observe(this.imageRef.current);
    }
  }

  componentWillUnmount() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div className="flex flex-col gap-2">
        <div
          ref={this.imageRef}
          className={`slide-up ${isVisible ? "animate" : ""} overflow-hidden`}
        >
          <img src={scroll} alt="Image" className="rotate-image" />
          <img src={Astromen} alt="Image" className="absolute top-5" />
        </div>
      </div>
    );
  }
}

export default AnimatedImage;