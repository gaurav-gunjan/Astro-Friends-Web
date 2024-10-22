import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bracelet from '../../../assets/images/slider/bracelet.jpeg';
import havan from '../../../assets/images/slider/havan.png';
import havan2 from '../../../assets/images/slider/havan2.jpg';
import heart from '../../../assets/images/slider/heart.jpeg';
import Chandan from '../../../assets/images/testimonials-image/chandan.jpg';
import Manoj from '../../../assets/images/testimonials-image/manoj.jpg';
import Rahul from '../../../assets/images/testimonials-image/rahul.jpg';
import Suman from '../../../assets/images/testimonials-image/suman.jpeg';
import Muskan from '../../../assets/images/testimonials-image/muskan.jpeg';
import Tanisha from '../../../assets/images/testimonials-image/tanisha.jpeg';
import Darpan from '../../../assets/images/testimonials-image/darpan.jpeg';
import Sahil from '../../../assets/images/testimonials-image/sahil.jpeg';

import TestimonialsCards from "../../cards/testimonials";
import './TestimonialSliders.css';  // Custom CSS for modern styling

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

class TestimonialSliders extends Component {
  render() {
    const blogData = [
      {
        img: Chandan, // Replace with the actual image import or URL
        description: "AstroRemedy transformed my life! I was lost, but the guidance I received here helped me find clarity. The astrologer's insights were spot-on, and I feel more aligned with my true self.",
        name: 'Chandan'
      },
      {
        img: Manoj, // Replace with the actual image import or URL
        description: "A true cosmic experience! The birth chart reading was incredibly accurate. I now understand myself and my relationships better. Highly recommend!",
        name: 'Manoj'
      },
      {
        img: Suman, // Replace with the actual image import or URL
        description: "AstroRemedy brought me peace. During a tough time, the remedies I received restored my emotional balance. The stars really do have answers.",
        name: 'Suman'
      },
      {
        img: Rahul, // Replace with the actual image import or URL
        description: "Insightful and empowering! I found clarity in my career path through their consultations. Their astrological advice is deeply insightful and practical.",
        name: 'Rahul'
      },
      {
        img: Muskan, // Replace with the actual image import or URL
        description: "A guiding light in my journey. The personalized astrology readings were life-changing. AstroRemedy helped me find direction and purpose.",
        name: 'Muskan'
      },
      {
        img: Darpan, // Replace with the actual image import or URL
        description: "AstroRemedy is a gem! The insights from my consultation were profound and meaningful. It helped me make important decisions with confidence.",
        name: 'Darpan'
      },
      {
        img: Sahil, // Replace with the actual image import or URL
        description: "A powerful tool for self-discovery! The astrologer’s guidance gave me clarity about my strengths and challenges. I feel empowered to navigate my life better.",
        name: 'Sahil'
      },
      {
        img: Tanisha, // Replace with the actual image import or URL
        description: "Life-changing astrology readings! The advice on my relationships was incredibly accurate and insightful. I now communicate better with my loved ones.",
        name: "Tanisha",
      },
      // {
      //   img: bracelet, // Replace with the actual image import or URL
      //   description: "AstroRemedy guided my career transition. I was unsure about changing my career path, but their astrological insights provided the clarity I needed.",
      //   name: "Neha P., HR Manager",
      // },
      // {
      //   img: havan2, // Replace with the actual image import or URL
      //   description: "Invaluable support during tough times. The remedies offered helped me restore balance and positivity in my life. I’m grateful for their wisdom.",
      //   name: "Suresh D., Business Owner",
      // },
    ];

    return (
      <div className="testimonial-slider relative bg-lightGray py-8">
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
          {blogData.map((blog, index) => (
            <div key={index} className="carousel-item flex flex-col items-center bg-white  p-6">
              <TestimonialsCards
                img={blog.img}
                description={blog.description}
                name={blog.name}
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

export default TestimonialSliders;