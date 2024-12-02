import React from 'react';

const AstroMallCard = ({ startPrice, categoryName, description, bgImage, onClick }) => {
    const sectionStyle = { backgroundImage: `url('${bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', };

    return (
        <section
            style={sectionStyle}
            className="relative rounded-lg overflow-hidden w-[370px] h-[370px] hover:shadow-lg max-sm:h-[250] max-sm:w-[200] "
            onClick={onClick}
        >
            <div className='bg-gradient-to-r from-purple-500 to-pink-500 opacity-90 rounded-tl-lg p-2'>
                <p className='text-white text-xs'>{startPrice}</p>
            </div>
            <div className='mt-auto bg-black bg-opacity-50 rounded-b-lg'>
                <hr className='border border-white' />
                <div className='p-3'>
                    <p className='text-white text-sm font-semibold'>{categoryName}</p>
                    <p className='text-white text-xs line-clamp-5'>{description}</p>
                </div>
            </div>
        </section>
    );
}

export default AstroMallCard;
