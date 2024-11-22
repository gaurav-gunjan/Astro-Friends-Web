import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { CallSvg, ChatSvg, FemaleSvg, MaleSvg } from '../../../assets/svg';
import * as AstrologyApiActions from '../../../redux/actions/astrologyApiAction';
import { KundliFormatDateTime } from '../../../utils/common-function';
import moment from 'moment';

const basicDatails = {
    "_id": "674031295b57ff572b1730f4",
    "customerId": "6735cf534359c21977a05642",
    "MaleName": "Gaurav",
    "Malegender": "Male",
    "MaletimeOfBirth": "2024-11-22T12:52:00.000Z",
    "MaledateOfBirth": "2024-11-22T12:52:00.000Z",
    "MaleplaceOfBirth": "Parkers Hotel, 109-113 Corporation St, Manchester M4 4DX, UK",
    "Malelatitude": 53.48839599999999,
    "Malelongitude": -2.239448,
    "FemaleName": "Gaurav",
    "Femalegender": "Female",
    "FemaletimeOfBirth": "2024-11-22T12:54:00.000Z",
    "FemaledateOfBirth": "2024-11-22T12:54:00.000Z",
    "FemaleplaceOfBirth": "R. Copacabana, 1024 - Floresta, Joinville - SC, 89211-388, Brazil",
    "Femalelatitude": -26.3327851,
    "Femalelongitude": -48.8581045,
    "timeZone": "5.5",
    "__v": 0
}

const Reports = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { kundliMatchingBirthDetailsData, kundliMatchingAstroDetailsData, kundliMatchingDashakootPointsDetailsData, kundliMatchingAshtakootPointsDetailsData, kundliMatchingManglikReportDetailsData } = useSelector(state => state?.astrologyApiReducer);

    useEffect(() => {
        const payload = {
            m_day: KundliFormatDateTime(basicDatails?.MaledateOfBirth)?.day,
            m_month: KundliFormatDateTime(basicDatails?.MaledateOfBirth)?.month,
            m_year: KundliFormatDateTime(basicDatails?.MaledateOfBirth)?.year,
            m_hour: KundliFormatDateTime(basicDatails?.MaledateOfBirth)?.hour,
            m_min: KundliFormatDateTime(basicDatails?.MaledateOfBirth)?.min,
            m_lat: basicDatails?.Malelatitude,
            m_lon: basicDatails?.Malelongitude,
            m_tzone: 5.5,

            f_day: KundliFormatDateTime(basicDatails?.FemaledateOfBirth)?.day,
            f_month: KundliFormatDateTime(basicDatails?.FemaledateOfBirth)?.month,
            f_year: KundliFormatDateTime(basicDatails?.FemaledateOfBirth)?.year,
            f_hour: KundliFormatDateTime(basicDatails?.FemaledateOfBirth)?.hour,
            f_min: KundliFormatDateTime(basicDatails?.FemaledateOfBirth)?.min,
            f_lat: basicDatails?.Femalelatitude,
            f_lon: basicDatails?.Femalelongitude,
            f_tzone: 5.5
        };

        dispatch(AstrologyApiActions?.getKundliMatchingBirthDetails(payload));
        dispatch(AstrologyApiActions?.getKundliMatchingAstroDetails(payload));
        dispatch(AstrologyApiActions?.getKundliMatchingAshtakootPointsDetails(payload));
        dispatch(AstrologyApiActions?.getKundliMatchingDashakootPointsDetails(payload));
        dispatch(AstrologyApiActions?.getKundliMatchingManglikReportDetails(payload));
    }, []);

    return (
        <>
            <TopHeaderSection title={'Kundli Matching Reports'} />

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <main className='flex items-center justify-center gap-5'>
                        <div className='border border-primary px-5 py-2 bg-orange-100 rounded-md'>{basicDatails?.MaleName}</div>
                        <div><img src='https://aws.astrotalk.com/assets/images/rings.webp' className='object-contain w-20' /></div>
                        <div className='border border-primary px-5 py-2 bg-orange-100 rounded-md'>{basicDatails?.FemaleName}</div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                        <div className='flex-1 border border-gray-300 rounded-md'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Basic Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Male</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Name</div>
                                <div className='basis-[65%]'>{basicDatails?.MaleName}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Date</div>
                                <div className='basis-[65%]'>{moment(basicDatails?.FemaledateOfBirth)?.format("DD MMM YYYY")}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Time</div>
                                <div className='basis-[65%]'>{moment(basicDatails?.FemaledateOfBirth)?.format('hh:mm A')}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Place</div>
                                <div className='basis-[65%]'>{basicDatails?.MaleplaceOfBirth}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Latitude</div>
                                <div className='basis-[65%]'>{kundliMatchingBirthDetailsData?.male_astro_details?.latitude?.toFixed(2)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Longitude</div>
                                <div className='basis-[65%]'>{kundliMatchingBirthDetailsData?.male_astro_details?.longitude?.toFixed(2)}</div>
                            </div>
                        </div>

                        <div className='flex-1 border border-gray-300 rounded-md'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Basic Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Female</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Name</div>
                                <div className='basis-[65%]'>{basicDatails?.FemaleName}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Date</div>
                                <div className='basis-[65%]'>{moment(basicDatails?.FemaledateOfBirth)?.format("DD MMM YYYY")}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Time</div>
                                <div className='basis-[65%]'>{moment(basicDatails?.FemaledateOfBirth)?.format('hh:mm A')}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Birth Place</div>
                                <div className='basis-[65%]'>{basicDatails?.FemaleplaceOfBirth}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Latitude</div>
                                <div className='basis-[65%]'>{kundliMatchingBirthDetailsData?.female_astro_details?.latitude?.toFixed(2)}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Longitude</div>
                                <div className='basis-[65%]'>{kundliMatchingBirthDetailsData?.female_astro_details?.longitude?.toFixed(2)}</div>
                            </div>
                        </div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                        <div className='flex-1 border border-gray-300 rounded-md'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Astro Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Male</div>
                            </div>

                            {kundliMatchingAstroDetailsData && Object?.keys(kundliMatchingAstroDetailsData?.male_astro_details)?.map((value, index) => (
                                <div key={index} className='flex items-center px-5 py-2 border-b'>
                                    <div className='basis-[35%] font-semibold capitalize'>{value}</div>
                                    <div className='basis-[65%]'>{kundliMatchingAstroDetailsData?.male_astro_details[value]}</div>
                                </div>
                            ))}
                        </div>

                        <div className='flex-1 border border-gray-300 rounded-md'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Astro Details</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Female</div>
                            </div>

                            {kundliMatchingAstroDetailsData && Object?.keys(kundliMatchingAstroDetailsData?.female_astro_details)?.map((value, index) => (
                                <div key={index} className='flex items-center px-5 py-2 border-b'>
                                    <div className='basis-[35%] font-semibold capitalize'>{value}</div>
                                    <div className='basis-[65%]'>{kundliMatchingAstroDetailsData?.female_astro_details[value]}</div>
                                </div>
                            ))}
                        </div>
                    </main>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] pt-[50px]'>
                <article>
                    <main className='flex max-md:flex-col justify-between gap-10 text-gray-800'>
                        <div className='flex-1 border border-gray-300 rounded-md pb-5'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <MaleSvg /></div>
                                <div className='text-lg'>Manglik Report</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Male</div>
                            </div>

                            <div className='px-5 py-2'>{kundliMatchingManglikReportDetailsData?.male?.manglik_report}</div>

                            <div className='flex items-center px-5 py-2 border-y'>
                                <div className='basis-[35%] font-semibold'>Manglik Status</div>
                                <div className='basis-[65%]'>{kundliMatchingManglikReportDetailsData?.female?.manglik_status}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Is Present</div>
                                <div className='basis-[65%]'>{kundliMatchingManglikReportDetailsData?.female?.is_present ? 'True' : 'False'}</div>
                            </div>

                            <div className='px-5 py-2 font-semibold'>Analysis : Based on aspect</div>
                            {kundliMatchingManglikReportDetailsData?.male?.manglik_present_rule?.based_on_aspect?.map((value, index) => (<div className='px-5 py-0.5'>{value}</div>))}

                            <div className='px-5 py-2 font-semibold'>Analysis : Based on house</div>
                            {kundliMatchingManglikReportDetailsData?.male?.manglik_present_rule?.based_on_house?.map((value, index) => (<div className='px-5 py-0.5'>{value}</div>))}
                        </div>

                        <div className='flex-1 border border-gray-300 rounded-md pb-5'>
                            <div className='bg-primary px-5 py-2 flex items-center gap-5 text-white rounded-t-md'>
                                <div> <FemaleSvg /></div>
                                <div className='text-lg'>Manglik Report</div>
                                <div className='bg-orange-300 text-white px-5 py-1 rounded-full '>Female</div>
                            </div>

                            <div className='px-5 py-2'>{kundliMatchingManglikReportDetailsData?.female?.manglik_report}</div>

                            <div className='flex items-center px-5 py-2 border-y'>
                                <div className='basis-[35%] font-semibold'>Manglik Status</div>
                                <div className='basis-[65%]'>{kundliMatchingManglikReportDetailsData?.female?.manglik_status}</div>
                            </div>

                            <div className='flex items-center px-5 py-2 border-b'>
                                <div className='basis-[35%] font-semibold'>Is Present</div>
                                <div className='basis-[65%]'>{kundliMatchingManglikReportDetailsData?.female?.is_present ? 'True' : 'False'}</div>
                            </div>

                            <div className='px-5 py-2 font-semibold'>Analysis : Based on aspect</div>
                            {kundliMatchingManglikReportDetailsData?.female?.manglik_present_rule?.based_on_aspect?.map((value, index) => (<div className='px-5 py-0.5'>{value}</div>))}

                            <div className='px-5 py-2 font-semibold'>Analysis : Based on house</div>
                            {kundliMatchingManglikReportDetailsData?.female?.manglik_present_rule?.based_on_house?.map((value, index) => (<div className='px-5 py-0.5'>{value}</div>))}
                        </div>
                    </main>

                    <div className='border border-gray-300 rounded-md px-5 py-1 mt-5 text-gray-800'><span className='font-semibold text-primary text-justify'>Conclusion : </span> {kundliMatchingManglikReportDetailsData?.conclusion?.report}</div>
                </article>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px]'>
                <article className='bg-orange-100 text-gray-800 rounded-md'>
                    <main className='flex-1 flex items-center justify-center flex-col gap-10 text-center px-10 max-lg:px-4 py-10'>
                        <div className='text-2xl max-lg:text-xl px-60 max-md:px-0 max-lg:px-40'>Connect with an Astrologer on Call or Chat for more personalised detailed predictions.</div>
                        <div className='flex gap-5'>
                            <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-primary transition-all duration-300 ease-in'>
                                <CallSvg /> <div>Talk To Astrologer</div>
                            </div>

                            <div onClick={() => navigate('/astrologer')} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-white hover:text-black hover:shadow-xl border-2 border-primary transition-all duration-300 ease-in'>
                                <ChatSvg /> <div>Chat With Astrologer</div>
                            </div>
                        </div>
                    </main>
                </article>
            </section>
        </>
    )
}

export default Reports;