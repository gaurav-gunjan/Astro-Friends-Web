import React from 'react';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { api_urls } from '../../utils/api-urls';

const ExpertAstrologerSwiper = ({ slidesPerView, navigation, pagination, data }) => {
    const navigate = useNavigate();

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
                        <div onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='flex justify-center items-center py-10 cursor-pointer'>
                            <div className='w-64 rounded-lg shadow-lg bg-gradient-to-r from-primary to-red-500 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105'>
                                <div className='w-full pt-2 px-3'>
                                    <ReactStars count={5} edit={false} value={Number(value?.rating)} size={20} color2={'#ffd700'} />
                                </div>

                                <div className='relative h-40 w-40 overflow-hidden group flex items-center justify-center bg-white rounded-full shadow-md mb-5'>
                                    <img src={api_urls + value?.profileImage} className='h-40 w-40 rounded-full border-4 border-white transition-transform duration-300 ease-in-out transform group-hover:scale-110' />
                                </div>

                                <div className='flex flex-col items-center gap-2 px-7 py-5 bg-white rounded-b-lg w-full text-orange-700'>
                                    <div className='text-primary_dark font-bold text-lg'>{value?.astrologerName}</div>
                                    <div className='text-sm text-gray-600'>Rating: {value?.rating}</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ExpertAstrologerSwiper;