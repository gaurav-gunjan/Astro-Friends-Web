import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@react-google-maps/api';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import { RightArrowSvg } from '../../assets/svg';
import { toaster } from '../../utils/services/toast-service';
import { website_name } from '../../utils/constants';

const MyAccount = () => {
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    const autocompleteRef = useRef(null);
    const [activeHead, setActiveHead] = useState('Update Profile');
    const [inputFieldDetail, setInputFieldDetail] = useState({ first_name: '', last_name: '', email: '', phone: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '', longitude: '', description: '' });

    //* Handle Input
    const handleInputFieldDetail = (e) => {
        const { name, value } = e.target;
        setInputFieldDetail({ ...inputFieldDetail, [name]: value })
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        try {
            if (place) {
                const location = place.geometry.location;
                setInputFieldDetail({ ...inputFieldDetail, place_of_birth: place.formatted_address, latitude: location.lat(), longitude: location.lng(), });
            }
        } catch (error) {
            toaster?.info({ text: 'Select Place' })
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { first_name, last_name, email, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = inputFieldDetail;

        let isValid = true;

        if (!first_name) {
            toaster.warning({ text: 'Please Enter First Name' });
            return isValid = false
        }
        if (!last_name) {
            toaster.warning({ text: 'Please Enter Last Name' });
            return isValid = false
        }
        if (!email) {
            toaster.warning({ text: 'Please Enter Email' });
            return isValid = false
        }
        if (!gender) {
            toaster.warning({ text: 'Please Select Gender' });
            return isValid = false
        }
        if (!date_of_birth) {
            toaster.warning({ text: 'Please Enter Date Of Birth' });
            return isValid = false
        }
        if (!time_of_birth) {
            toaster.warning({ text: 'Please Enter Time Of Birth' });
            return isValid = false
        }
        if (!place_of_birth) {
            toaster.warning({ text: 'Please Enter Place Of Birth' });
            return isValid = false
        }
        if (!marital_status) {
            toaster.warning({ text: 'Please Select Marital Status' });
            return isValid = false
        }
        if (!type_of_concern) {
            toaster.warning({ text: 'Please Select Type Of Concern' });
            return isValid = false
        }
        if (!description) {
            toaster.warning({ text: 'Please Enter Description' });
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit
    const handleSubmit = async () => {
        console.log({ ...inputFieldDetail, phone: userCustomerDataById?.phoneNumber });
    };

    return (
        <>
            <TopHeaderSection title={'My Account'} />

            <section className='px-[100px] py-7 max-sm:px-[20px] relative'>
                <article className='shadow-xl p-3 py-10 overflow-hidden bg-[#EFEFEF] rounded-md'>
                    <article>
                        <div className='text-[#666373] text-center text-sm'>View and update your profile in your {website_name} Astro account.</div>
                        <main className='px-7 flex justify-center gap-4 py-[20px]'>
                            {['Update Profile', 'Change Picture']?.map((value, index) => <div onClick={() => setActiveHead(value)} key={index} className={`w-32 text-sm border text-center border-primary ${activeHead == value && 'bg-primary text-white'} hover:scale-105 py-2 rounded-md cursor-pointer flex items-center justify-center transition-all duration-300`}>{value}</div>)}
                        </main>
                        {activeHead == 'Update Profile' && <main className='px-10 py-5 text-[14px] text-[#666373] flex flex-col gap-8'>
                            <div className='flex max-lg:flex-col gap-[20px] max-lg:gap-[15px]'>
                                <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                    <input name='first_name' value={inputFieldDetail?.first_name} onChange={(e) => handleInputFieldDetail(e)} placeholder='First Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <input name='last_name' value={inputFieldDetail?.last_name} onChange={(e) => handleInputFieldDetail(e)} placeholder='Last Name' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <input name='email' type='email' value={inputFieldDetail?.email} onChange={(e) => handleInputFieldDetail(e)} placeholder='Email' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <input name='phone' readOnly value={userCustomerDataById?.phoneNumber} placeholder='Phone' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <select name='gender' value={inputFieldDetail?.gender} onChange={(e) => handleInputFieldDetail(e)} placeholder='Gender' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                        <option value="" className='text-gray-400'>----------Select Gender----------</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input name='date_of_birth' value={inputFieldDetail?.date_of_birth} onChange={(e) => handleInputFieldDetail(e)} placeholder='Date of Birth' type='date' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7PX]' />
                                    <input name='time_of_birth' value={inputFieldDetail?.time_of_birth} onChange={(e) => handleInputFieldDetail(e)} placeholder='Time of Birth' type='time' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7PX]' />
                                </div>
                                <div className='basis-[45%] max-lg:basis-full flex-grow flex flex-col gap-[15px]'>
                                    <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} >
                                        <input name='place_of_birth' value={inputFieldDetail?.place_of_birth} onChange={(e) => handleInputFieldDetail(e)} placeholder='Place of Birth' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    </Autocomplete>
                                    <select name='marital_status' value={inputFieldDetail?.marital_status} onChange={(e) => handleInputFieldDetail(e)} placeholder='marital status' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                        <option value="" className='text-gray-400'>----------Select Marital Status----------</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <select name='type_of_concern' value={inputFieldDetail?.type_of_concern} onChange={(e) => handleInputFieldDetail(e)} placeholder='type of concern' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[7px]' >
                                        <option value="" className='text-gray-400'>----------Select Type of Concern----------</option>
                                        <option value="Career">Career</option>
                                        <option value="Business">Business</option>
                                    </select>
                                    <textarea name='description' rows={6} value={inputFieldDetail?.description} onChange={(e) => handleInputFieldDetail(e)} placeholder='Description' className='bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-[5px]' />
                                    <div onClick={() => handleSubmit()} className='cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-sm px-5 py-2 transition-all duration-500'>Update Profile</div>
                                </div>
                            </div>
                        </main>}

                        {activeHead == 'Change Picture' && <main className='px-10 py-5 text-[14px] text-[#666373] flex flex-col gap-8'>
                            <div className='flex items-center max-lg:flex-col gap-[50px] max-lg:gap-[15px]'>
                                <div className='h-40 w-40 border border-white rounded-md'><img src='' alt='Profile' /></div>
                                <div className='flex flex-col flex-1 gap-5'>
                                    <input type='file' className='cursor-pointer bg-[#f9f9fa] text-primary_bg_dark border border-transparent focus:border-white outline-none w-full rounded-sm px-5 py-1.5' />
                                    <div className='self-end cursor-pointer bg-primary border border-primary hover:bg-orange-400 text-center text-white font-semibold rounded-md px-5 py-2 transition-all duration-500'>Change Picture</div>
                                </div>
                            </div>
                        </main>}
                    </article>
                </article>
            </section>
        </>
    )
}

export default MyAccount;