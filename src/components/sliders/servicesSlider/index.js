import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bracelet from '../../../assets/images/cardMall/stone.png';
import havan from '../../../assets/images/slider/havan.png';
import havan2 from '../../../assets/images/slider/havan2.jpg';
import heart from '../../../assets/images/slider/heart.jpeg';
import ServiceCard from "../../cards/serviceCard";
import './astrologerSlider.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

class ServicesSlider extends Component {
  render() {
    // Example fake data
    const blogData = [
      {
        img: bracelet,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        name: "John Doe",
        time: "2 hours ago"
      },
      {
        img: bracelet,
        description: "Pellentesque habitant morbi tristique senectus et netus.",
        name: "Jane Smith",
        time: "1 day ago"
      },
      {
        img: bracelet,
        description: "Sed do eiusmod tempor incididunt ut labore et dolore.",
        name: "Alice Johnson",
        time: "3 days ago"
      },
      {
        img: bracelet,
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        name: "Bob Brown",
        time: "1 week ago"
      }
    ];


    return (
      <div className="relative">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .7s ease"
          transitionDuration={700}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          itemClass="carousel-item p-4"
          arrows={true}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {blogData?.map((blog, index) => (
            <div key={index} className="carousel-item p-2 flex flex-col">
              <ServiceCard
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="custom-arrow left-0 custome-bg text-white p-3 rounded-full z-50 shadow-md"
  >
    &#8592;
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="custom-arrow right-0 custome-bg text-white p-3 rounded-full z-50 shadow-md"
  >
    &#8594;
  </button>
);

export default ServicesSlider;