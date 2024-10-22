import React, { useEffect, useRef, useState } from 'react';
import SocketService from '../../../utils/services/socket-service';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ChatActions from '../../../redux/actions/chatAction';
import { useDispatch } from 'react-redux';
import Logo from '../../../assets/images/logo/logo.png';
import soundFile from '../../../assets/audio/incoming.mp3';
import HeaderBG from '../../../components/common/HeaderBG';

const AstrologerAcceptReject = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const customer_id = searchParams.get('user_id');
    const astrologer_id = searchParams.get('astroID');
    const customerName = searchParams.get('customerName');
    // const astrologerName = localStorage.getItem('astrologerName');
    const chatId = searchParams.get('chatId');
    const invoiceId = searchParams.get('invoiceId');
    const priority = searchParams.get('priority');
    const profileId = searchParams.get('profileId');
    const type = searchParams.get('type');
    const wallet_balance = searchParams.get('wallet_balance');
    console.log({ customer_id, astrologer_id, chatId, customerName, invoiceId, priority, profileId, type, wallet_balance })

    const requestedData = { customer_id, astrologer_id, chatId, customerName, invoiceId, priority, profileId, type, wallet_balance }

    const audioRef = useRef(null);
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);

    const handleAcceptRejectChat = ({ status, requestedData }) => {
        console.log(status, requestedData);

        const payload = {
            data: {
                status, requestedData
            },
            onComplete: () => navigate(`/chat?customer=${customer_id}&astrologer=${astrologer_id}&chatId=${chatId}&profileId=${profileId}`, { replace: true }),
            onReject: () => navigate(`/`),
        };

        console.log(payload);

        //! Dispatch 
        dispatch(ChatActions.chatRequestAcceptRejectByAstrologer(payload))

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    useEffect(() => {
        if (isSoundPlaying) {
            const audio = new Audio(soundFile);
            audio.loop = true;
            audio.play().catch(error => {
                console.log('Error playing sound:', error);
            });
            audioRef.current = audio;

            return () => {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            };
        }
    }, [isSoundPlaying]);

    useEffect(() => {
        setIsSoundPlaying(true)
    }, []);

    return (
        <>
            <HeaderBG />

            <div className={`h-[500px] w-[100%] bg-no-repeat bg-center bg-cover bg-gif flex items-center justify-center`}>
                <div className='bg-yellow-100 h-96 w-72 flex flex-col items-center justify-around rounded-md shadow-lg'>
                    <div><img src={Logo} className='w-56' /></div>
                    <div className='flex justify-center gap-5'>
                        <div onClick={() => handleAcceptRejectChat({ status: "Accept", requestedData })} className='py-2 bg-green-600 text-white w-28 rounded-md text-center cursor-pointer'>Accept</div>
                        <div onClick={() => handleAcceptRejectChat({ status: "Reject", requestedData })} className='py-2 bg-red-600 text-white w-28 rounded-md text-center cursor-pointer'>Reject</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AstrologerAcceptReject;