import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo/logo.png"
import AstroMallCard from "../../components/cards/astroMallCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as EcommerceAction from "../../redux/actions/ecommerceActions.js"
import { api_urls } from "../../utils/api-urls/index.js";
import { DeepSearchSpace } from "../../utils/common-function/index.js";
import TopHeaderSection from "../../components/common/TopHeaderSection.jsx";

const AstroMall = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productCategoryData } = useSelector(state => state?.ecommerceReducer);
    console.log('productCategoryData', productCategoryData);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(productCategoryData, searchText);

    useEffect(function () {
        //! Dispatching API for Get Categories
        dispatch(EcommerceAction.getProductCategory());
    }, []);

    return (
        <>
            <TopHeaderSection title={'Astromall Shop'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <div className="text-center text-xl sm:text-2xl font-semibold text-gray-600 mb-8">Shop Best Online Astrology Products And Services</div>

                <div className="relative flex justify-center mb-8">
                    <hr className="w-full" />
                    <img src={logo} alt="logo img" className="absolute h-10 -translate-y-1/2 bg-white px-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }} />
                </div>

                {/* Search Bar */}
                <div className="flex items-center justify-center mb-8">
                    <input type="search" onChange={handleSearch} placeholder="Search" className="border border-gray-300 bg-white h-12 px-5 pr-12 rounded-full text-sm focus:outline-none w-full max-w-lg" />
                </div>

                {/* Products Category */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                    {filteredData.map((item, index) => (
                        <div key={index}>
                            <AstroMallCard
                                onClick={() => navigate("/astro-mall/products", { state: { productCategoryData: item }, })}
                                startPrice={null}
                                bgImage={api_urls + 'uploads/' + item?.image}
                                categoryName={item?.categoryName}
                                description={item?.description}
                            />
                        </div>
                    ))}
                </div>

                {/* Slider */}
                {/* <div className="text-center  py-[20px] mx-[20px]">
                    <div className="text-center text-3xl font-bold text-gray-800 mb-4">NEWLY LAUNCHED</div>

                    <MyCarousel />
                </div> */}
            </section>
        </>
    );
}

export default AstroMall;