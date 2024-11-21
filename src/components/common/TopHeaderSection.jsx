import React from 'react';
import HeaderBG from '../../assets/images/common/header-bg.jpg';
import BorderBG from '../../assets/images/common/border-bg.png';

const TopHeaderSection = ({ title }) => {
    return (
        <>
            <section className='relative h-[250px] max-md:h-[200px] w-full pb-20 max-md:pb-12' style={{ backgroundImage: `url(${HeaderBG})` }}>
                <main className='flex items-end justify-center h-[100%]'>
                    <div className='text-white text-3xl max-md:text-2xl font-bold tracking-wider capitalize'>{title}</div>
                </main>
                <img src={BorderBG} className='absolute -bottom-1' />
            </section>
        </>
    )
}

export default TopHeaderSection;