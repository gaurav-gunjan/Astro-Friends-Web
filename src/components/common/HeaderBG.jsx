import React from 'react';
import HeaderBGImage from '../../assets/images/common/header-bg.jpg';

const HeaderBG = () => {
    return (
        <section className='relative h-[100px] max-md:h-[70px] w-full pb-20 max-md:pb-12' style={{ backgroundImage: `url(${HeaderBGImage})` }}></section>
    )
}

export default HeaderBG;