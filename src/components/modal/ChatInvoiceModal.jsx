import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import * as ChatActions from '../../redux/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';

Modal.setAppElement('#root');

const secondsToHMS = (seconds) => {
    // Assuming you have a function to convert seconds to HH:MM:SS format
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m}:${s}`;
};

const showNumber = (number) => {
    // Assuming you have a function to format numbers
    return new Intl.NumberFormat().format(number);
};

const ChatInvoiceModal = () => {
    const dispatch = useDispatch();
    const { chatInvoiceData, chatInvoiceVisibility } = useSelector(state => state?.chatReducer);
    // console.log('chatInvoiceData', chatInvoiceData);

    const handleCloseInvoice = () => {
        const payload = {
            data: chatInvoiceData?.astrologerId,
            ratingVisible: true
        }
        dispatch(ChatActions.setAstrologerRatingVisibility(payload))

        dispatch(ChatActions.setChatInvoiceVisibility(false))
        dispatch(ChatActions.setChatInvoiceData(null))
    }

    return (
        <>
            <Modal isOpen={chatInvoiceVisibility} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
                <div className='p-5 flex flex-col gap-5'>
                    <div className='flex justify-between items-center'>
                        <div>Chat Invoice</div>
                        <div onClick={() => handleCloseInvoice()} className='bg-red-600 text-white px-4 py-1 rounded-md cursor-pointer'>Close</div>
                    </div>

                    <div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Invoice ID: </span>
                            <span className="text-lg font-medium uppercase">{chatInvoiceData?.transactionId}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Order Date: </span>
                            <span className="text-lg font-medium">{moment(chatInvoiceData?.createdAt).format('DD MMM YYYY')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Order Time: </span>
                            <span className="text-lg font-medium">{moment(chatInvoiceData?.createdAt).format('hh:mm A')}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Duration</span>
                            <span className="text-lg font-medium">{secondsToHMS(chatInvoiceData?.durationInSeconds ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Chat Price</span>
                            <span className="text-lg font-medium">{showNumber(chatInvoiceData?.chatPrice ?? 0)}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-lg font-medium">Total Charge</span>
                            <span className="text-lg font-medium">{showNumber(chatInvoiceData?.totalChatPrice)}</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ChatInvoiceModal;