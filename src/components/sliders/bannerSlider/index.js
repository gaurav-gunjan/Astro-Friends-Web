import React, { Component, lazy } from "react";
import banners from "../../../assets/images/backgroundImgs/banner.jpg";
import "./banner.css";

class BannerVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcomeAnimation: false
    };
    this.bannerRef = React.createRef();
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
            this.setState({ showWelcomeAnimation: true });
          } else {
            this.setState({ showWelcomeAnimation: false });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (this.bannerRef.current) {
      this.intersectionObserver.observe(this.bannerRef.current);
    }
  }

  componentWillUnmount() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  render() {
    const { showWelcomeAnimation } = this.state;

    return (
      <div className="relative stars" ref={this.bannerRef}>
        {/* <video className="w-full h-[600px] object-cover" src={bannerVideo} autoPlay muted loop /> */}
        <img loading="lazy" src={banners} className="object-cover w-full" />

        <div className={`absolute inset-0 flex flex-col items-center justify-center welcome-text ${showWelcomeAnimation ? "zoom-in" : ""}`}>
          <h1 className="text-white  text-2xl font-bold">Welcome to</h1>
          <h1 className="text-7xl text-white sorts-mill-goudy text-shadow-lg py-[5px] max-sm:text-4xl">
            AstroRemedy
          </h1>
          <h1 className="text-white text-2xl font-bold text-center">
            Your Launchpad to Limitless Possibilities!
          </h1>
        </div>
      </div>
    );
  }
}

export default BannerVideo;