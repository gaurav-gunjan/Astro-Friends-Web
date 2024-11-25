import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { WalletSvg } from '../../assets/svg';
import { IndianRupee } from '../../utils/common-function';
import TopHeaderSection from '../../components/common/TopHeaderSection';

const MyWallet = () => {
    const navigate = useNavigate();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    return (
        <>
            <TopHeaderSection title={'Your Transactions'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <div>Check your balance, add money and see your complete transaction history here</div>

                    <div className='border border-primary rounded-md p-5 flex items-center justify-between gap-5 bg-orange-100'>
                        <div className='flex items-center gap-7'><WalletSvg /> Wallet : {IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                        <div onClick={() => navigate('/recharge')} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-sm rounded-md text-white font-semibold px-3 py-1.5 transition-all duration-500'>Add Money</div>
                    </div>

                    <main>

                    </main>

                </article>
            </section>
        </>
    )
}

export default MyWallet;