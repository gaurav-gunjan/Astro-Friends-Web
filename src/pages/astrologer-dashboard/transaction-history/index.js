import React from 'react';
import TopHeaderSection from '../../../components/common/TopHeaderSection';

const TransactionHistory = () => {
    return (
        <>
            <TopHeaderSection title={'Transaction History'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article>
                    <main>
                        <div className='bg-primary py-3 flex  items-center justify-center px-10 relative rounded-t-md'>
                            <div className='font-semibold text-white text-lg tracking-wider text-center'>Transaction History</div>
                        </div>

                        <div className="border w-full border-gray-100 flex items-start rounded-md min-h-[150px] overflow-x-scroll custom-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-2">
                                <thead>
                                    <tr className="text-center text-sm shadow-md text-nowrap">
                                        <th className="p-[12px_15px] font-[600]">Customer Name</th>
                                        <th className="p-[12px_15px] font-[600]">Service Type</th>
                                        <th className="p-[12px_15px] font-[600]">Total Amount</th>
                                        <th className="p-[12px_15px] font-[600]">Duration</th>
                                        <th className="p-[12px_15px] font-[600]">Date & Time</th>
                                        <th className="p-[12px_15px] font-[600]">Platform Charges</th>
                                        <th className="p-[12px_15px] font-[600]">Astrologer Earning</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-800'>
                                    {Array(5)?.fill('')?.map((value, index) => (
                                        <tr key={index} className={`text-sm`}>
                                            <td className="w-[400px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                            <td className="w-[200px] bg-[#F6F6F6] text-center p-[8px_10px] box-border text-[14px] outline-none">Test</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </article>
            </section>
        </>
    )
}

export default TransactionHistory;