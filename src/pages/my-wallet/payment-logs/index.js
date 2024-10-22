import React from "react";
import { IndianRupee } from "../../../utils/common-function";
import MainDatatable from "../../../components/table/MainDatatable";
import { DeleteSvg } from "../../../assets/svg";


const PaymentLog = () => {

    const data = [
        {
            id: 1, Datetime: '2024-07-02 10:15:00', Amount: '$100.00', Transaction: 'Payment', Status: 'Completed', Action: 'View Details'
        },
        {
            id: 2, Datetime: '2024-07-01 15:30:00', Amount: '$50.25', Transaction: 'Withdrawal', Status: 'Pending', Action: 'Approve'
        },
        {
            id: 3, Datetime: '2024-06-30 09:45:00', Amount: '$75.50', Transaction: 'Deposit', Status: 'Completed', Action: 'Edit'
        },
        {
            id: 4, Datetime: '2024-06-29 12:00:00', Amount: '$120.75', Transaction: 'Payment', Status: 'Failed', Action: 'Retry'
        },
        {
            id: 5, Datetime: '2024-06-28 14:20:00', Amount: '$200.00', Transaction: 'Withdrawal', Status: 'Completed', Action: 'View Details'
        },
    ];

    // Define columns for the table
    const columns = [
        { name: ' ', selector: row => "Recharge", sortable: true, style: { fontWeight: '600', fontSize: '16px', color: 'black' }, },
        { name: 'Datetime', selector: row => row?.Datetime, sortable: true, },
        { name: "Amount", selector: row => row?.Amount, sortable: true, },
        { name: "Transaction", selector: row => row?.Transaction, sortable: true, },
        { name: 'Status', selector: row => row?.Status, sortable: true, },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            right: true
        },

    ];



    return (
        <section className='px-[80px] py-[50px] max-md:px-[20px]'>
            <article>
                <div className='text-2xl text-center font-[600]'>Transaction</div>

                <main className="flex flex-wrap gap-0 justify-between">
                    
                        <div className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
                    <div className='border border-red-500 text-red-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Delete</div>
                </main>

                <div className="">
                    <MainDatatable title={'Transaction Data'} data={data} columns={columns} />
                </div>

            </article>
        </section>
    );
}

export default PaymentLog;