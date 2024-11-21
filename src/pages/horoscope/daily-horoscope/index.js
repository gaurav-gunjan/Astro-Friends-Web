import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import * as AstrologyApiActions from '../../../redux/actions/astrologyApiAction';

const rashiName = [
    { title: 'Pisces', image: 'https://astroway.diploy.in/public/storage/images/sign_131721123972.png' },
    { title: 'Aquarius', image: 'https://astroway.diploy.in/public/storage/images/sign_121721123984.png' },
    { title: 'Capricorn', image: 'https://astroway.diploy.in/public/storage/images/sign_111709054311.png' },
    { title: 'Sagittarius', image: 'https://astroway.diploy.in/public/storage/images/sign_101709054525.png' },
    { title: 'Scorpio', image: 'https://astroway.diploy.in/public/storage/images/sign_91709054532.png' },
    { title: 'Libra', image: 'https://astroway.diploy.in/public/storage/images/sign_81709054538.png' },
    { title: 'Virgo', image: 'https://astroway.diploy.in/public/storage/images/sign_71709054546.png' },
    { title: 'Leo', image: 'https://astroway.diploy.in/public/storage/images/sign_61709054553.png' },
    { title: 'Cancer', image: 'https://astroway.diploy.in/public/storage/images/sign_51709054580.png' },
    { title: 'Gemini', image: 'https://astroway.diploy.in/public/storage/images/sign_41709054632.png' },
    { title: 'Taurus', image: 'https://astroway.diploy.in/public/storage/images/sign_31709054640.png' },
    { title: 'Aries', image: 'https://astroway.diploy.in/public/storage/images/sign_11709054648.png' },
];

const DailyHoroscope = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dailyHoroscopeData } = useSelector(state => state?.astrologyApiReducer);

    useEffect(() => {
        dispatch(AstrologyApiActions.getDailyHoroscope('gemini'));
    }, []);

    return (
        <>
            <TopHeaderSection title={'Horoscope'} />

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Today’s Horoscope</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>
                    <div className='text-center'>Confused about how your day would turn out to be? Find out if today is the day to make big decisions. Read your Daily Horoscope forecast and get insights regarding different aspects of your life to plan your day better.</div>

                    <main className='py-[50px] flex flex-wrap justify-between items-center gap-5'>
                        {rashiName?.map((value, index) => (
                            <div key={index} className='xl:basis-[15%] max-lg:basis-[20%] max-md:basis-[30%] flex flex-col gap-3 items-center justify-center border px-5 py-4 rounded-lg shadow-xl'>
                                <img src={value?.image} className='w-28 h-28' />
                                <div className='font-semibold text-primary'>{value?.title}</div>
                            </div>
                        ))}
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article className='font-[400] text-[15.5px] text-gray-800'>
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='text-3xl font-bold text-black uppercase text-center'>Why Should You Check Your Horoscope Daily?</div>
                        <div className='w-[150px] h-[3px] bg-primary'></div>
                    </div>

                    <main className='flex flex-col gap-4 text-justify'>
                        <div>If today is the right day for new beginnings? Or if this day will have opportunities or challenges in store?</div>
                        <div>Every day is like a new page in the book of our life. While some days are for hustle, on some days all you need to do is take a back seat and let situations reveal their outcome. What if there is a way from which you can get clarity about your day ahead and know what needs to be done. The daily Horoscope of an individual is a prediction about what different situations in your life such as regarding career, health, relationship, etc. are going to be like.</div>
                        <div>The position of celestial bodies like the Sun, the Moon, and planets change frequently and they often enter into new Houses and Zodiac signs leaving the former ones. With this movement, the life situations of an individual also get affected.</div>
                        <div>Daily Horoscope is created by deeply analyzing the position and effect of the celestial bodies on a particular day and how it affects different aspects of the life of an individual.</div>
                        <div>Your Daily Horoscope can help you decipher upcoming challenges and reveal opportunities coming towards you. You get better clarity about the roadblocks that are restricting you to get peace of mind and success. These predictions give you greater confidence about your day ahead and help you steer your life in the right direction by making the right decisions.</div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article className='flex justify-between items-center bg-primary text-white'>
                    <main className='flex-1 flex items-center justify-center flex-col gap-5 max-lg:gap-2 text-center px-10 max-lg:px-4 py-4'>
                        <div className='text-3xl max-lg:text-xl'>WILL YOU BE RICH AND SUCCESSFUL IN FUTURE?</div>
                        <div>Know what’s written in your stars!</div>
                        <div className='cursor-pointer bg-red-900 flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-red-900 transition-all duration-300 ease-in'>Ask An Astrologer Now</div>
                    </main>
                    <img src='https://astroway.diploy.in/public/frontend/astrowaycdn/astroway/web/content/images/ads/success-future.png' className='pr-10 py-4 h-72 max-lg:h-60 max-md:h-52' />
                </article>
            </section>
        </>
    )
}

export default DailyHoroscope;