import React from 'react'
import { Link } from 'react-router-dom';
import AppStore from '../../assets/images/footer/app-store.png';
import PlayStore from '../../assets/images/footer/google-play.png';
import { FacebookSvg, InstagramSvg, LinkedinSvg, PintrestSvg, TwitterSvg, YoutubeSvg } from '../../assets/svg';

const Footer = ({ scrollToSection }) => {
    return (
        <>
            <footer className='bg-primary text-white text-[13px] font-[400] px-[100px] max-lg:px-[20px] py-[50px] max-lg:py-[20px]'>
                <article className='flex flex-wrap justify-between gap-x-5 gap-y-10'>
                    <main className='max-lg:basis-[45%] flex flex-col gap-1'>
                        <div className='text-[17px] font-[500] mb-2'>Get Advice On</div>
                        <Link to='/astrologer'>New category</Link>
                        <Link to='/astrologer'>Maritial Life</Link>
                        <Link to='/astrologer'>Kids</Link>
                        <Link to='/astrologer'>Education</Link>
                        <Link to='/astrologer'>Finance & Business</Link>
                        <Link to='/astrologer'>Career & Job</Link>
                        <Link to='/astrologer'>Love & Relationship</Link>
                    </main>

                    <main className='max-lg:basis-[45%]  flex flex-col gap-5'>
                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Panchang</div>
                            <Link to='/astrologer'>Today's Panchang</Link>
                        </main>

                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Astrology</div>
                            <Link to='/astrologer'>Kundali Matching</Link>
                            <Link to='/astrologer'>Free Janam Kundali</Link>
                        </main>
                    </main>

                    <main className='max-lg:basis-[45%] flex flex-col gap-5'>
                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Horoscope</div>
                            <Link to='/astrologer'>Daily Horoscope</Link>
                            <Link to='/astrologer'>Weekly Horoscope</Link>
                            <Link to='/astrologer'>Yearly Horoscope</Link>
                        </main>

                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Astrologer Section</div>
                            <Link to='/astrologer'>Astrologer Login</Link>
                            <Link to='/astrologer'>Astrologer Registration</Link>
                        </main>
                    </main>

                    <main className='max-lg:basis-[45%] flex flex-col gap-5'>
                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Useful Links</div>
                            <Link to='/astrologer'>About Us</Link>
                            <Link to='/astrologer'>Contact Us</Link>
                            <Link to='/astrologer'>Blog</Link>
                        </main>

                        <main className='flex flex-col gap-1'>
                            <div className='text-[17px] font-[500] mb-2'>Policy</div>
                            <Link to='/astrologer'>Privacy Policy</Link>
                            <Link to='/astrologer'>Terms Of Use</Link>
                        </main>
                    </main>

                    <main className='max-lg:basis-[100%] flex flex-col gap-1.5'>
                        <div className='text-[17px] font-[500] mb-2'>Download Our Apps</div>
                        <img src={PlayStore} className='w-44 cursor-pointer max-lg:w-32' />
                        <img src={AppStore} className='w-44 cursor-pointer max-lg:w-32' />
                        <div className='flex gap-1.5 items-center mt-3'>
                            <div className='bg-[#007BB5] p-1.5 rounded-md'><FacebookSvg h={20} w={20} /></div>
                            <div className='bg-black p-1.5 rounded-md'><TwitterSvg h={20} w={20} /></div>
                            <div className='bg-[#007BB5] p-1.5 rounded-md to-blue-600'><LinkedinSvg h={20} w={20} /></div>
                            <div className=''><InstagramSvg /></div>
                            <div className=''><YoutubeSvg /></div>
                            <div className='bg-white p-1.5 rounded-md'><PintrestSvg h={20} w={20} /></div>
                        </div>
                    </main>
                </article>
            </footer>
        </>
    )
}

export default Footer;