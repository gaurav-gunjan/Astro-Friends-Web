import React from 'react';

const SubFooter = () => {
    return (
        <section>
            <article>
                <main className='flex flex-col justify-center items-center px-[20px] py-5 bg-red-900 text-white text-[15px]'>
                    <div>Copyright © 2020-2024 Astro Friends. All Rights Reserved.</div>
                    <div>Developed and maintained by <span className='cursor-pointer' onClick={() => window?.open("https://ksbminfotech.com/")}>KSBM INFOTECH</span></div>
                </main>
            </article>
        </section>
    )
}

export default SubFooter;