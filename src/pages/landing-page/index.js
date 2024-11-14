import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingTopSwiper from '../../components/swiper/LandingTopSwiper.jsx';
import backgroundImage from '../../assets/images/landing-page/background-image.jpg';
import ExpertAstrologerSwiper from '../../components/swiper/ExpertAstrologerSwiper.jsx';
import * as BlogActions from "../../redux/actions/blogActions.js";
import * as AstrologerActions from "../../redux/actions/astrologerAction";
import * as EcommerceActions from "../../redux/actions/ecommerceActions";
import '../../assets/css/swiper.css';
import ProductSwipper from '../../components/swiper/ProductSwipper.jsx';
import BlogSwiper from '../../components/swiper/BlogSwiper.jsx';
import AstrologyVideoSwiper from '../../components/swiper/AstrologyVideoSwiper.jsx';
import { FreeAstrologyServiceData } from '../../utils/static-data/index.js';

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const { astroBlogData } = useSelector(state => state?.blogreducer);
    const { callIntakeDetailData } = useSelector(state => state?.chatReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);
    const { productCategoryData } = useSelector(state => state?.ecommerceReducer);
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);

    //! For Swiper Slider 
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) setSlidesPerView(1);
            else if (window.innerWidth <= 1000) setSlidesPerView(2);
            else setSlidesPerView(4);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //! Dispatching API for Get Blogs
        dispatch(BlogActions.getAstroBlogs(''));

        //! Dispatching API for Get Astrologers
        dispatch(AstrologerActions.getAstrologer());

        //! Dispatching API for Get Categories
        dispatch(EcommerceActions.getProductCategory());
    }, [dispatch]);

    return (
        <section className='bg-landing-page min-h-full min-w-full bg-fixed' style={{ backgroundImage: `url(${backgroundImage})` }}>
            {callIntakeDetailData?.visible && <div onClick={() => navigate(`chat/intake-details/${callIntakeDetailData?.profileId}`)} className='p-5 py-2 right-[50px] bottom-[50px] bg-primary fixed z-[1000] cursor-pointer rounded-md text-white'>Intake Detail</div>}

            <section className='px-3 bg-white'>
                <article>
                    <div className='h-[84px] max-lg:h-[60px]'></div>
                    <LandingTopSwiper />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>Free Astrology Services</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>

                    <main className='flex flex-wrap gap-x-[20px] gap-y-[40px] justify-evenly max-lg:justify-center text-[13px] font-semibold'>
                        {FreeAstrologyServiceData?.map((value, index) => (
                            <div onClick={() => navigate('/astrologer')} key={index} className='flex flex-col items-center gap-2 group/item'>
                                <div className='relative border border-orange-700 p-2 rounded-full'>
                                    <div className='z-10 absolute inset-0 border-t-[2px] border-dashed border-primary rounded-full group-hover/item:rotate-180 transition-all duration-500 ease-out'></div>
                                    <img className='h-[50px] w-[50px] object-contain' src={value?.image} />
                                </div>

                                <div className='text-orange-700'>{value?.title}</div>
                            </div>
                        ))}
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10 text-white'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>Meet Our Expert Astrologers</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                        <div className='text-sm'>Reach out to premier online astrologers anytime, from & anywhere!</div>
                    </div>

                    <ExpertAstrologerSwiper data={astrologerData?.astrologer} slidesPerView={slidesPerView} navigation={false} pagination={false} />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>Engaging Astrology Videos</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>

                    <AstrologyVideoSwiper data={astroBlogData} slidesPerView={slidesPerView} navigation={true} pagination={false} />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10 text-white'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>Cosmic Gems & Astrology Essentials</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                        <div className='text-sm'>Explore new products and discover how Astrofriends guided them to happiness!</div>
                    </div>

                    <ProductSwipper data={productCategoryData} slidesPerView={slidesPerView} navigation={false} pagination={false} />
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-primary'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10 text-white'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>As Seen On</div>
                        <div className='w-[150px] h-[3px] bg-white'></div>
                    </div>

                    <main className='flex items-center justify-center gap-5'>
                        <div className='w-[180px] h-[100px] p-3 bg-white rounded-lg'><img className='w-full h-full' src='https://astrofriends.in/public/storage/images/bannerImage_1017257351461725735146.png' /></div>
                        <div className='w-[180px] h-[100px] p-3 bg-white rounded-lg'><img className='w-full h-full' src='https://astrofriends.in/public/storage/images/bannerImage_1017257351461725735146.png' /></div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-[30px] font-[600] tracking-tight uppercase'>Our Blog</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                        <div className='text-sm'>Delve deeper into the world of Astrology, Psychic Reading & more with insightful articles and latest updates.</div>
                    </div>

                    <BlogSwiper data={astroBlogData} slidesPerView={slidesPerView} navigation={true} pagination={false} />
                </article>
            </section>
        </section>
    )
}

export default LandingPage;