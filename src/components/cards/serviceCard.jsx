import React from 'react';
import { ViewSvg } from '../../assets/svg';

const ServiceCard = ({ img, views, description, name, time, onClick }) => {
    return (

        <section className="relative flex flex-col bg-white rounded-2xl w-[279px] shadow-md" style={{ boxShadow: " 0 0 10px rgba(0, 0, 0, 0.1)"}} onClick={onClick}>
            <div className='flex justify-center items-center pt-[20px]'>
                <div className='text-center'>
                    <img src={img} className='h-[120px] w-[120px] rounded-full transform hover:scale-105 transition duration-300' alt="Service" />
                </div>
            </div>
            <div className='flex flex-col p-4 flex-grow bg-white rounded-b-2xl text-center'>
                <p className='text-[#9A5D24] text-md font-semibold'>{name}</p>
                <p className="text-base mb-1">{description}</p>
            </div>
        </section>

    );
}

export default ServiceCard;
