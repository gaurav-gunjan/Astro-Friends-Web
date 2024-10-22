import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BagSvg, CallSvg, CartSvg, ChatSvg, CrossSvg, HamburgerSvg, PersonSvg, ProfileSvg, SupportSvg } from '../../assets/svg';
import Logo from '../../assets/images/logo/astro-remedy.png';
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
    const [shownav, setShownav] = useState(false);
    const [screenScroll, setScreenScroll] = useState(false);

    // Todo : Download App Modal 
    const [downloadAppModal, setDownloadAppModal] = useState(false);

    const handleOpenDownloadAppModal = () => {
        setShownav(!shownav)
        setDownloadAppModal(true)
    };
    const handleClosedownloadAppModal = () => setDownloadAppModal(false);

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

    return (
        <>
            <header className={`${screenScroll ? 'bg-white shadow-xl' : 'bg-white text-black'} fixed w-full z-[100] top-0 px-[100px] max-md:px-[20px] py-[10px] transition-all duration-300 text-[14px] font-semibold`}>
                <article>
                    <main className='flex flex-wrap justify-between items-center gap-5'>
                        <Link to={'/'} ><img className='h-16 max-md:h-10' src={'https://astrofriends.in/public/storage/images/AdminLogo1712034903.png'} /></Link>

                        <nav className='flex items-center gap-5 max-lg:hidden'>
                            <Link to={'/astrologer'} className='cursor-pointer bg-primary flex items-center gap-1.5 px-3.5 py-2 rounded-full'>
                                <CallSvg /> <div className='text-white '>Talk To Astrologer</div>
                            </Link>

                            <Link to={'/astrologer'} className='cursor-pointer bg-primary flex items-center gap-1.5 px-3.5 py-2 rounded-full'>
                                <ChatSvg /> <div className='text-white'>Chat With Astrologer</div>
                            </Link>

                            <div className='cursor-pointer flex items-center gap-1.5'>
                                <ProfileSvg />
                                <div>Sign In</div>
                            </div>

                            {/* <div><HamburgerSvg /></div> */}
                        </nav>

                        <>
                            <div onClick={() => setShownav(!shownav)} className={`cursor-pointer xl:hidden ${shownav == true && 'invisible'}`}><HamburgerSvg h={'30'} w={'30'} /></div>
                            <main ref={navRef} className={`pb-40 flex flex-col gap-5 p-5 absolute h-full bg-white text-black border-r border-primary shadow-lg top-0 z-50 min-h-[100vh] w-[80vw] transition-all duration-500 overflow-y-scroll ${shownav ? 'left-0' : 'left-[-80vw]'}`}>

                                <div onClick={() => setShownav(!shownav)} className='flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer'>CLOSE <CrossSvg w={'20'} /></div>
                                <div className='text-center font-semibold text-sm'>WHAT ARE YOU LOOKING FOR?</div>

                                <div className='flex flex-col'>
                                    {userCustomerDataById && <>
                                        <div className='flex items-center gap-1  border-b py-4'>
                                            <div className='border-b-2 border-white'><SupportSvg /></div> <NavLink onClick={() => setShownav(!shownav)} to="/chat-with-astrologer" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "text-primary" : "text-black"}>Chat with Astrologer</NavLink>
                                        </div>

                                        <div className='flex items-center gap-1  border-b py-4'>
                                            <div className='border-b-2 border-white'><SupportSvg /></div><div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Talk to Astrologer</div></div>
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

                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div><div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Book a Pooja</div></div>
                                    </div>

                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div>  <NavLink onClick={() => setShownav(!shownav)} to="/free-kundli" className='cursor-pointer'>Free Kundli</NavLink>
                                    </div>

                                    <div className='flex items-center gap-1  border-b py-4'>
                                        <div className='border-b-2 border-white'><SupportSvg /></div><div className='cursor-pointer' onClick={() => handleOpenDownloadAppModal()}><div>Kundli Matching</div></div>
                                    </div>

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
                        </>
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