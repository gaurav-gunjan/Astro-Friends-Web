import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import TopHeaderSection from '../../../../components/common/TopHeaderSection';
import * as AstrologyApiActions from '../../../../redux/actions/astrologyApiAction';

const HoroscopeDetails = () => {
    const { zodiacSign } = useParams();
    const location = useLocation();
    const zodiacImage = location?.state?.zodiacImage;
    const dispatch = useDispatch();

    const { monthlyHoroscopeData } = useSelector(state => state?.astrologyApiReducer);

    useEffect(() => {
        dispatch(AstrologyApiActions.getMonthlyHoroscope(zodiacSign));
    }, []);

    return (
        <>
            <TopHeaderSection title={zodiacSign} />


            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article>
                    <div className="relative flex justify-center mb-[50px]">
                        <hr className="w-full" />
                        <div><img src={zodiacImage} alt="logo img" className="absolute h-10 -translate-y-1/2 bg-white px-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }} /></div>
                    </div>

                    <main className='flex flex-col gap-4 text-[15.5px] text-gray-800 text-justify '>
                        {monthlyHoroscopeData?.prediction?.map((value, index) => <div key={index}>{value}</div>)}
                    </main>
                </article>
            </section>
        </>
    )
}

export default HoroscopeDetails;