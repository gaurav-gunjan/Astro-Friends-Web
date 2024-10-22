import React from "react";
import MainDatatable from "../../components/table/MainDatatable";
import { IndianRupee } from "../../utils/common-function";
import { DeleteSvg } from "../../assets/svg";
import TopHeaderSection from "../../components/common/TopHeaderSection";

const MyWallet = () => {

  const data = [
    {
      Description: 'Purchase at Store A',
      Invoice: 'INV-1001',
      Transaction: 150.75,
      Datetime: '2024-07-01 14:32:00',
      Status: 'Completed'
    },
    {
      Description: 'Subscription Payment',
      Invoice: 'INV-1002',
      Transaction: 19.99,
      Datetime: '2024-07-02 10:00:00',
      Status: 'Pending'
    },
    {
      Description: 'Refund from Store B',
      Invoice: 'INV-1003',
      Transaction: -45.00,
      Datetime: '2024-07-02 09:15:00',
      Status: 'Completed'
    },
    {
      Description: 'Online Course Payment',
      Invoice: 'INV-1004',
      Transaction: 120.00,
      Datetime: '2024-07-01 08:45:00',
      Status: 'Failed'
    },
    {
      Description: 'Utility Bill Payment',
      Invoice: 'INV-1005',
      Transaction: 75.50,
      Datetime: '2024-07-01 12:30:00',
      Status: 'Completed'
    }
  ];

  // Define columns for the table
  const columns = [
    { name: 'Description', selector: row => row?.Description, sortable: true, },
    { name: "Invoice", selector: row => row?.Invoice, sortable: true, },
    { name: "Transaction Amount", selector: row => row?.Transaction, sortable: true, },
    { name: 'Datetime', selector: row => row?.Datetime, sortable: true, },
    {
      name: 'Action',
      cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
        <div style={{ cursor: "pointer" }}><DeleteSvg /></div>
      </div >,
      right: true

    },

  ];



  return (
    <>
      <TopHeaderSection title={'My Wallet'} />

      <section className='px-[80px] py-[50px] max-md:px-[20px]'>
        <article>
          <div className='text-2xl text-center font-[600]'>Transaction</div>

          <main className="flex flex-wrap gap-0 justify-between">
            <div className='flex items-center ' >
              <div className=" text-green-500  text-sm mr-2" > Available Balance:  {IndianRupee(50)} </div>
              <div className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
            </div>
            <div className='border border-red-500 text-red-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Delete</div>
          </main>

          <div className="">
            <MainDatatable title={'Transaction Data'} data={data} columns={columns} />
          </div>

        </article>
      </section>
    </>
  );
}

export default MyWallet;