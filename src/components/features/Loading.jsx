import React from 'react';
import '../../assets/css/loader.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Loading = () => {
    return (
        <>
            <section className='px-[100px] max-lg:px-[20px] pt-4'>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <main className='flex justify-between items-center'>
                        <div className='h-20 w-20 max-lg:h-10 max-lg:w-10'><Skeleton height={'100%'} /></div>

                        <nav className='flex justify-between items-center gap-5'>
                            <div className='h-10 w-44 max-lg:hidden'><Skeleton height={'100%'} style={{ borderRadius: '30px' }} /></div>
                            <div className='h-10 w-44 max-lg:hidden'><Skeleton height={'100%'} style={{ borderRadius: '30px' }} /></div>
                            <div className='h-7 max-lg:h-5 w-20'><Skeleton height={'100%'} /></div>
                            <div className='h-7 max-lg:h-5 w-7'><Skeleton height={'100%'} /></div>
                        </nav>
                    </main>
                </SkeletonTheme>
            </section>

            <section className='px-5 py-4'>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <div className='h-96 max-lg:h-72 max-md:60'><Skeleton height={'100%'} style={{borderRadius:'30px'}}/></div>
                </SkeletonTheme>
            </section>

            <section className='px-[100px] max-lg:px-[20px] py-[50px] bg-white'>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <div className='flex flex-col items-center gap-2 mb-10'>
                        <div className='h-8 w-[300px]'><Skeleton height={'100%'} width={'100%'} /></div>
                        <div className='w-[150px] h-[3px]'><Skeleton height={'100%'} width={'100%'} /></div>
                    </div>

                    <main className='flex flex-wrap gap-x-[20px] gap-y-[40px] justify-evenly max-lg:justify-center text-[13px] font-semibold'>
                        {Array(6)?.fill('')?.map((value, index) => (
                            <div key={index} className='flex flex-col items-center gap-2 group/item cursor-pointer'>
                                <div className='h-[70px] w-[70px]'><Skeleton height={'100%'} width={'100%'} style={{ borderRadius: '100%' }} /></div>
                                <div><Skeleton height={20} width={100} /></div>
                            </div>
                        ))}
                    </main>
                </SkeletonTheme>
            </section>
        </>
    );
}

export default Loading;

{/* <div className="flex items-center justify-center min-h-screen max-md:min-h-[300px]">
    <div className="relative flex space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full animate-snake"></div>
        <div className="w-8 h-8 bg-primary rounded-full animate-snake animation-delay-200"></div>
        <div className="w-8 h-8 bg-primary rounded-full animate-snake animation-delay-400"></div>
    </div>
</div> */}