import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CrossSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import LoginImage from '../../assets/images/logo/logo.png';
import * as AuthActions from '../../redux/actions/authAction';

Modal.setAppElement('#root');

const CustomerLoginModal = ({ isOpen, handleCloseModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resendTimer, setResendTimer] = useState(30); // Initial timer value in seconds
    const [timerActive, setTimerActive] = useState(false); // Start inactive
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCodeLength, setCountryCodeLength] = useState('');
    const [otpScreen, setOtpScreen] = useState(false);
    const [customerOtp, setCustomerOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    // Handle phone number change
    const handlePhoneChange = (value, country) => {
        setPhoneNumber(value);
        setCountryCodeLength(country?.dialCode?.length);
    };

    // OTP validation
    const validateOtp = () => {
        if (!customerOtp) {
            setOtpError('Please enter OTP');
            return false;
        }
        const otpPattern = /^\d{4}$/;
        if (!otpPattern.test(customerOtp)) {
            setOtpError('OTP format is incorrect');
            return false;
        }
        setOtpError('');
        return true;
    };

    // Resend OTP logic
    useEffect(() => {
        let intervalId;
        if (timerActive && resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(intervalId);
    }, [timerActive, resendTimer]);

    const handleResendOtp = () => {
        // Reset timer and start countdown again
        setResendTimer(30);
        setTimerActive(true);

        // Call the action to resend OTP
        // dispatch(AuthActions?.resendOtp(phoneNumber));
    };

    const handleSubmitOtp = () => {
        if (validateOtp()) {
            dispatch(AuthActions.customerLoginOtp({
                data: {
                    phoneNumber: String(phoneNumber)?.substring(2), // Remove country code
                    webFcmToken: localStorage.getItem('fcm_token'),
                    device_id: 'device_id',
                    otp: customerOtp,
                },
                onComplete: () => {
                    setOtpScreen(false);
                    handleCloseModal();
                    resetLoginState();
                    navigate('/');
                },
            }));
        }
    };

    const resetLoginState = () => {
        setPhoneNumber('');
        setCustomerOtp('');
        setTimerActive(false);
        setResendTimer(30);
    };

    const handleCustomerLogin = () => {
        dispatch(AuthActions.customerLogin({
            data: { phoneNumber: String(phoneNumber)?.substring(countryCodeLength) },
            onComplete: () => {
                setOtpScreen(true);
                setTimerActive(true);
                setResendTimer(30);
            },
        }));
    };

    return (
        <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
            <section className="relative flex items-center justify-center bg-white max-md:p-5">
                <div onClick={handleCloseModal} className='cursor-pointer absolute text-primary right-5 top-5'>
                    <CrossSvg strokeWidth='3' />
                </div>
                <article className="rounded-lg overflow-hidden max-w-4xl w-full">
                    <main className='flex'>
                        <div className='basis-[45%] hidden md:flex p-10 justify-center items-center'>
                            <img src={LoginImage} className="object-contain" />
                        </div>
                        <div className='basis-full md:basis-[55%] flex flex-col justify-center p-8'>
                            <div className='flex justify-center mb-8'>
                                <img src={Logo} className="h-14" />
                            </div>
                            {otpScreen ? (
                                <main className='flex flex-col gap-4'>
                                    <div className='flex flex-col items-center justify-center gap-3'>
                                        <div className='text-black'>Enter your OTP</div>
                                        <OtpInput
                                            value={customerOtp}
                                            onChange={setCustomerOtp}
                                            numInputs={4}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitOtp()}
                                                    className='border-2 outline-none text-center rounded-md'
                                                    style={{ height: '40px', width: '40px' }}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className=' text-green-700 text-sm text-right'>
                                        {resendTimer > 0 ? (
                                            `Resend OTP in ${resendTimer} seconds`
                                        ) : (
                                            <button onClick={handleResendOtp} className='text-green-700  text-sm  cursor-pointer hover:text-green-600'>
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={handleSubmitOtp} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">
                                        Submit
                                    </button>
                                </main>
                            ) : (
                                <div className='flex flex-col gap-4'>
                                    <div className='text-black'>You will receive a 4 digit code for verification</div>
                                    <PhoneInput
                                        country={'in'}
                                        placeholder='Enter mobile no'
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCustomerLogin()}
                                        inputStyle={{ width: '100%', height: '45px', fontSize: "15px", backgroundColor: "#EEEEEE" }}
                                    />
                                    <button onClick={handleCustomerLogin} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">
                                        GET OTP
                                    </button>
                                    <div className='text-[12px] text-grey'>
                                        By login, you agree to our <Link to={'terms-and-conditions'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Terms of Use</Link> and <Link to={'privacy-policy'} onClick={() => handleCloseModal()} className='underline text-blue-700'>Privacy Policy</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </article>
            </section>
        </Modal>
    );
};

export default CustomerLoginModal;



// import Modal from 'react-modal';
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import OtpInput from 'react-otp-input';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { CrossSvg } from '../../assets/svg';
// import Logo from '../../assets/images/logo/astro-remedy.png';
// import LoginImage from '../../assets/images/logo/logo.png';
// import * as AuthActions from '../../redux/actions/authAction';

// Modal.setAppElement('#root');

// const CustomerLoginModal = ({ isOpen, handleCloseModal }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [resendTimer, setResendTimer] = useState(30); // Initial timer value in seconds
//     const [timerActive, setTimerActive] = useState(true);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [countryCodeLength, setCountryCodeLength] = useState('');
//     const handlePhoneChange = (value, country) => {
//         console.log(`Phone :${value} and Country length : ${country?.dialCode?.length}`)
//         setPhoneNumber(value);
//         setCountryCodeLength(country?.dialCode?.length);
//     };

//     const [otpScreen, setOtpScreen] = useState(false);
//     const [customerOtp, setCustomerOtp] = useState('');
//     const [otpError, setOtpError] = useState('');

//     // Validation
//     const validateOtp = () => {
//         if (!customerOtp) {
//             setOtpError(' Please Enter OTP ');
//             return false;
//         }
//         // Example pattern check, adjust as per your requirement
//         const otpPattern = /^\d{4}$/;
//         if (!otpPattern.test(customerOtp)) {
//             setOtpError('OTP format is incorrect');
//             return false;
//         }
//         setOtpError('');
//         return true;
//     };

//     // handelTimer
//     useEffect(() => {
//         let intervalId;

//         if (timerActive) {
//             intervalId = setInterval(() => {
//                 setResendTimer(prevTimer => prevTimer - 1);
//             }, 1000);
//         }

//         return () => {
//             clearInterval(intervalId);
//         };
//     }, [timerActive]);

//     const handleResendOtp = () => {

//         // Reset timer and start countdown again
//         setResendTimer(30);
//         setTimerActive(true);

//     };

//     // Handellogin
//     const handleSubmitOtp = (validateOtp, phoneNumber, setOtpScreen, handleCloseModal, setPhoneNumber) => {
//         if (validateOtp()) {
//             dispatch(AuthActions.customerLoginOtp({
//                 data: {
//                     phoneNumber: String(phoneNumber)?.substring(2),
//                     webFcmToken: localStorage.getItem('fcm_token'),
//                     device_id: 'device_id',
//                     otp: customerOtp
//                 },
//                 onComplete: () => {
//                     setOtpScreen(false);
//                     handleCloseModal();
//                     setPhoneNumber('');
//                     setCustomerOtp(null);
//                     setTimerActive(false);
//                     setResendTimer(30);
//                     navigate('/')
//                 },
//                 onClick: () => {
//                     setTimerActive(false);
//                     setResendTimer(30);
//                 },
//             }));
//         }
//     };

//     // handleCustomerLogin
//     const handleCustomerLogin = (phoneNumber) => {
//         dispatch(AuthActions.customerLogin({
//             data: { phoneNumber: String(phoneNumber)?.substring(countryCodeLength), },
//             onComplete: () => {
//                 setOtpScreen(true)
//                 setTimerActive(true);
//                 setResendTimer(30);
//             },
//         }));
//     };

//     return (
//         <>
//             <Modal isOpen={isOpen} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
//                 <section className="relative flex items-center justify-center bg-white max-md:p-5">
//                     <div onClick={handleCloseModal} className='cursor-pointer absolute text-primary right-5 top-5' ><CrossSvg strokeWidth='3' /></div>

//                     <article className="rounded-lg overflow-hidden max-w-4xl w-full">
//                         <main className='flex'>
//                             <div className='basis-[45%] hidden md:block'>
//                                 <img src={LoginImage} className="h-full w-full object-cover" />
//                             </div>
//                             <div className='basis-full md:basis-[55%] flex flex-col justify-center p-8'>
//                                 <div className='flex justify-center mb-8'>
//                                     <img src={Logo} className="h-14" />
//                                 </div>
//                                 {otpScreen ?
//                                     <main className='flex flex-col gap-4'>
//                                         <div className='flex flex-col items-center justify-center gap-3'>
//                                             <div className='text-black'>Enter your OTP</div>
//                                             <OtpInput value={customerOtp} onChange={setCustomerOtp} numInputs={4} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} onKeyDown={(e) => e.key === 'Enter' && handleSubmitOtp(validateOtp, phoneNumber, setOtpScreen, handleCloseModal, setPhoneNumber)} className='border-2 outline-none text-center rounded-md' style={{ height: '40px', width: '40px' }} />} />
//                                         </div>
//                                         <div className=' text-green-700 text-sm text-right'>
//                                             {resendTimer > 0 ? `Resend OTP in ${resendTimer} seconds` : (<button onClick={handleResendOtp} className='text-green-700  text-sm  cursor-pointer hover:text-green-600' >Resend OTP</button>)}
//                                         </div>

//                                         <button onClick={() => handleSubmitOtp(validateOtp, phoneNumber, setOtpScreen, handleCloseModal, setPhoneNumber)} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">Submit</button>
//                                     </main>
//                                     :
//                                     <div className='flex flex-col gap-4'>
//                                         <div className='text-black'>You will receive a 4 digit code for verification</div>
//                                         <PhoneInput country={'in'} countryOptions={true} placeholder='Enter mobile no' value={phoneNumber} onChange={handlePhoneChange} onKeyDown={(e) => { e.key === 'Enter' && handleCustomerLogin(phoneNumber) }} inputStyle={{ width: '100%', height: '45px', fontSize: "15px", backgroundColor: "#EEEEEE" }} />
//                                         <button onClick={() => handleCustomerLogin(phoneNumber)} className="w-full shadow-lg bg-primary hover:bg-primary focus:shadow-outline focus:outline-none text-white text-sm py-2 px-4 rounded transition duration-300 transform hover:scale-95" type="submit">GET OTP</button>

//                                         <div className='text-[12px] text-grey'>By login, you agree to our <span className='underline text-blue-700'>Terms of Use</span> and <span className='underline text-blue-700'>Privacy Policy</span></div>
//                                     </div>}
//                             </div>
//                         </main>
//                     </article>
//                 </section>
//             </Modal>
//         </>
//     )
// }

// export default CustomerLoginModal;