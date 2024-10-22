import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api_urls } from "../../../utils/api-urls";
import moment from "moment";
import { useNavigate } from "react-router-dom";

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

const BlogSlider = ({ blogData }) => {
  const navigate = useNavigate()

  const handleCardClick = (blogData) => {
    console.log("Handle Click ::: ", blogData);
    navigate('/blog/blog-details', {
      state: { astroBlogData: blogData },
    });
  }

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
        {blogData?.map((data, index) => (
          <div key={index} className="carousel-item p-2 flex flex-col">
            <section onClick={()=>handleCardClick(data)} className="relative flex flex-col bg-white rounded-2xl max-w-[330px] max-md:w-[90vw] h-[350px] duration-300"
            >
              <div className="max-w-sm h-full bg-white rounded-lg overflow-hidden shadow-lg mx-auto my-6">
                <div className="relative h-2/5">
                  <img
                    src={api_urls + 'uploads/' + data?.image}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                    {moment(data?.createdAt).format('DD MMM YYYY')}
                  </div>
                </div>

                <div className="p-4 h-3/5 overflow-hidden">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <span className="mr-1">👤</span>
                      By - {data?.created_by}
                    </div>
                  </div>

                  <h3 className=" line-clamp-2 text-lg font-semibold mb-2 text-center text-orange-600">
                    {data?.title}
                  </h3>

                  <p
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                    className="text-gray-700 text-sm text-center line-clamp-2"
                  ></p>
                </div>
              </div>
            </section>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BlogSlider;