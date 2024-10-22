import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Modal from 'react-modal';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';
import Profile from '../../../assets/images/logo/profile.jpg';
import RadioButton from '../../../components/button/RadioButton';
import { CrossSvg, StarSvg, VerifySvg } from '../../../assets/svg';
import { api_urls } from '../../../utils/api-urls';
import { DateDifference, IndianRupee, ParseDateTime, YYYYMMDD } from '../../../utils/common-function';
import * as ChatActions from '../../../redux/actions/chatAction';
import * as AstrologerActions from '../../../redux/actions/astrologerAction';
import Swal from 'sweetalert2';
import DownloadApp from '../../../components/cards/DownloadApp';
import { Color } from '../../../assets/colors';
import TopHeaderSection from '../../../components/common/TopHeaderSection';
import { Autocomplete } from '@react-google-maps/api';

Modal.setAppElement('#root');

const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', padding: 0, borderRadius: "5px", minWidth: "400px", maxWidth: "900px", maxHeight: "500px" }, };

const SingleAstrologer = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location?.state?.stateData;
    const astrologerId = stateData?._id;

    const dispatch = useDispatch();
    const { astrologerDataById, astrologerReviewDataById } = useSelector(state => state?.astrologerReducer);
    const reversedAstrologerReviewData = [...astrologerReviewDataById].reverse();
    const { linkedProfileData } = useSelector(state => state?.chatReducer);
    const { userCustomerDataById } = useSelector(state => state?.userReducer);

    //! Call Modal 
    const [callModal, setCallModal] = useState(false);
    const handleOpenCallModal = () => setCallModal(true);
    const handleCloseCallModal = () => setCallModal(false);

    // TODO : Linked profile
    const [linkedProfileModal, setLinkedProfileModal] = useState(false);
    const handleOpenLinkedProfileModal = () => setLinkedProfileModal(true);
    const handleCloseLinkedProfileModal = () => setLinkedProfileModal(false);
    const [selectedLinkedProfileData, setSelectedLinkedProfileData] = useState({});

    //* Handle Select : Linked Profile Data
    const handleSelectedLinkedProfileData = (data) => {
        setChatIntakeDetail({
            isNewProfile: false, first_name: data?.firstName, last_name: data?.lastName, gender: data?.gender, date_of_birth: moment(data?.dateOfBirth).format('YYYY-MM-DD'), time_of_birth: moment(data?.timeOfBirth).format('HH:mm'), place_of_birth: data?.placeOfBirth, marital_status: data?.maritalStatus, type_of_concern: data?.topic_of_concern, latitude: data?.latitude, longitude: data?.longitude, description: data?.description
        })
        setSelectedLinkedProfileData(data);
    };

    // TODO : Chat Intake Form 
    const [connectionType, setConnectionType] = useState(false);
    const [chatIntakeFormModal, setChatIntakeFormModal] = useState(false);
    const handleOpenChatIntakeFormModal = async (type) => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
        } else if (Notification.permission === "granted") {
            setChatIntakeFormModal(true);
            setConnectionType(type);
        } else if (Notification.permission === "denied") {
            alert("You have blocked notifications. Please enable them in your browser settings.");

        } else if (Notification.permission === "default") {
            console.log('Requesting Notification Permission');
            const permission = await Notification.requestPermission();
        }
    };

    const handleCloseChatIntakeFormModal = () => {
        setChatIntakeFormModal(false);
        setChatIntakeDetail({
            isNewProfile: true, first_name: '', last_name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '20.5937', longitude: '78.9629', description: ''
        })
        setSelectedLinkedProfileData({})
    };

    const [chatIntakeDetail, setChatIntakeDetail] = useState({
        isNewProfile: true, first_name: '', last_name: '', gender: '', date_of_birth: '', time_of_birth: '', place_of_birth: '', marital_status: '', type_of_concern: '', latitude: '', longitude: '', description: ''
    });
    const autocompleteRef = useRef(null);

    //* Handle Input : Chat Intake Form Data
    const handleChatIntakeDetail = (e) => {
        const { name, value } = e.target;
        setChatIntakeDetail({ ...chatIntakeDetail, [name]: value })
    };

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place) {
            const location = place.geometry.location;
            setChatIntakeDetail({
                ...chatIntakeDetail,
                place_of_birth: place.formatted_address,
                latitude: location.lat(),
                longitude: location.lng(),
            });
        }
    };

    //* Handle Validation For Intake Form Data
    const handleValidation = () => {
        const { first_name, last_name, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = chatIntakeDetail;

        let isValid = true;

        if (!first_name) {
            toast.error('Please Enter First Name')
            return isValid = false
        }
        if (!last_name) {
            toast.error('Please Enter Last Name')
            return isValid = false
        }
        if (!gender) {
            toast.error('Please Select Gender')
            return isValid = false
        }
        if (!date_of_birth) {
            toast.error('Please Enter Date Of Birth')
            return isValid = false
        }
        if (!time_of_birth) {
            toast.error('Please Enter Time Of Birth')
            return isValid = false
        }
        if (!place_of_birth) {
            toast.error('Please Enter Place Of Birth')
            return isValid = false
        }
        if (!marital_status) {
            toast.error('Please Select Marital Status')
            return isValid = false
        }
        if (!type_of_concern) {
            toast.error('Please Select Type Of Concern')
            return isValid = false
        }
        if (!description) {
            toast.error('Please Enter Description')
            return isValid = false
        }

        return isValid;
    }

    //! Handle Submit : Chat Intake Form Data
    const handleSubmitChatIntakeForm = async () => {
        console.log({ ...chatIntakeDetail });

        if (handleValidation()) {
            const { isNewProfile, first_name, last_name, gender, date_of_birth, time_of_birth, place_of_birth, marital_status, type_of_concern, description, latitude, longitude } = chatIntakeDetail;

            const payload = {
                isNewProfile: isNewProfile,
                profileData: { firstName: first_name, lastName: last_name, gender: gender, dateOfBirth: date_of_birth, timeOfBirth: ParseDateTime(date_of_birth, time_of_birth), placeOfBirth: place_of_birth, maritalStatus: marital_status, topic_of_concern: type_of_concern, latitude, longitude, description },
                selectedProfileId: selectedLinkedProfileData?._id ?? null,
                chatPrice: Number(astrologerDataById?.chat_price) + Number(astrologerDataById?.commission_chat_price),
                astrologerId: astrologerId,
                // type: astrologerDataById?.type,
                type: connectionType,
                onComplete: () => {
                    handleCloseChatIntakeFormModal();
                    navigate('/astrologer');
                }
            }
            console.log("Payload ::: ", payload);

            //! Dispatch Chat Request : Send By Customer 
            dispatch(ChatActions.chatRequestSendByCustomer(payload));
        }
    };

    useEffect(() => {
        //! Dispatching API For Getting Single Astrologer
        dispatch(ChatActions.getLinkedProfileForChat({ customerId: localStorage.getItem('current_user_id') }))

        //! Dispatching API For Getting Single Astrologer
        dispatch(AstrologerActions.getAstrologerById({ astrologerId }))

        //! Dispatching API For Getting Single Astrologer Review
        dispatch(AstrologerActions.getAstrologerReviewById({ astrologerId: astrologerId }))
    }, []);

    return (
        <>
            <TopHeaderSection title={astrologerDataById?.astrologerName} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-5'>
                    <main className='border rounded-lg p-6 flex flex-col gap-y-14'>
                        <main className='flex flex-wrap gap-x-7 gap-y-5'>
                            <div className='flex flex-col gap-y-4'>
                                <div><img src={api_urls + astrologerDataById?.profileImage} className='h-52 w-52 rounded-[50%]' /></div>
                                {/* <div className='flex justify-center'><div className='bg-primary text-white font-semibold py-1 px-5 rounded-md'>Follow</div></div> */}
                            </div>

                            <div className='flex flex-col gap-y-3 text-grey text-lg'>
                                <div className='text-2xl font-semibold text-black flex items-center gap-3'>{astrologerDataById?.astrologerName}</div>
                                {/* {astrologerDataById?.chat_status == "online" ? <VerifySvg color='green' /> : <VerifySvg color='red' />} */}

                                <div>{astrologerDataById?.skill?.length > 0 && astrologerDataById?.skill?.map(value => value?.skill)?.join(' , ')}</div>
                                <div>{astrologerDataById?.language?.length > 0 ? astrologerDataById?.language?.join(' , ') : "Hindi"}</div>
                                <div>Exp: {astrologerDataById?.experience} Years</div>
                                <div className='text-grey font-semibold'>{IndianRupee(astrologerDataById?.chat_price)}/min</div>
                                {/* <div className='flex  gap-x-10'>
                                    <div className='text-grey font-semibold'>22K <span className='font-normal'>mins</span></div>
                                    <div className='text-grey font-semibold'>9K <span className='font-normal'>mins</span></div>
                                </div> */}

                                <div className='flex flex-wrap gap-x-3 gap-y-3 mt-4 text-[15px]'>
                                    <button onClick={async () => {
                                        if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.chat_price) * 5) {
                                            console.log(Number(userCustomerDataById?.wallet_balance));
                                            console.log(Number(astrologerDataById?.chat_price) * 5);
                                            const result = await Swal.fire({
                                                icon: "warning", title: "Warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000,
                                                confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey
                                            });
                                            console.log('result', result)
                                            if (result.isConfirmed) {
                                                navigate('/price-list')
                                            }
                                        } else {
                                            handleOpenChatIntakeFormModal('Chat')
                                        }
                                    }} disabled={astrologerDataById?.chat_status != "online"} className={`flex justify-center items-center gap-2 border border-primary text-primary px-24 py-2 rounded-[50px] ${astrologerDataById?.chat_status != "online" && 'cursor-not-allowed'}`}>
                                        <span>Start Chat</span> <span>{astrologerDataById?.chat_status == "online" ? <VerifySvg color='green' /> : <VerifySvg color='red' />}</span>
                                    </button>

                                    <button onClick={async () => {
                                        if (Number(userCustomerDataById?.wallet_balance) < Number(astrologerDataById?.call_price) * 5) {
                                            console.log(Number(userCustomerDataById?.wallet_balance));
                                            console.log(Number(astrologerDataById?.call_price) * 5);
                                            const result = await Swal.fire({
                                                icon: "warning", title: "Warning", text: "Please Recharge Your Wallet", showConfirmButton: true, timer: 20000,
                                                confirmButtonText: "Recharge", confirmButtonColor: Color.primary, cancelButtonText: "Cancel", showCancelButton: true, cancelButtonColor: Color.darkgrey
                                            });
                                            console.log('result', result)
                                            if (result.isConfirmed) {
                                                navigate('/price-list')
                                            }
                                        } else {
                                            handleOpenChatIntakeFormModal('Call')
                                        }
                                    }} disabled={astrologerDataById?.call_status != "online"} className={`flex justify-center items-center gap-2 border border-primary text-primary px-24 py-2 rounded-[50px] ${astrologerDataById?.call_status != "online" && 'cursor-not-allowed'}`}>
                                        <span>Start Call</span> <span>{astrologerDataById?.call_status == "online" ? <VerifySvg color='green' /> : <VerifySvg color='red' />}</span>
                                    </button>
                                </div>
                            </div>
                        </main>

                        <div>
                            <div className='text-center font-semibold text-xl mb-3'>About me</div>
                            <div className='text-justify text-grey'>{astrologerDataById?.long_bio}</div>
                        </div>
                    </main>

                    <main className='flex flex-wrap gap-5 items-start'>
                        <div className='border rounded-lg basis-[100%] max-sm:basis-[100%] p-5'>
                            <div className='font-semibold'>Ratings & Reviews</div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <div className='text-5xl'>{astrologerDataById?.rating?.toFixed(2)}</div>
                                <ReactStars count={5} edit={false} value={astrologerDataById?.rating} size={24} color2={'#ffd700'} />
                            </div>
                        </div>

                        <div className='flex-grow basis-[100%] max-sm:basis-[100%] flex flex-col gap-5'>
                            <div className='border rounded-lg p-5 flex flex-col gap-4'>
                                <div className='font-semibold'>User Review</div>
                                <main className='flex flex-col gap-3'>
                                    {reversedAstrologerReviewData.length > 0 ? reversedAstrologerReviewData.map((value, index) => (
                                        <main key={index} className='border rounded-lg p-5 flex flex-col gap-2' style={{ boxShadow: "0 0 5px #bdb5b5" }}>
                                            <div className='flex justify-between'>
                                                <div className='flex gap-4 items-center'>
                                                    <div><img src={Profile} className='h-10 w-10 rounded-[50%]' /></div>
                                                    <div>{value?.customer?.customerName}</div>
                                                </div>
                                                <div className='flex gap-0 text-gray-600'><ReactStars count={5} edit={false} value={value?.ratings} size={24} color2={'#ffd700'} /></div>
                                            </div>
                                            <div>{value?.comments}</div>
                                        </main>
                                    )) : <div className='p-10 text-center'>No Data Found</div>}
                                </main>
                            </div>
                        </div>
                    </main>
                </article>
            </section >

            <Modal isOpen={chatIntakeFormModal} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200} >
                <div className='text-center bg-primary text-white py-2 px-5 font-semibold flex justify-between'>
                    <div></div>
                    <div>Chat Intake Form</div>
                    <div onClick={handleCloseChatIntakeFormModal} className='cursor-pointer' ><CrossSvg h='16' w='16' color='#fff' strokeWidth='5' /></div>
                </div>
                <main className='flex flex-col gap-4 p-5'>
                    <div className='text-center'>Help Our Astrologer Know a little bit about you. Your details will kept completely confidentail.</div>

                    <form className='px-5 my-8 flex flex-wrap justify-between gap-6'>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>First Name</label>
                            <input name='first_name' value={chatIntakeDetail?.first_name} onChange={handleChatIntakeDetail} type='text' placeholder='First Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                        </div>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Last Name</label>
                            <input name='last_name' value={chatIntakeDetail?.last_name} onChange={handleChatIntakeDetail} type='text' placeholder='Last Name' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                        </div>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Gender</label>
                            <select name="gender" value={chatIntakeDetail?.gender} onChange={handleChatIntakeDetail} id="gender" className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Date of Birth</label>
                            <input name='date_of_birth' value={chatIntakeDetail?.date_of_birth} onChange={handleChatIntakeDetail} type='date' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                        </div>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Time of Birth</label>
                            <input name='time_of_birth' value={chatIntakeDetail?.time_of_birth} onChange={handleChatIntakeDetail} type='time' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                        </div>

                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Place of Birth</label>
                            <Autocomplete
                                onLoad={(ref) => (autocompleteRef.current = ref)}
                                onPlaceChanged={handlePlaceSelect}
                            >
                                <input
                                    type='text'
                                    name='place_of_birth'
                                    value={chatIntakeDetail.place_of_birth}
                                    onChange={handleChatIntakeDetail}
                                    className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'
                                    placeholder='Enter place of birth'
                                />
                            </Autocomplete>
                        </div>

                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Marital Status</label>
                            <select name="marital_status" value={chatIntakeDetail?.marital_status} onChange={handleChatIntakeDetail} id="marital_status" className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'>
                                <option value="">Select Marital Status</option>
                                <option value="Married">Married</option>
                                <option value="Unmarried">Unmarried</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='basis-[30%] max-md:basis-full flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Type of Concern</label>
                            <select name="type_of_concern" value={chatIntakeDetail?.type_of_concern} onChange={handleChatIntakeDetail} id="type_of_concern" className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm'>
                                <option value="">Select Type of Concern</option>
                                <option value="Career">Career</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                        <div className='basis-[100%] flex flex-col gap-1'>
                            <label className='text-grey text-sm'>Description</label>
                            <textarea name='description' rows={5} value={chatIntakeDetail?.description} onChange={handleChatIntakeDetail} placeholder='Description' className='w-[100%] outline-none bg-greybg px-5 py-[10px] rounded-md text-sm' />
                        </div>

                    </form>
                    <div onClick={() => handleOpenLinkedProfileModal()} className='text-center text-primary cursor-pointer'>Show Linked Profile</div>
                    <div onClick={handleSubmitChatIntakeForm} className='bg-primary text-center text-white rounded-lg p-2 text-sm cursor-pointer'>Start {connectionType}</div>
                </main>
            </Modal>

            <Modal isOpen={linkedProfileModal} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200} >
                <div className='text-center bg-primary text-white py-2 px-5 font-semibold flex justify-between'>
                    <div></div>
                    <div>Linked Profile</div>
                    <div onClick={handleCloseLinkedProfileModal} className='cursor-pointer' ><CrossSvg h='16' w='16' color='#fff' strokeWidth='5' /></div>
                </div>

                <main className='flex flex-col gap-4 p-5 max-h-[400px] overflow-scroll'>
                    {linkedProfileData?.map((value, index) => (
                        <RadioButton key={index}
                            label={value?.firstName + ' ' + value?.lastName + ' - ' + value?.gender + ' - ' + DateDifference(moment(value?.dateOfBirth).format('YYYY-MM-DD'))}
                            name="custom-radio"
                            value={value?._id}
                            checked={selectedLinkedProfileData?._id === value?._id}
                            onChange={() => handleSelectedLinkedProfileData(value)}
                        />
                    ))}
                </main>
                <div className='py-2 px-5 font-semibold flex justify-center'>
                    <div onClick={() => handleCloseLinkedProfileModal()} className='bg-primary text-white px-10 py-1 rounded-md cursor-pointer'>Select</div>
                </div>
            </Modal>

            {/* Download App */}
            <DownloadApp isOpen={callModal} handleCloseModal={handleCloseCallModal} />
        </>
    )
}

export default SingleAstrologer;