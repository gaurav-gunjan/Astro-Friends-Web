import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../components/hooks/useModal';
import { DeepSearchSpace, IndianRupee } from '../../utils/common-function';
import RadioButton from '../../components/button/RadioButton';
import CheckBoxActive from '../../components/button/CheckBoxActive';
import CheckBoxInactive from '../../components/button/CheckBoxInactive';
import { CrossSvg, SearchSvg, StarSvg, VerifySvg } from '../../assets/svg';
import { sortByData, countryData, genderData, languageData, offerData, skillData } from '../../utils/dbs';
import { api_urls } from '../../utils/api-urls';
import * as AstrologerActions from '../../redux/actions/astrologerAction';
import ReactStars from 'react-stars';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import CustomPagination from '../../components/features/CustomPagination';

const ChatWithAstrologer = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);

    const [openSortByModal, closeSortByModal, SortByModal] = useModal();
    const [openFilterModal, closeFilterModal, FilterModal] = useModal();

    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (data) => {
        setSelectedValue(data?.name + data?.type);
        console.log(data)
    };

    const [activeTab, setActiveTab] = useState(0);
    const filterHead = [{ id: 0, name: 'Skill' }, { id: 1, name: 'Language' }, { id: 2, name: 'Gender' }, { id: 3, name: 'Country' }, { id: 4, name: 'Offer' },]

    const [selectedLanguage, setSelectedLanguage] = useState([])
    const handleSelectedLanguage = (language) => {
        setSelectedLanguage((prevSelected) =>
            prevSelected.includes(language)
                ? prevSelected.filter((item) => item !== language)
                : [...prevSelected, language]
        );
    };

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';
    // console.log({ page, search });

    const handleSearch = async (text) => {
        setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}`);
    };

    // const [searchText, setSearchText] = useState('');
    // const handleSearch = (event) => setSearchText(event.target.value);
    // const filteredData = DeepSearchSpace(astrologerData?.astrologer, searchText);

    useEffect(() => {
        //! Dispatching API For Getting Astrologer 
        dispatch(AstrologerActions.getAstrologer({ page, search }));
    }, [page, search]);

    return (
        <>
            <TopHeaderSection title={'Chat with Astrologer'} />

            <section className='px-[100px] py-7 max-sm:px-[20px]'>
                <article className='flex flex-col gap-7'>
                    <main className='flex gap-4 flex-wrap items-center justify-between'>
                        <div className='bg-primary text-white px-8 py-2 font-semibold rounded-md flex items-center justify-center'>Chat with Astrologer</div>
                        <div>
                            <div>Available balance: {IndianRupee(userCustomerDataById?.wallet_balance)}</div>
                        </div>
                        <div className='flex gap-4 flex-wrap'>
                            <div onClick={() => navigate('/price-list')} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
                            {/* <div onClick={openFilterModal} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1  cursor-pointer'>Filter</div>
                            <div onClick={openSortByModal} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Sort by</div> */}
                            <div className='border border-primary rounded-md flex items-center max-sm:w-[90vw]'>
                                <input type='search' value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Search...' className='outline-none px-3 py-2 rounded-md max-md:w-[100%]' />
                                <div className='bg-primary border-primary rounded-e-md h-[100%] flex items-center justify-center p-2 px-3'><SearchSvg w='16' /></div>
                            </div>
                        </div>
                    </main>

                    <main className='flex flex-wrap gap-8 justify-around'>
                        {astrologerData?.astrologer?.map((value, index) => (
                            <main key={index} onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='flex gap-5 p-5 rounded-lg bg-white shadow-md hover:shadow-lg transition cursor-pointer max-sm:basis-[80%] max-lg:basis-[40%]' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                <div className='flex flex-col gap-2'>
                                    <div><img src={api_urls + value?.profileImage} className='h-[65px] w-[65px] rounded-[50%]' /></div>
                                    <div className='flex gap-0 text-gray-600'><ReactStars count={5} edit={false} value={Number(value?.rating)} size={20} color2={'#ffd700'} /></div>
                                    <div className='text-[12px] text-grey'>{value?.follower_count} follower</div>
                                </div>

                                <div className='flex flex-col gap-1 text-[15px] text-grey'>
                                    <div className='text-base text-black'>{value?.astrologerName}</div>
                                    {/* <div>{value?.skill?.length > 0 ? value?.skill?.map(value => value?.skill)?.join(' , ') : 'N/A'}</div> */}
                                    <div>{value?.language.length > 0 ? value?.language.join(' , ') : "Hindi"}</div>
                                    <div>Exp: {value?.experience} Years</div>
                                    <div className='text-primary font-semibold'>{IndianRupee(value?.chat_price)}</div>
                                </div>

                                {value?.chat_status == "online" ? <div className='text-green-500'>Online</div> : <div className='text-red-500'>Offline</div>}
                                {/* {value?.chat_status == "online" ? <VerifySvg color='green' /> : <VerifySvg color='red' />} */}
                            </main>
                        ))}

                    </main>
                    {astrologerData?.astrologer?.length <= 0 && (
                        <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-300 bg-gray-100 text-primary text-lg rounded-lg shadow-lg p-4">
                            <p className="text-gray-500">No Record Found</p>
                        </div>
                    )}

                    {!!astrologerData && astrologerData?.astrologer?.length > 0 && <CustomPagination count={astrologerData?.pagination?.limit} totalDocuments={astrologerData?.pagination?.total} />}
                </article>
            </section>

            <SortByModal width={`w-[300px]`}>
                <div className='flex justify-between items-center py-3 px-5 border-b-[2px]'>
                    <div className='text-lg font-semibold'>SORT BY</div>
                    <div onClick={closeSortByModal} className='cursor-pointer' ><CrossSvg strokeWidth='3' /></div>
                </div>

                <main className='px-5 py-5 pb-7 flex flex-col gap-4'>
                    {sortByData.map((value, index) => (
                        <RadioButton key={index}
                            label={value?.type ? value?.name + ' : ' + value?.type : value?.name}
                            name="custom-radio"
                            value={value?.name + value?.type}
                            checked={selectedValue === value?.name + value?.type}
                            onChange={() => handleChange(value)}
                        />
                    ))}
                </main>
            </SortByModal>

            <FilterModal width={`w-[500px]`}>
                <div className='flex justify-between items-center py-3 px-5 border-b-[2px]'>
                    <div className='text-lg font-semibold'>FILTERS</div>
                    <div onClick={closeFilterModal} className='cursor-pointer' ><CrossSvg strokeWidth='3' /></div>
                </div>

                <main className='flex h-96 border-b-[2px]'>
                    <div className='basis-[30%] border-r-[2px]'>
                        <div className=' bg-greybg'>
                            {filterHead.map((value, index) => (
                                <div key={index} onClick={() => setActiveTab(value?.id)} className={`border-l-[5px] ${activeTab == value?.id ? `border-[#008080] bg-white` : `border-greybg`} px-3 py-2 cursor-pointer`}>{value?.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className='basis-[70%] overflow-auto filter-overflow p-4'>
                        <SwtichTab activeTab={activeTab} handleSelectedLanguage={handleSelectedLanguage} selectedLanguage={selectedLanguage} />
                    </div>
                </main>

                <div className='flex gap-4 py-3 px-4 items-center'>
                    <div className='px-4 text-cyan-900 cursor-pointer'>Reset</div>
                    <div className='flex-1 flex justify-center'>
                        <div className='px-20 py-2 bg-yellow-400 rounded-lg cursor-pointer' style={{ boxShadow: "0 0 5px #bdb5b5" }}>Apply</div>
                    </div>
                </div>
            </FilterModal>
        </>
    )
}

export default ChatWithAstrologer;

const SwtichTab = ({ activeTab, handleSelectedLanguage, selectedLanguage }) => {
    switch (activeTab) {
        case 0:
            return <>
                <main className='flex flex-col gap-4'>
                    {skillData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 1:
            return <>
                <main className='flex flex-col gap-4'>
                    {languageData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 2:
            return <>
                <main className='flex flex-col gap-4'>
                    {genderData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 3:
            return <>
                <main className='flex flex-col gap-4'>
                    {countryData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
        case 4:
            return <>
                <main className='flex flex-col gap-4'>
                    {offerData.map((value, index) => (
                        <div onClick={() => handleSelectedLanguage(value?.name)} key={index} className='flex gap-2 items-center cursor-pointer'>
                            {selectedLanguage.includes(value.name) ? <CheckBoxActive /> : <CheckBoxInactive />}
                            <div>{value?.name}</div>
                        </div>
                    ))}
                </main>
            </>
    }
}