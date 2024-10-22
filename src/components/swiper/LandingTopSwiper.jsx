import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { LandingTopSwiperData } from '../../utils/static-data';

const LandingTopSwiper = () => {

    // const progressCircle = useRef(null);
    // const progressContent = useRef(null);
    // const onAutoplayTimeLeft = (s, time, progress) => {
    //     progressCircle.current.style.setProperty('--progress', 1 - progress);
    //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    // };

    //! For Swiper Slider 
    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSlidesPerView(1);
            } else {
                setSlidesPerView(1);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Swiper
                spaceBetween={30} centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false, }}
                loop={true}
                slidesPerView={slidesPerView}
                navigation={true}
                keyboard={{ enabled: true }}
                modules={[Autoplay, Pagination, Navigation]}
                // onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {LandingTopSwiperData.map((item, index) => (
                    <div key={index}>
                        <SwiperSlide key={index}>
                            <div className='flex justify-center items-center h-[500px] max-md:h-[250px] max-lg:h-[350px] w-[100%] rounded-3xl'>
                                <img src={item.image} className='w-full h-full rounded-3xl' alt={`Slide ${index}`} />
                            </div>
                        </SwiperSlide>
                    </div>
                ))}

                {/* <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div> */}
            </Swiper>
        </>
    )
}

export default LandingTopSwiper;