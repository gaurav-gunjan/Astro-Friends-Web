import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as BlogActions from "../../redux/actions/blogActions.js"
import { connect } from "react-redux";
import TopHeaderSection from '../../components/common/TopHeaderSection.jsx';
import moment from 'moment';
import { api_urls } from '../../utils/api-urls/index.js';


const Blog = ({ astroBlogData, dispatch }) => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);
    const navigate = useNavigate()

    useEffect(() => {
        console.log('sdfsdfsdf')
        dispatch(BlogActions.getAstroBlogs(''));
    }, [dispatch]);

    const onClick = (category) => {
        dispatch(BlogActions.getAstroBlogs(category));
    }

    const handleCardClick = (blogData) => {
        console.log("Handle Click ::: ", blogData);
        navigate('/blog/blog-details', {
            state: { astroBlogData: blogData },
        });
    }

    return (
        <>
            <TopHeaderSection title={'Blogs'} />

            <div className='flex max-md:flex-col min-[100vh] px-[80px] max-md:px-[20px]'>
                {/* <div className="min-w-[250px] border-r-2 flex flex-col max-md:flex-row max-md:flex-wrap gap-5 p-10 relative transition-all duration-1000 ease-linear">
                    <div className='cursor-pointer' onClick={() => onClick('')}>Home</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Health</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Success</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Marriage</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Life</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Financial</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Vastu</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Education</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Business</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Festival</div>
                    <div className='cursor-pointer' onClick={() => onClick('')}>Relationship</div>
                </div> */}

                <main className="flex justify-center flex-wrap gap-4 py-10 px-[30px]">
                    {astroBlogData && astroBlogData.map(data => (
                        <div key={data._id} className="flex-30">

                            <section
                                className="relative flex flex-col bg-white rounded-2xl max-w-[330px] max-md:w-[90vw] h-[350px] duration-300"
                                onClick={() => handleCardClick(data)}
                            >
                                <div className="max-w-sm h-full bg-white rounded-lg overflow-hidden shadow-lg mx-auto my-6">
                                    <div className="relative h-2/5">
                                        <img
                                            src={api_urls + 'uploads/' + data?.image}
                                            alt="Blog"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                                            {moment(data?.createdAt).format('DD MMM YYYY')} {moment(data?.createdAt).format('hh:mm A')}
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

                                        <p dangerouslySetInnerHTML={{ __html: data?.description }} className="text-gray-700 text-sm text-center line-clamp-2"></p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ))}
                </main>
            </div >
        </>
    );

}

const mapStateToProps = (state) => ({
    astroBlogData: state.blogreducer.astroBlogData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });



export default connect(mapStateToProps, mapDispatchToProps)(Blog);