import React from "react";

const PaymentCard = ({cardName, img})=>{

    return(

        <main className="flex flex-col bg-[#EFEFEF] justify-center items-center rounded-md p-4 border border-gray-300" style={{ boxShadow: "0 0 2px #bdb5b5" }} >
            <img src={img} alt={cardName}  className="w-15 h-10"/>
            {cardName} 
        </main>
    )
}

export  default PaymentCard;