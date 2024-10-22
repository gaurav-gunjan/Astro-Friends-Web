import React, { useEffect, useState } from 'react';
import call from '../../../../assets/images/button/call.png';
import chat from '../../../../assets/images/button/comment.png';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { api_urls } from '../../../../utils/api-urls';
import { IndianRupee } from '../../../../utils/common-function';
import * as EcommerceActions from '../../../../redux/actions/ecommerceActions';
import Swal from 'sweetalert2';
import TopHeaderSection from '../../../../components/common/TopHeaderSection';

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);
    const product = location.state && location.state.productDetails;
    console.log(product)
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const handleAddToCart = () => {
        if (!userCustomerDataById) {
            Swal.fire({ icon: "warning", title: "Warning", text: "Please Login First", showConfirmButton: true, timer: 20000 });
        } else {
            const payload = {
                data: { productId: product?._id, customerId: userCustomerDataById?._id },
                onComplete: () => navigate('/cart')
            }

            //! Dispatching API For Add To Cart
            dispatch(EcommerceActions.addToCart(payload));
        }
    }

    return (
        <>
            <TopHeaderSection title={'Astromall Shop'} />

            <section className='px-5 py-7 sm:px-10 md:px-20 lg:px-[100px]'>
                <main className='flex flex-wrap gap-7'>
                    <div className='flex-100 sm:flex-50'>
                        <img src={api_urls + 'uploads/' + product?.image} alt="Product" className='rounded-md w-full h-auto sm:w-96 sm:h-96 border-2 border-gray-500' />
                    </div>
                    <div className='flex-100 sm:flex-50 flex flex-col items-start'>
                        <h4 className='text-2xl sm:text-3xl font-bold'> {product?.productName} </h4>
                        <h3 className='text-lg sm:text-xl text-gray-600 font-bold py-2'> Starting From: <div className='flex gap-2 items-center'><span className='line-through text-lg  text-red-500'>{IndianRupee(product?.mrp)} </span> <span>{IndianRupee(product?.price)}</span></div> </h3>
                        {/* <h3 className='text-md text-gray-600 font-bold py-2'> Refundable Till : <span>{product?.refundRequetDay} Days</span> </h3> */}
                        <div className='mt-4'>
                            <button onClick={handleAddToCart} className='bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700'>Add To Cart</button>
                        </div>
                    </div>
                </main>

                <div className='bg-gray-200 p-4 my-4 rounded-lg'>
                    <h4 className='font-bold text-xl text-gray-700'>What is {product?.productName}</h4>
                    <p>{product?.description}</p>
                </div>

                {/* <div className='my-6'>
                    <h4 className='font-bold text-2xl text-gray-700'>AstroRemedy Promises</h4>
                </div>

                <div className='py-6 px-4 mb-6 bg-primary rounded-md'>
                    <p className='text-justify text-white'>AstroMall is a one-stop shop for all your astrological needs. Apart from providing you the most genuine and lab-certified products like Gemstones, Kavach, Yantras, etc. AstroMall also assures excellence in providing services like Reiki healing, Past life regression, Consultation, etc. All these products and services on AstroMall comes with the promise of genuineness and are attuned and energized to your personal needs. If you have any queries about any of our products or services, you can simply reach out to our customer care executives.</p>
                    <div className='flex flex-wrap justify-between mt-6 gap-5'>
                        <div className='flex items-center gap-2 px-6 py-4 bg-white rounded-full shadow hover:bg-gray-800 hover:text-white transition duration-300 cursor-pointer'>
                            <img src={call} alt="call icon" className='w-5' />
                            <p>Talk to Astrologer</p>
                        </div>
                        <div className='flex items-center gap-2 px-6 py-4 bg-white rounded-full shadow hover:bg-gray-800 hover:text-white transition duration-300 cursor-pointer'>
                            <img src={chat} alt="chat icon" className='w-5' />
                            <p>Chat With Astrologer</p>
                        </div>
                    </div>
                </div> */}
            </section>
        </>
    );
}

export default ProductDetails;
