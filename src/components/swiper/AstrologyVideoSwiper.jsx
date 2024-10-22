import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { api_urls } from '../../utils/api-urls';

const AstrologyVideoSwiper = ({ slidesPerView, navigation, pagination, data }) => {
    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                grid={{ rows: 1, }}
                spaceBetween={30}
                autoplay={{ delay: 3000, disableOnInteraction: false, }}
                loop={true}
                // centeredSlides={true}
                keyboard={{ enabled: true }}
                className="mySwiper"
                pagination={pagination && { clickable: true }}
                navigation={navigation ? true : false}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data?.map((value, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col justify-center items-center gap-3 border border-blue-600 pb-4 rounded-lg'>
                            <img src={api_urls + 'uploads/' + value?.image} className='h-40 w-full rounded-t-lg' />
                            {/* <video poster={api_urls + 'uploads/' + value?.image} muted className='w-full h-full max-h-40 min-h-40' ><source src='https://www.youtube.com/watch?v=6Tlw-pYE35c' type="video/mp4"></source></video> */}

                            <h3 className="line-clamp-1 px-5 text-[15px] font-semibold text-center text-blue-600">{value?.title}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AstrologyVideoSwiper;