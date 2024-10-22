import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bracelet from '../../assets/images/slider/bracelet.jpeg';
import havan from '../../assets/images/slider/havan.png';
import havan2 from '../../assets/images/slider/havan2.jpg';
import heart from '../../assets/images/slider/heart.jpeg';
import './crousel.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1
  }
};

class MyCarousel extends Component {
  render() {
    return (
      <div className="relative">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item"
          arrows={true}
          renderButtonGroupOutside={true} // Ensure arrows are rendered outside
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          <div className="carousel-item p-2 flex flex-col ">
            <img src={bracelet} alt="bracelet" className="carousel-image w-full h-auto max-h-[200px]" />
            <h4 className="text-xl font-semibold px-2 py-2 text-[#313131]"> Tiger Eye Heart Pendant </h4>
          </div>
          <div className="carousel-item p-2 flex flex-col ">
            <img src={havan} alt="havan" className="carousel-image w-full h-auto max-h-[200px]" />
            <h4 className="text-xl font-semibold px-2 py-2 text-[#313131]"> Tiger Eye Heart Pendant </h4>
          </div>
          <div className="carousel-item p-2 flex flex-col ">
            <img src={havan2} alt="havan2" className="carousel-image w-full h-auto max-h-[200px]" />
            <h4 className="text-xl font-semibold px-2 py-2 text-[#313131]"> Tiger Eye Heart Pendant </h4>
          </div>
          <div className="carousel-item p-2 flex flex-col ">
            <img src={heart} alt="heart" className="carousel-image w-full h-auto max-h-[200px]" />
            <h4 className="text-xl font-semibold px-2 py-2 text-[#313131]"> Tiger Eye Heart Pendant </h4>
          </div>
        </Carousel>
      </div>
    );
  }
}

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full z-50"
    style={{ left: '-0px' }} // Adjusted left positioning
  >
    &#8592;
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-2 rounded-full z-50"
    style={{ right: '-0px' }} // Adjusted right positioning
  >
    &#8594;
  </button>
);

export default MyCarousel;
