import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { database, ref, push, onValue, serverTimestamp, set } from '../../config/firebase-config'; // Update with your actual firebase config import
import Timer from './features/Timer';
import { api_urls } from '../../utils/api-urls';
import { AttachmentBtnSvg, SendBtnSvg } from '../../assets/svg';
import { generateRandomNumber } from '../../utils/common-function';
import ChatImageModal from '../../components/modal/ChatImageModal';
import SocketService from '../../utils/services/socket-service';

const Chat = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const customer_id = searchParams.get('customer');
    const astrologer_id = searchParams.get('astrologer');
    const profileId = searchParams.get('profileId');
    const { socketConnectionStatus } = useSelector(state => state?.commonReducer);
    const [inputField, setInputField] = useState('');
    const current_user_id = localStorage.getItem('current_user_id');
    const current_user_data = JSON.parse(localStorage.getItem('current_user_data'));
    const currentUser = {
        _id: localStorage.getItem('user_type') === 'astrologer' ? `astro_${current_user_id}` : `customer_${current_user_id}`,
        name: current_user_data?.astrologerName || current_user_data?.customerName,
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const handleOpenImage = (message) => {
        setSelectedContent(message);
        setModalOpen(true)
    };

    const handleCloseImage = (message) => {
        setSelectedContent(null);
        setModalOpen(false)
    };

    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    const chat_id = `customer_${customer_id}_astro_${astrologer_id}`;
    const localRequestedData = JSON.parse(localStorage.getItem('chat_requested_data'));

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const messagesRef = ref(database, `ChatMessages/${chat_id}`);
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = [];

            for (let key in data) {
                const message = data[key];
                loadedMessages.push({
                    ...message,
                    createdAt: new Date(message.createdAt),
                    user: { id: message?.user?._id, name: message?.user?.name },
                });
            }
            setMessages(loadedMessages);
        });
    }, [chat_id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchIntakeDetail = async () => {
            const { data } = await axios.post(api_urls + 'api/customers/get_linked_profile', { profileId: '6735d57e4359c21977a0577c' });
            if (data?.success) {

                const { firstName, lastName, dateOfBirth, timeOfBirth, placeOfBirth, maritalStatus, latitude, longitude, topic_of_concern, description } = data?.data;

                const message = {
                    _id: Math.random().toString(36).substr(2, 9),
                    text: `Firstname: ${firstName},  Lastname: ${lastName}, DOB: ${moment(dateOfBirth)?.format('DD MMM YYYY')}, TOB: ${moment(timeOfBirth)?.format('hh:mm a')}, POB: ${placeOfBirth}, Marital Status: ${maritalStatus}, Latitude:${latitude}, Longitude:${longitude}, Topic of concer:${topic_of_concern}, description: ${description}`,
                    user: currentUser,
                    createdAt: new Date().getTime(),
                    addedAt: serverTimestamp(),
                };

                const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
                const newKey = chatNode.key;
                const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
                await set(chatRef, { ...message, pending: false, sent: true, received: false });
            }
        };

        localStorage.getItem('user_type') === 'customer' && fetchIntakeDetail();
    }, []);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const message = {
            _id: Math.random().toString(36).substr(2, 9),
            text,
            user: currentUser,
            createdAt: new Date().getTime(),
            addedAt: serverTimestamp(),
        };

        const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
        const newKey = chatNode.key;
        const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);
        await set(chatRef, { ...message, pending: false, sent: true, received: false });
    };

    const handleFileChange = async (e) => {
        console.log("Handle File Change Outside ::: ", e.target.files[0]);
        if (e.target.files[0] && e.target.files.length > 0) {
            console.log("Handle File Change Inside ::: ", e.target.files[0]);

            try {
                // const formData = { fileType: 'image', filePath: e.target.files[0] }
                const formData = new FormData();
                formData.append('fileType', 'image');
                formData.append('filePath', e.target.files[0])
                const { data } = await axios.post(api_urls + 'api/customers/store-file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log("API Data ::: ", data);

                if (data?.success) {
                    const message = { _id: generateRandomNumber(), text: '', image: api_urls + data?.data?.filePath, user: currentUser, createdAt: new Date().getTime(), addedAt: serverTimestamp(), };
                    console.log('message', message);
                    const chatNode = push(ref(database, `ChatMessages/${chat_id}`));
                    const newKey = chatNode.key;
                    const chatRef = ref(database, `ChatMessages/${chat_id}/${newKey}`);

                    await set(chatRef, { ...message, pending: false, sent: true, received: false });
                } else {
                    console.log("Error")
                }
            } catch (error) {
                console.log("Error  ::: ", error);
            }
        }
    };

    const groupMessagesByDate = () => {
        const grouped = messages.reduce((acc, message) => {
            const messageDate = moment(message.createdAt).format('YYYY-MM-DD');
            if (!acc[messageDate]) {
                acc[messageDate] = [];
            }
            acc[messageDate].push(message);
            return acc;
        }, {});
        return grouped;
    };

    const groupedMessages = groupMessagesByDate();

    // // Todo : Emitting 'join-room' Event On Page Mount or Page Relaoding
    // useEffect(() => {
    //     const local_chatId = localStorage.getItem('chatId');
    //     console.log("Local chat id: ", local_chatId);
    //     if (local_chatId) SocketService.emit('joinChatRoom', local_chatId);
    //     else navigate('/');
    // }, [socketConnectionStatus]);

    return (
        <>
            <div className='h-[94.5px] max-md:h-[70.5px]'></div>

            <div className="flex flex-col max-md:h-[calc(100vh-70.5px)] h-[calc(100vh-94.5px)]">
                <Timer requestedData={localRequestedData} />

                {/* Chat messages container */}
                <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-100">
                    {Object.keys(groupedMessages).map((date, index) => (
                        <div key={index}>
                            {/* Date header */}
                            <div className="text-center my-4 text-gray-500">{moment(date).format('MMMM Do, YYYY')}</div>

                            {/* Messages */}
                            {groupedMessages[date].map((message, index) => (
                                <div key={index} className={`flex ${message.user.id === currentUser._id ? 'justify-end' : 'justify-start'} my-2`}>
                                    <div onClick={() => { if (message?.image) handleOpenImage(message) }}>
                                        {!message.image ?
                                            <div className={`relative max-w-xs p-3 rounded-lg shadow-md ${message.user.id === currentUser._id ? 'bg-primary text-white' : 'bg-white text-black'} break-words`}>
                                                <div className='text-[14px]'>{message.text}</div>
                                                <div className={`text-xs text-end mt-1`}>{moment(message.createdAt).format('h:mm A')}</div>
                                            </div>
                                            :
                                            <div className='relative max-w-80 cursor-pointer'>
                                                <img src={message.image} alt="attachment" className="mt-2 max-h-40 rounded-lg" />
                                                <div className="text-xs text-white absolute z-10 right-2 bottom-2">{moment(message.createdAt).format('h:mm A')}</div>
                                            </div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div className="flex-shrink-0 p-4 bg-white border-t flex items-center">
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current.click()} className="p-2 text-primary rounded-lg"><AttachmentBtnSvg /></button>
                    <input type="text" placeholder="Type a message" className="flex-grow p-2 mx-2 border border-gray-300 rounded-lg outline-none" onChange={(e) => setInputField(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(e.target.value); e.target.value = ''; setInputField('') } }} />
                    <button onClick={() => (handleSend(inputField), setInputField(''))} className="p-2 text-primary rounded-lg"><SendBtnSvg /></button>
                </div>

                {/* Image Modal */}
                <ChatImageModal visible={modalOpen} image={selectedContent?.image} handleClose={handleCloseImage} />
            </div>
        </>
    );
};

export default Chat;