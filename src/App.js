import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadScript } from '@react-google-maps/api';
import { google_api_keys } from './utils/constants';
import { database, generateTokenByRequestPermission, onMessageListener, onValue, ref } from './config/firebase-config';
import SocketService from './utils/services/socket-service';
import * as UserActions from './redux/actions/userAction';
import * as ChatActions from './redux/actions/chatAction';

// TODO : Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SubFooter from './components/common/SubFooter';
import Loading from './components/features/Loading';
import NotFound from './components/features/NotFound';
import RatingModal from './components/modal/RatingModal';
import ChatInvoiceModal from './components/modal/ChatInvoiceModal';
import CallInvoiceModal from './components/modal/CallInvoiceModal';

//! Lazy Load Pages
const LandingPage = lazy(() => import('./pages/landing-page'));

const Astrologer = lazy(() => import('./pages/astrologer'));
const SingleAstrologer = lazy(() => import('./pages/astrologer/name'));
const CustomerAcceptReject = lazy(() => import('./pages/chat/customer-accept-reject'));
const AstrologerAcceptReject = lazy(() => import('./pages/chat/astrologer-accept-reject'));
const Chat = lazy(() => import('./pages/chat'));
const IntakeDetails = lazy(() => import('./pages/chat/intake-details'));

const FreeKundli = lazy(() => import('./pages/free-kundli'));
const KundliId = lazy(() => import('./pages/free-kundli/kundliId'));

const KundliMatching = lazy(() => import('./pages/kundli-matching'));

const DailyHoroscope = lazy(() => import('./pages/horoscope/daily-horoscope'));
const DailyHoroscopeDetails = lazy(() => import('./pages/horoscope/daily-horoscope/horoscope-details'));
const MonthlyHoroscope = lazy(() => import('./pages/horoscope/montly-horoscope'));
const MonthlyHoroscopeDetails = lazy(() => import('./pages/horoscope/montly-horoscope/horoscope-details'));
const YearlyHoroscope = lazy(() => import('./pages/horoscope/yearly-horoscope'));

const AstroMall = lazy(() => import('./pages/astro-mall'));
const Products = lazy(() => import('./pages/astro-mall/products'));
const ProductDetails = lazy(() => import('./pages/astro-mall/products/product-details'));
const Cart = lazy(() => import('./pages/astro-mall/cart'));

const Recharge = lazy(() => import('./pages/recharge'));
const PaymentDetail = lazy(() => import('./pages/recharge/payment-detail'));

const Blog = lazy(() => import('./pages/blog'));
const BlogDetails = lazy(() => import('./pages/blog/blog-details'));

const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const TermsOfUse = lazy(() => import('./pages/terms-of-use'));

const App = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    generateTokenByRequestPermission();

    // Listen for foreground messages
    onMessageListener(navigate, dispatch);

    SocketService.initializeSocket(dispatch, navigate);

  }, [dispatch, navigate]);

  useEffect(() => {
    const user_type = localStorage.getItem('user_type');
    const current_user_id = localStorage.getItem('current_user_id');

    if (user_type == 'customer') {
      dispatch(UserActions.getUserCustomerById({ customerId: current_user_id }))
    }

    if (user_type == 'astrologer') {
      dispatch(UserActions.getUserAstrologerById({ astrologerId: current_user_id }))
    }
  }, []);

  useEffect(() => {
    const user_type = localStorage.getItem('user_type');
    const current_user_id = localStorage.getItem('current_user_id');

    if (user_type == 'astrologer') {
      const messagesRef = ref(database, `CurrentCall/${current_user_id}`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          dispatch(ChatActions.callIntakeDetailData({ visible: true, profileId: data?.formId }))
        } else {
          dispatch(ChatActions.callIntakeDetailData({ visible: false, profileId: null }))
        }
      });
    };
  }, []);

  //! Scrolling 
  const scrollToSection = (sectionId) => {
    console.log("Section ID ::: ", sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If the section is not found, navigate to the home page
      navigate('/');
      setTimeout(() => {
        const homeSection = document.getElementById(sectionId);
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey={google_api_keys} libraries={['places']} loadingElement={<Loading />}>
        <Header />
        <Suspense >
          {/* fallback={<Loading />} */}
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<LandingPage />} />

            {/* Chat */}
            {/* {localStorage.getItem('user_type') == 'customer' && <Route path='/astrologer' element={<Astrologer />} />} */}
            <Route path='/astrologer' element={<Astrologer />} />
            <Route path='/astrologer/:name' element={<SingleAstrologer />} />
            <Route path='/chat/customer-accept-reject' element={<CustomerAcceptReject />} />
            <Route path='/chat/astrologer-accept-reject' element={<AstrologerAcceptReject />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/chat/intake-details/:profileId' element={<IntakeDetails />} />

            {/* Free Kundli */}
            {/* localStorage.getItem('user_type') == 'customer' &&  */}
            <Route path='/free-kundli' element={<FreeKundli />} />
            <Route path='/free-kundli/:kundliId' element={<KundliId />} />

            {/* Kundli Matching */}
            <Route path='/kundli-matching' element={<KundliMatching />} />

            {/* Horoscope */}
            <Route path='/horoscope/daily' element={<DailyHoroscope />} />
            <Route path='/horoscope/daily/:zodiacSign' element={<DailyHoroscopeDetails />} />
            <Route path='/horoscope/monthly' element={<MonthlyHoroscope />} />
            <Route path='/horoscope/monthly/:zodiacSign' element={<MonthlyHoroscopeDetails />} />
            <Route path='/horoscope/yearly' element={<YearlyHoroscope />} />

            {/* Astro Mall */}
            <Route path='/astro-mall' element={<AstroMall />} />
            <Route path='/astro-mall/products' element={<Products />} />
            <Route path='/astro-mall/products/:name' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />

            {/* Price List */}
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/recharge/payment-details' element={<PaymentDetail />} />

            {/* Blog */}
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/blog-details' element={<BlogDetails />} />

            {/* Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />

          </Routes>
        </Suspense>
        {location?.pathname !== '/chat' && <Footer scrollToSection={scrollToSection} />}
        {location?.pathname !== '/chat' && <SubFooter />}

        <ChatInvoiceModal />
        <CallInvoiceModal />
        <RatingModal />
        <ToastContainer />
      </LoadScript>
    </>
  )
}

export default App;