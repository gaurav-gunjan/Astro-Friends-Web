import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { CrossSvg, HamburgerSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/logo.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Modal from 'react-modal';
import { api_urls } from '../../utils/api-urls';
import { IndianRupee } from '../../utils/common-function';
import * as AuthActions from '../../redux/actions/authAction';
import { generateTokenByRequestPermission } from '../../config/firebase-config';
import DownloadApp from '../cards/DownloadApp';

Modal.setAppElement('#root');
const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', padding: 0, borderRadius: "5px", minWidth: "400px", maxWidth: "450px" }, };

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);
    const [shownav, setShownav] = useState(false);
    const [resendTimer, setResendTimer] = useState(30); // Initial timer value in seconds
    const [timerActive, setTimerActive] = useState(true);

    const [fcmToken, setFcmToken] = useState(null);
    useEffect(() => {
        const getToken = async () => {
            const token = await generateTokenByRequestPermission();
            console.log("Header Token ::: ", token);
            if (token) {
                setFcmToken(token)
            }
        }
        getToken();
    }, [fcmToken])

    //! Call Modal 
    const [downloadAppModal, setDownloadAppModal] = useState(false);
    const handleOpenDownloadAppModal = () => {
        setShownav(!shownav)
        setDownloadAppModal(true)
    };
    const handleClosedownloadAppModal = () => setDownloadAppModal(false);

    //! Customer Login Start
    const [loginCustomerModal, setLoginCustomerModal] = useState(false);
    const handleOpenLoginCustomerModal = () => {
        setShownav(false)
        setLoginCustomerModal(true)
    };
    // const handleCloseLoginCustomerModal = () => setLoginCustomerModal(false);
    const handleCloseLoginCustomerModal = () => {
        setLoginCustomerModal(false);
        setOtpScreen(false); // Close OTP screen when customer modal is closed
        setPhoneNumber('');
        setCustomerOtp(null);
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCodeLength, setCountryCodeLength] = useState('');
    const handlePhoneChange = (value, country) => {
        console.log(`Phone :${value} and Country length : ${country?.dialCode?.length}`)
        setPhoneNumber(value);
        setCountryCodeLength(country?.dialCode?.length);
    };

    const [otpScreen, setOtpScreen] = useState(false);
    const [customerOtp, setCustomerOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    //! Customer Login End

    //! Astrolger Login Start
    const [loginAstrologerModal, setLoginAstrologerModal] = useState(false);
    const handleOpenLoginAstrologerModal = () => {
        setShownav(false)
        setLoginAstrologerModal(true)
    };
    const handleCloseLoginAstrologerModal = () => {
        setTimerActive(false);
        setResendTimer(30);
        setLoginAstrologerModal(false);
    }

    const [astroFieldDetail, setAstroFieldDetail] = useState({ email: '', password: '' });
    const handleInputFieldAstrolger = (e) => {
        const { name, value } = e.target;
        setAstroFieldDetail({ ...astroFieldDetail, [name]: value })
    };

    const handleLoginAstrolger = async () => {
        console.log(astroFieldDetail);
        const { email, password } = astroFieldDetail;

        const payload = {
            data: { email, password, webFcmToken: localStorage.getItem('fcm_token') },
            onComplete: () => {
                handleCloseLoginAstrologerModal()
                setAstroFieldDetail({ email: '', password: '' })
                navigate('/')
            }
        }
        dispatch(AuthActions.astrologerLogin(payload));
    };
    // Validation
    const validateOtp = () => {
        if (!customerOtp) {
            setOtpError(' Please Enter OTP ');
            return false;
        }
        // Example pattern check, adjust as per your requirement
        const otpPattern = /^\d{4}$/;
        if (!otpPattern.test(customerOtp)) {
            setOtpError('OTP format is incorrect');
            return false;
        }
        setOtpError('');
        return true;
    };



    //! Astrolger Login End

    //* Handle Resize and Scroll Event Listener 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setShownav(false)
            }
        };
        const handleScroll = () => {
            setShownav(false);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll);
        };
    }, []);

    // handelTimer
    useEffect(() => {
        let intervalId;

        if (timerActive) {
            intervalId = setInterval(() => {
                setResendTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timerActive]);

    const handleResendOtp = () => {

        // Reset timer and start countdown again
        setResendTimer(30);
        setTimerActive(true);

    };

    // Handellogin
    const handleSubmitOtp = (validateOtp, phoneNumber, setOtpScreen, handleCloseLoginCustomerModal, setPhoneNumber) => {
        if (validateOtp()) {
            dispatch(AuthActions.customerLoginOtp({
                data: {
                    phoneNumber: String(phoneNumber)?.substring(2),
                    webFcmToken: localStorage.getItem('fcm_token'),
                    device_id: 'device_id'
                },
                onComplete: () => {
                    setOtpScreen(false);
                    handleCloseLoginCustomerModal();
                    setPhoneNumber('');
                    setCustomerOtp(null);
                    setTimerActive(false);
                    setResendTimer(30);
                    navigate('/')
                },
                onClick: () => {
                    setTimerActive(false);
                    setResendTimer(30);
                },
            }));
        }
    };

    const notificationTitle = 'Otp';
    const notificationOptions = {
        body: '1234',
    };

    // handleCustomerLogin
    const handleCustomerLogin = (phoneNumber) => {
        dispatch(AuthActions.customerLogin({
            data: { phoneNumber: String(phoneNumber)?.substring(countryCodeLength) },
            onComplete: () => {
                setOtpScreen(true)
                setTimerActive(true);
                setResendTimer(30);
                alert("Your otp is : 1234")
            },
        }));
    };

    return (
        <>
            <header className='px-[100px] py-[15px] max-sm:px-[20px] shadow-md'>
                <article>
                    <main className='flex gap-x-10 flex-wrap justify-between items-center'>
                        <div className='flex items-center gap-5  max-lg:flex-row-reverse  max-lg:justify-between  max-lg:flex-1'>
                            <div onClick={() => setShownav(!shownav)} className='lg:hidden cursor-pointer'><HamburgerSvg w='28' h='28' /></div>
                            <div><img onClick={() => navigate('/')} src={Logo} className='max-sm:w-10 max-sm:h-10 w-20 h-20 cursor-pointer' /></div>
                        </div>

                        <main className='flex flex-col items-end gap-y-4 max-lg:hidden'>
                            <main className='flex gap-10 items-center relative'>
                                <div>{userCustomerDataById && IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                                <div>{userAstrologerDataById && IndianRupee(userAstrologerDataById?.wallet_balance)}</div>
                                {/* <NavLink to="/free-kundli" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Free Kundli</NavLink>
                                <NavLink to="/kundli-matching" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Kundli Matching</NavLink> */}
                                <div className='cursor-pointer' onClick={() => setDownloadAppModal(true)}><div>Free Kundli</div></div>
                                <div className='cursor-pointer' onClick={() => setDownloadAppModal(true)}><div>Kundli Matching</div></div>

                                {userAstrologerDataById || userCustomerDataById ?
                                    <div className='cursor-pointer group/item'>{userAstrologerDataById ? <img src={api_urls + userAstrologerDataById?.id_proof_image} className='h-12 w-12 rounded-full' /> : <img src={api_urls + 'uploads/' + userCustomerDataById?.image} className='h-12 w-12 rounded-full' />}
                                        <div className='bg-primary text-white py-2 px-3 absolute z-40 top-12 right-0 rounded-md invisible group-hover/item:visible' style={{ boxShadow: "0 0 15px grey" }}>
                                            <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='px-3 py-2 hover:bg-white hover:text-primary rounded-sm'>Logout</div>
                                            {userCustomerDataById && <div onClick={() => navigate('/cart')} className='px-3 py-2 hover:bg-white hover:text-primary rounded-sm'>Your Cart</div>}
                                        </div>
                                    </div>
                                    :
                                    <div className='bg-primary py-1 px-4 rounded-md text-white group/item'>
                                        <span className='cursor-pointer'>Login</span>
                                        <div className='bg-primary text-white p-2 absolute z-40 top-7 right-0 invisible group-hover/item:visible flex flex-col gap-2' style={{ boxShadow: "0 0 15px grey" }}>
                                            <button disabled={fcmToken == null} onClick={handleOpenLoginCustomerModal} className={`px-3 py-2  ${fcmToken == null ? 'cursor-not-allowed' : 'hover:text-primary hover:bg-white'}`}>Login as Customer</button>
                                            <button disabled={fcmToken == null} onClick={handleOpenLoginAstrologerModal} className={`px-3 py-2  ${fcmToken == null ? 'cursor-not-allowed' : 'hover:text-primary hover:bg-white'}`}>Login as Astrologer</button>
                                        </div>
                                    </div>
                                }
                            </main>

                            <main className='flex gap-5 flex-wrap justify-between'>
                                {userCustomerDataById && <>
                                    <NavLink to="/chat-with-astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Chat with Astrologer</NavLink>
                                    <div className='cursor-pointer' onClick={() => setDownloadAppModal(true)}><div>Talk to Astrologer</div></div>
                                    <NavLink to="/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Astromall</NavLink>
                                </>}
                                {/* <NavLink to="/book-a-pooja" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Book a Pooja</NavLink> */}
                                <div className='cursor-pointer' onClick={() => setDownloadAppModal(true)}><div>Book a Pooja</div></div>
                                <NavLink to="/blog" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Blog</NavLink>
                            </main>
                        </main>

                        <main className={`flex flex-col gap-5 flex-wrap p-5 absolute bg-white top-0 ${shownav ? 'left-0' : 'left-[-50vw]'} min-h-[100vh] w-[50vw] transition-all duration-500`} style={{ zIndex: '999' }} >
                            <div className='flex items-center gap-5 mb-5'>
                                {/* <div onClick={() => setShownav(!shownav)} className='lg:hidden cursor-pointer'><HamburgerSvg w='28' h='28' /></div> */}
                                <div><img src={Logo} className='w-20 h-20' /></div>
                            </div>
                            {userCustomerDataById && <>
                                <NavLink onClick={() => setShownav(!shownav)} to="/chat-with-astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Chat with Astrologer</NavLink>
                                <div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Talk to Astrologer</div></div>
                                <NavLink onClick={() => setShownav(!shownav)} to="/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Astromall</NavLink>
                                <NavLink onClick={() => setShownav(!shownav)} to="/cart" className='cursor-pointer'>Your Cart</NavLink>
                            </>}
                            <NavLink onClick={() => setShownav(!shownav)} to="/blog" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Blog</NavLink>
                            <div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Book a Pooja</div></div>
                            <div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Free Kundli</div></div>
                            <div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Kundli Matching</div></div>
                            {/* <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='cursor-pointer'>Logout</div> */}
                            {userAstrologerDataById || userCustomerDataById ?
                                <>
                                    <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='cursor-pointer'>Logout</div>
                                </>
                                :
                                <div className='flex flex-col gap-5 flex-wrap'>
                                    <div onClick={handleOpenLoginCustomerModal} className='cursor-pointer'>Login as Customer</div>
                                    <div onClick={handleOpenLoginAstrologerModal} className='cursor-pointer'>Login as Astrologer</div>
                                </div>
                            }
                        </main>
                    </main>
                </article>
            </header>

            {/* Astrologer */}
            <Modal isOpen={loginAstrologerModal} style={customStyles}>
                <div className='flex justify-between items-center bg-primary py-3 px-3'>
                    <div></div>
                    <div className='text-[22px] text-white font-semibold'>Continue with Email & Password</div>
                    <div onClick={handleCloseLoginAstrologerModal} className='cursor-pointer' ><CrossSvg color='#fff' strokeWidth='5' /></div>
                </div>

                <div className='p-5'>
                    <form className='px-5 mt-8 flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-grey'>Enter your email</label>
                            <input name='email' value={astroFieldDetail?.email} onChange={handleInputFieldAstrolger} type='email' placeholder='abc@example.com' className='w-[100%] outline-none bg-greybg px-5 py-3 rounded-md text-sm' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-grey'>Enter your password</label>
                            <input name='password' value={astroFieldDetail?.password} onChange={handleInputFieldAstrolger} type='text' placeholder='P1234567' className='w-[100%] outline-none bg-greybg px-5 py-3 rounded-md text-sm' onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleLoginAstrolger();
                                }
                            }} />
                        </div>
                        <div onClick={handleLoginAstrolger} className='bg-primary text-center text-white rounded-lg p-2 text-[15px] cursor-pointer'>LOGIN</div>
                        <div className='text-[13px] text-grey'>By login, you agree to our <span className='underline text-blue-700'>Terms of Use</span> and <span className='underline text-blue-700'>Privacy Policy</span></div>
                    </form>
                </div>
            </Modal>

            {/* Customer */}
            <Modal isOpen={loginCustomerModal} style={customStyles}>
                <div className='flex justify-between items-center bg-primary py-3 px-3'>
                    <div></div>
                    {otpScreen ? <div className='text-[22px] text-white font-semibold'>Continue with recived OTP</div> : <div className='text-[22px] text-white font-semibold'>Proceed with Your Phone Number</div>}
                    <div onClick={handleCloseLoginCustomerModal} className='cursor-pointer' ><CrossSvg color='#fff' strokeWidth='5' /></div>
                </div>

                {otpScreen ?
                    <div className='p-5'>
                        <main className='px-5 flex flex-col gap-0'>
                            <div className='text-grey pb-3'>Enter your OTP</div>
                            <div className='pb-3'>
                                <input
                                    name='text'
                                    value={customerOtp}
                                    onChange={(e) => setCustomerOtp(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmitOtp(validateOtp, phoneNumber, setOtpScreen, handleCloseLoginCustomerModal, setPhoneNumber);
                                        }
                                    }}
                                    type='text'
                                    placeholder='Enter OTP here'
                                    className={`w-full outline-none bg-greybg px-5 py-3 rounded-md text-sm 
                                     ${otpError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'} 
                                     transition duration-300`}
                                />
                                {otpError && <div className='text-red-400 text-sm'>{otpError}</div>}
                                <div className=' text-green-700 text-sm text-right'>
                                    {resendTimer > 0 ? `Resend OTP in ${resendTimer} seconds` : (
                                        <button onClick={handleResendOtp} className='text-green-700  text-sm  cursor-pointer hover:text-green-600' >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div onClick={() => handleSubmitOtp(validateOtp, phoneNumber, setOtpScreen, handleCloseLoginCustomerModal, setPhoneNumber)}
                                className='bg-primary text-center text-white rounded-lg p-2 text-[15px] cursor-pointer'
                            >
                                Submit
                            </div>
                        </main>
                    </div>


                    :
                    <div className='p-5'>
                        <div className='text-[17px] px-20 text-center'>You will receive a 4 digit code for verification</div>
                        <main className='px-5 mt-8 flex flex-col gap-4'>
                            <div className='text-grey'>Enter your phone number</div>
                            <div className='bg-greybg rounded-lg'>
                                <PhoneInput country={'in'} countryOptions={true}
                                    placeholder='Enter mobile no' value={phoneNumber} onChange={handlePhoneChange}
                                    inputStyle={{ width: '100%', height: '45px', fontSize: "15px", backgroundColor: "#EEEEEE" }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCustomerLogin(phoneNumber);
                                    }}
                                />
                            </div>
                            <div onClick={() => handleCustomerLogin(phoneNumber)} className='bg-primary text-center text-white rounded-lg p-2 text-[15px] cursor-pointer'>GET OTP</div>
                            <div className='text-[13px] text-grey'>By Signing up, you agree to our <span className='underline text-blue-700'>Terms of Use</span> and <span className='underline text-blue-700'>Privacy Policy</span></div>
                        </main>
                    </div>
                }
            </Modal>

            {/* Download App */}
            <DownloadApp isOpen={downloadAppModal} handleCloseModal={handleClosedownloadAppModal} />
        </>
    )
}

export default Header;