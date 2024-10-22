import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/logo/logo.png";
import AstroMallCard from "../../../components/cards/AstroMallCard";
import { SearchSvg } from "../../../assets/svg";
import { useLocation, useNavigate } from "react-router-dom";
import * as EcommerceAction from "../../../redux/actions/ecommerceActions.js";
import { useDispatch, useSelector } from "react-redux";
import { api_urls } from "../../../utils/api-urls/index.js";
import { DeepSearchSpace, IndianRupee } from "../../../utils/common-function/index.js";
import TopHeaderSection from "../../../components/common/TopHeaderSection.jsx";

const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);
    const product = location.state && location.state.productCategoryData;

    const dispatch = useDispatch();
    const { productsData } = useSelector(state => state?.ecommerceReducer);
    console.log('productsData', productsData);

    console.log(product, productsData)

    const [searchText, setSearchText] = useState('');
    const handleSearch = (event) => setSearchText(event.target.value);
    const filteredData = DeepSearchSpace(productsData, searchText);

    useEffect(() => {
        //! Dispatch API for Get Categories when component mounts
        dispatch(EcommerceAction.getProducts({ categoryId: product?._id }));
    }, [dispatch]);

    return (
        <>
            <TopHeaderSection title={product.categoryName} />

            <section className='px-5 py-7 sm:px-10 md:px-20 lg:px-32'>
                <div className="text-center text-xl sm:text-2xl font-semibold text-gray-600 mb-8">Shop Best Online Astrology Products And Services</div>

                <div className="relative flex justify-center mb-8">
                    <hr className="w-full" />
                    <img src={logo} alt="logo img" className="absolute h-10 -translate-y-1/2 bg-white px-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }} />
                </div>

                {/* Search Bar */}
                <div className="flex items-center justify-center mb-8">
                    <input type="search" onChange={handleSearch} placeholder="Search" className="border border-gray-300 bg-white h-12 px-5 pr-12 rounded-full text-sm focus:outline-none w-full max-w-lg" />
                </div>

                {/* Products */}
                <div className="flex flex-wrap justify-center items-center gap-6">
                    {filteredData.map((item, index) => (
                        <div key={index}>
                            <AstroMallCard
                                onClick={() => navigate(`/astro-mall/products/${item?.productName?.toLowerCase()?.split(' ').join('')}`, {
                                    state: { productDetails: item },
                                })}
                                startPrice={IndianRupee(item.price)}
                                categoryName={item.categoryName}
                                description={item.description}
                                bgImage={api_urls + 'uploads/' + item?.image}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* <section className='px-5 py-7 sm:px-10 md:px-20 lg:px-32 bg-gray-100'>
                <div className="text-center text-2xl font-bold text-gray-600 mb-4">
                    What is {product.categoryName}
                </div>
                <div className="text-center text-lg text-gray-600 mb-4">
                    <p>Benefits of {product.categoryName}</p>
                </div>

                <div className="text-gray-600 leading-relaxed">
                    <p className="py-2">{product.description}</p>
                </div>
            </section> */}
        </>
    );
}

export default Products;
