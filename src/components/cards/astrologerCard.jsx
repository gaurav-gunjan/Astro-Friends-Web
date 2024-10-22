import React, { useState } from 'react';
import { CallSvg, ChatSvg } from '../../assets/svg';
import { useNavigate } from 'react-router-dom';
import { api_urls } from '../../utils/api-urls';
import DownloadApp from './DownloadApp';

const AstrologerCard = ({ data }) => {
    const navigate = useNavigate();
    //! Downlaod Modal 
    const [downloadAppModal, setDownloadAppModal] = useState(false);
    const handleOpenDownloadAppModal = () => setDownloadAppModal(true);
    const handleClosedownloadAppModal = () => setDownloadAppModal(false);

    return (
        <>
            <section onClick={() => navigate(`/chat-with-astrologer/${data?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: data } })} className="bg-[#F4F4F4] rounded-2xl p-[7px]" style={{ boxShadow: "0 0 1px #bdb5b5", }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)" }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = "0 0 1px #bdb5b5" }}>

                <main className="flex flex-col bg-[#fff] rounded-xl px-[50px] py-[50px] text-center items-center h-full" style={{ boxShadow: "0 0 0px #bdb5b5" }}>
                    <img src={api_urls + data?.profileImage} className="h-52 w-52 rounded-full object-cover border-4 border-yellow-400 shadow-lg mb-4 transform hover:scale-105 transition duration-300 max-sm:h-40 max-sm:w-40" />
                    <div className='py-3'>
                        <h3 className='text-xl font-semibold text-[#9A5D24] text-center m-[5px]'> {data?.astrologerName} </h3>
                        <p className='text-black text-center'> {'Hindi'} </p> {/* Default to 'Hindi' if skill is falsy */}
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center'>
                        <div className='bg-white rounded-full p-3 cursor-pointer' style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }} >
                            <ChatSvg />
                        </div>
                        <div onClick={() => handleOpenDownloadAppModal()} className='bg-white rounded-full p-3 cursor-pointer' style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)' }} >
                            <CallSvg />
                        </div>
                    </div>
                </main>

            </section>
            {/* Download App */}
            <DownloadApp isOpen={downloadAppModal} handleCloseModal={handleClosedownloadAppModal} />
        </>
    );
}

export default AstrologerCard;
