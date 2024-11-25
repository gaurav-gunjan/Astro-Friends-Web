import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CallSvg, ChatSvg, CrossSvg, HamburgerSvg, LogoutSvg, PersonSvg, ProfileSvg, SupportSvg, WalletOutlineSvg, WalletSvg } from '../../assets/svg';
import DownloadApp from '../cards/DownloadApp';
import CustomerLoginModal from '../modal/CustomerLoginModal';
import AstrologerLoginModal from '../modal/AstrologerLoginModal';
import * as AuthActions from '../../redux/actions/authAction';
import { generateTokenByRequestPermission } from '../../config/firebase-config';

Modal.setAppElement('#root');

const Header = () => {
    const navRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById, userAstrologerDataById } = useSelector(state => state?.userReducer);
    const [hamburger, setHamburger] = useState(false);
    const [shownav, setShownav] = useState(false);
    const [screenScroll, setScreenScroll] = useState(false);

    // Todo : Download App Modal 
    const [downloadAppModal, setDownloadAppModal] = useState(false);

    const handleOpenDownloadAppModal = () => {
        setShownav(!shownav)
        setDownloadAppModal(true)
    };
    const handleClosedownloadAppModal = () => setDownloadAppModal(false);

    //! Handle Resize and Scroll Event Listener 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setShownav(false)
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 60) setScreenScroll(true);
            else setScreenScroll(false);
        }

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShownav(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        if (shownav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [shownav]);

    // Todo : Astrolger Login Start
    const [loginAstrologerModal, setLoginAstrologerModal] = useState(false);

    const handleOpenLoginAstrologerModal = async () => {
        setShownav(false);
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginAstrologerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    const handleCloseLoginAstrologerModal = () => setLoginAstrologerModal(false);

    // Todo : Customer Login Start
    const [loginCustomerModal, setLoginCustomerModal] = useState(false);

    const handleOpenLoginCustomerModal = async () => {
        setShownav(false);
        console.log('Astrologer login button clicked');

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            generateTokenByRequestPermission();
            setLoginCustomerModal(true)

        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };
    const handleCloseLoginCustomerModal = () => setLoginCustomerModal(false);

    return (
        <>
            <header className={`${screenScroll ? 'bg-white shadow-xl' : 'bg-white text-black'} fixed w-full z-[1000] top-0 transition-all duration-300 text-[14px] font-semibold`}>
                <article>
                    <main className='flex flex-wrap justify-between items-center gap-5 relative z-10 px-[100px] max-md:px-[20px] py-[10px]'>
                        <Link to={'/'} ><img className='h-16 max-md:h-10' src={'https://astrofriends.in/public/storage/images/AdminLogo1712034903.png'} /></Link>

                        <nav className='flex items-center gap-5 max-lg:hidden'>
                            <Link to={'/astrologer'} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-5 py-2 shadow-lg rounded-full'>
                                <CallSvg /> <div>Talk To Astrologer</div>
                            </Link>

                            <Link to={'/astrologer'} className='cursor-pointer bg-primary text-white flex items-center gap-1.5 px-5 py-2 shadow-lg rounded-full'>
                                <ChatSvg /> <div>Chat With Astrologer</div>
                            </Link>

                            {!userCustomerDataById && !userAstrologerDataById && <div onClick={handleOpenLoginCustomerModal} className='flex items-center gap-1.5 cursor-pointer'><ProfileSvg /><div>Sign In</div></div>}

                            {userAstrologerDataById && <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='flex items-center gap-1 cursor-pointer'>
                                <ProfileSvg /> <div>{userAstrologerDataById?.astrologerName}</div>
                            </div>}

                            {userCustomerDataById &&
                                <div className='group  relative'>
                                    <div className='flex items-center gap-1 cursor-pointer'><ProfileSvg /> <div>{userCustomerDataById?.customerName}</div></div>

                                    <div className='font-normal absolute overflow-hidden top-16 right-0 bg-white w-48 h-0 group-hover:h-[230px] transition-all duration-500 ease-in group-hover:border-b shadow-2xl'>
                                        <div className='flex flex-col items-center gap-3 py-5'>
                                            <ProfileSvg h='40' w='40' />
                                            <div>XXXXXX{userCustomerDataById?.phoneNumber?.toString()?.substring(6, 10)}</div>
                                        </div>
                                        <div onClick={() => navigate('/my-account')} className='flex items-center gap-3 border-t py-2 px-3 cursor-pointer'><PersonSvg /><div>My Account</div></div>
                                        <div onClick={() => navigate('/my-wallet')} className='flex items-center gap-3 border-t py-2 px-3 cursor-pointer'><WalletOutlineSvg h='20' w='20' /><div>My Wallet</div></div>
                                        <div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='flex items-center gap-3 border-t py-2 px-3 cursor-pointer'><LogoutSvg h='20' w='20' /><div>Logout</div></div>
                                    </div>
                                </div>}

                            {hamburger ? <div onClick={() => setHamburger(!hamburger)} className='cursor-pointer'><CrossSvg h='30' w='30' /></div> : <div onClick={() => setHamburger(!hamburger)} className='cursor-pointer'><HamburgerSvg h='30' w='30' /></div>}

                            <div className={`bg-primary text-white w-full left-0 top-[84px] ${hamburger ? 'h-[380px] py-[40px]' : 'h-0'} overflow-hidden transition-all duration-500 absolute px-[100px]`}>
                                <article className='flex flex-wrap gap-x-10 gap-y-10 font-[400] text-[14px]'>
                                    <main className='basis-[20%] flex flex-col gap-2'>
                                        <div className='text-[17px] font-[500] mb-2 uppercase border-b'>Astrology Online</div>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Talk To Astrologer</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Chat With Astrologer</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>New category</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Maritial Life</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Kids</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Education</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Finance & Business</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Career & Job</Link>
                                        <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Love & Relationship</Link>
                                    </main>

                                    <main className='basis-[20%]  flex flex-col gap-8'>
                                        <main className='flex flex-col gap-2'>
                                            <div className='text-[17px] font-[500] mb-2 uppercase border-b'>Astrology</div>
                                            <Link to='/kundli-matching' onClick={() => setHamburger(!hamburger)}>Kundli Matching</Link>
                                            <Link to='/free-kundli' onClick={() => setHamburger(!hamburger)}>Free Janam Kundli</Link>
                                        </main>

                                        <main className='flex flex-col gap-2'>
                                            <div className='text-[17px] font-[500] mb-2 uppercase border-b'>Horoscope</div>
                                            <Link to='/horoscope/daily' onClick={() => setHamburger(!hamburger)}>Daily Horoscope</Link>
                                            <Link to='/horoscope/monthly' onClick={() => setHamburger(!hamburger)}>Monthly Horoscope</Link>
                                            <Link to='/horoscope/yearly' onClick={() => setHamburger(!hamburger)}>Yearly Horoscope</Link>
                                        </main>
                                    </main>

                                    <main className='basis-[20%] flex flex-col gap-8'>
                                        <main className='flex flex-col gap-2'>
                                            <div className='text-[17px] font-[500] mb-2 uppercase border-b'>Panchang</div>
                                            <Link to='/astrologer' onClick={() => setHamburger(!hamburger)}>Today's Panchang</Link>
                                        </main>

                                        <main className='flex flex-col gap-2'>
                                            <div className='text-[17px] font-[500] mb-2 uppercase border-b'>Report</div>
                                            <div onClick={() => setHamburger(!hamburger)} className='cursor-pointer'>Get Report</div>
                                        </main>
                                    </main>
                                </article>
                            </div>
                        </nav>

                        <div onClick={() => setShownav(!shownav)} className={`cursor-pointer lg:hidden ${shownav == true && 'invisible'}`}><HamburgerSvg h={'30'} w={'30'} /></div>
                    </main>

                    <main ref={navRef} className={`pb-40 flex flex-col gap-5 p-5 absolute h-full bg-white text-black border-r border-primary shadow-lg top-0 z-50 min-h-[100vh] w-[80vw] transition-all duration-500 overflow-y-scroll ${shownav ? 'left-0' : 'left-[-80vw]'}`}>

                        <div onClick={() => setShownav(!shownav)} className='flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer'>CLOSE <CrossSvg w={'20'} /></div>
                        <div className='text-center font-semibold text-sm'>WHAT ARE YOU LOOKING FOR?</div>

                        <div className='flex flex-col'>
                            {userCustomerDataById && <>
                                <div className='flex items-center gap-1  border-b py-4'>
                                    <div className='border-b-2 border-white'><SupportSvg /></div> <NavLink onClick={() => setShownav(!shownav)} to="/astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Chat with Astrologer</NavLink>
                                </div>

                                <div className='flex items-center gap-1  border-b py-4'>
                                    <div className='border-b-2 border-white'><SupportSvg /></div><NavLink onClick={() => setShownav(!shownav)} to="/astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Talk to Astrologer</NavLink>
                                </div>

                                <div className='flex items-center gap-1  border-b py-4'>
                                    <div className='border-b-2 border-white'><SupportSvg /></div> <NavLink onClick={() => setShownav(!shownav)} to="/astro-mall" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Astromall</NavLink>
                                </div>

                                <div className='flex items-center gap-1  border-b py-4'>
                                    <div className='border-b-2 border-white'><SupportSvg /></div>  <NavLink onClick={() => setShownav(!shownav)} to="/cart" className='cursor-pointer'>Your Cart</NavLink>
                                </div>
                            </>}

                            <div className='flex items-center gap-1  border-b py-4'>
                                <div className='border-b-2 border-white'><SupportSvg /></div><NavLink onClick={() => setShownav(!shownav)} to="/blog" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Blog</NavLink>
                            </div>

                            {/* <div className='flex items-center gap-1  border-b py-4'>
                                <div className='border-b-2 border-white'><SupportSvg /></div><div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Book a Pooja</div></div>
                            </div> */}

                            <div className='flex items-center gap-1  border-b py-4'>
                                <div className='border-b-2 border-white'><SupportSvg /></div><NavLink onClick={() => setShownav(!shownav)} to="/free-kundli" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Free Kundli</NavLink>
                            </div>

                            {/* <div className='flex items-center gap-1  border-b py-4'>
                                <div className='border-b-2 border-white'><SupportSvg /></div><div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Kundli Matching</div></div>
                            </div> */}

                            {userAstrologerDataById || userCustomerDataById ?
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div><div onClick={() => dispatch(AuthActions.userLogout({ onComplete: () => navigate('/') }))} className='cursor-pointer'>Logout</div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div><div onClick={handleOpenLoginCustomerModal} className='cursor-pointer'>Login as Customer</div>
                                    </div>
                                    <div className='flex items-center gap-1 border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div><div onClick={handleOpenLoginAstrologerModal} className='cursor-pointer'>Login as Astrologer</div>
                                    </div>
                                </>
                            }
                        </div>
                    </main>
                </article>
            </header>
            {shownav && (<div className="fixed top-0 left-0 w-full h-full transition-all ease-in duration-300 bg-black bg-opacity-50 z-40" />)}

            {/* Astrologer Modal */}
            <AstrologerLoginModal isOpen={loginAstrologerModal} handleCloseModal={handleCloseLoginAstrologerModal} />

            {/* Customer Modal */}
            <CustomerLoginModal isOpen={loginCustomerModal} handleCloseModal={handleCloseLoginCustomerModal} />

            {/* Download App */}
            <DownloadApp isOpen={downloadAppModal} handleCloseModal={handleClosedownloadAppModal} />
        </>
    )
}

export default Header;