import React from "react";
import { RupeeSvg } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

const PriceCard = ({ price, mostPopular, extra }) => {
    const navigate = useNavigate();

    return (

        <div onClick={() => navigate(`/payment-details`)} className="bg-white border border-gray shadow-lg rounded-xl shadow-gray-300 h-28 w-44 items-center  hover:border-yellow-300 hover:shadow-yellow-50">
            <div>
                <div className="text-center mx-8 h-5  max-md:mx-3 max-xl:mx-3">
                    {mostPopular && <div className="bg-[#F2994A] text-white rounded-b-md   ">
                        {mostPopular}
                    </div>}
                </div>

                <div className="text-center  text-xl px-10 py-5 "> {price}</div>

                <div className="  text-center bottom-0  ">
                    {extra && <div className="bg-[#E8F4ED] text-[#219675] rounded-b-xl flex items-center justify-center px-10  py-0" >
                        <RupeeSvg h='10' /> {extra}
                    </div>}
                </div>
            </div>
        </div>

    );

};

export default PriceCard;