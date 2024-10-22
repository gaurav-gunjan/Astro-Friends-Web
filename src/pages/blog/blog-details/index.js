import moment from "moment";
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api_urls } from '../../../utils/api-urls/index.js';
import TopHeaderSection from '../../../components/common/TopHeaderSection.jsx';

const BlogDetails = () => {
    const location = useLocation();
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 600) }, [pathname]);
    const product = location.state && location.state.astroBlogData;

    return (
        <>
            <TopHeaderSection title={'Blog'} />

            <div className='flex  min-[100vh] px-[80px]  max-md:px-[20px]'>
                <div className='flex-1'>
                    <section className='px-[20px] py-[50px] max-md:px-[20px]'>
                        <img src={api_urls + 'uploads/' + product.image} className="w-[100%]  h-[500px] rounded-lg" />
                        {/* <main className=" flex flex-wrap gap-3 py-[20px]">
                            <div>
                                <img src={whatsaap} className=" w-[35px] h-[35px]  hover:opacity-50" />
                            </div>
                            <div>
                                <img src={facebook} className=" w-[35px] h-[35px] hover:opacity-50" />
                            </div>
                            <div>
                                <img src={twitter} className=" w-[35px] h-[35px] hover:opacity-50" />
                            </div>
                            <div>
                                <img src={linkedin} className=" w-[35px] h-[35px] hover:opacity-50" />
                            </div>

                        </main> */}

                        <div className='mt-5'>
                            <p className="text-gray-500  text-lg pb-[10px]" >
                                <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                            </p>

                            <p className=" pt-[10px]" > Posted On -{moment(product?.createdAt).format("DD-MM-YY")} | Posted By - {product?.created_by}</p>
                        </div>

                    </section>
                </div>
            </div >
        </>
    );

}


export default BlogDetails