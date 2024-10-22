import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import * as StaticPageActions from '../../redux/actions/staticPageAction';
import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);
    const dispatch = useDispatch();
    const { privacyPolicyData } = useSelector(state => state?.staticPageReducer);

    useEffect(() => {
        //! Dispatching API For Getting TermsAndConditions
        dispatch(StaticPageActions.getPrivacyPolicy());
    }, []);

    return (
        <>
            <TopHeaderSection title={'Privacy Policy'} />

            <div className='px-[100px] max-lg:px-[20px] max-lg:text-sm py-[50px]'>
                <div dangerouslySetInnerHTML={{ __html: privacyPolicyData }}></div>
            </div>
        </>
    )
}

export default PrivacyPolicy;