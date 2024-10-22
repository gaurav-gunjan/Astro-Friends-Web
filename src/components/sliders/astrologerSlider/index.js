import React, { Component, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AstrologerCard from "../../cards/astrologerCard";
import bracelet from '../../../assets/images/slider/bracelet.jpeg';
import havan from '../../../assets/images/slider/havan.png';
import havan2 from '../../../assets/images/slider/havan2.jpg';
import heart from '../../../assets/images/slider/heart.jpeg';
import { useDispatch, useSelector } from "react-redux";
import * as AstrologerActions from '../../../redux/actions/astrologerAction';
import './astrologers.css';

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



const AstroSlider = () => {
  const dispatch = useDispatch();
  const { astrologerData } = useSelector(state => state?.astrologerReducer);

  useEffect(() => {
    //! Dispatching API For Getting Astrologer 
    dispatch(AstrologerActions.getAstrologer());
  }, []);

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
        {astrologerData && Object.keys(astrologerData)?.length > 0 && astrologerData?.astrologer?.map((value, index) => (
          <div key={index} className="carousel-item m-1">
            <AstrologerCard data={value} />
          </div>
        ))}
      </Carousel>
    </div>
  );
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
export default AstroSlider;