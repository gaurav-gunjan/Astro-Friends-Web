import React, { useState } from 'react';
import Modal from 'react-modal';
import { CrossSvg } from '../../assets/svg';
import { toaster } from '../../utils/services/toast-service';

Modal.setAppElement('#root');

const UserAstrologerWithdrawalRequest = ({ isOpen, handleClose }) => {

    const [inputFieldDetail, setInputFieldDetail] = useState({ amount: '', reason: '' });

    //* Handle Input
    const handleInputFieldDetail = (e) => setInputFieldDetail({ ...inputFieldDetail, [e?.target?.name]: e?.target?.value });

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { amount, reason } = inputFieldDetail;
        let isValid = true;

        if (!amount) {
            toaster.warning({ text: 'Please enter amount' });
            return isValid = false
        }
        if (!reason) {
            toaster.warning({ text: 'Please enter reason' });
            return isValid = false
        }

        return isValid;
    }

    const handleSubmit = () => {
        console.log('Withdrawal Request ::: ', inputFieldDetail);

        handleValidation() && handleClose();
    };

    return (
        <Modal isOpen={isOpen} className="modal-content-small" overlayClassName="modal-overlay-small" closeTimeoutMS={200}>
            <div className='p-5 flex flex-col gap-5'>
                <div className='flex justify-between items-center gap-32'>
                    <div>Withdrawal Request</div>
                    <div onClick={() => handleClose()} className='bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer'><CrossSvg h='17' w='17' /></div>
                </div>

                <div className='flex flex-col gap-[15px]'>
                    <input name='amount' onChange={handleInputFieldDetail} placeholder='Amount' type='number' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-primary outline-none w-full rounded-sm px-5 py-1.5' />
                    <textarea name='reason' onChange={handleInputFieldDetail} placeholder='Reason' rows={5} className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-primary outline-none w-full rounded-sm px-5 py-1.5' />
                </div>

                <div onClick={handleSubmit} className='bg-primary text-white py-1.5 pt-2 rounded-sm text-center cursor-pointer text-[15px]'>Submit</div>
            </div>
        </Modal>
    )
}

export default UserAstrologerWithdrawalRequest;