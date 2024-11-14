import ReactStars from 'react-stars';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IndianRupee } from '../../utils/common-function';
import CheckBoxActive from '../../components/button/CheckBoxActive';
import CheckBoxInactive from '../../components/button/CheckBoxInactive';
import { countryData, genderData, languageData, offerData, skillData } from '../../utils/dbs';
import { CallSvg, ChatSvg, SearchSvg } from '../../assets/svg';
import { api_urls } from '../../utils/api-urls';
import TopHeaderSection from '../../components/common/TopHeaderSection';
import CustomPagination from '../../components/features/CustomPagination';
import * as AstrologerActions from '../../redux/actions/astrologerAction';

const ChatWithAstrologer = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0) }, [pathname]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userCustomerDataById } = useSelector(state => state?.userReducer);
    const { astrologerData } = useSelector(state => state?.astrologerReducer);

    let [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(searchParams);
    const page = query.get('page') || 1;
    const search = searchParams.get('search') || '';

    const handleSearch = async (text) => setSearchParams(`page=1&search=${text.toLowerCase().split(' ').join('')}`);

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
                            {userCustomerDataById && <div>Available balance: {IndianRupee(userCustomerDataById?.wallet_balance)}</div>}
                        </div>
                        <div className='flex gap-4 flex-wrap'>
                            <div onClick={() => navigate('/recharge')} className='border border-green-500 text-green-500 px-5 rounded-md flex items-center justify-center max-md:py-1 cursor-pointer'>Recharge</div>
                            <div className='border border-primary rounded-md flex items-center max-sm:w-[90vw]'>
                                <input type='search' value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Search...' className='outline-none px-3 py-2 rounded-md max-md:w-[100%]' />
                                <div className='bg-primary border-primary rounded-e-md h-[100%] flex items-center justify-center p-2 px-3'><SearchSvg w='16' /></div>
                            </div>
                        </div>
                    </main>

                    <main className='flex flex-wrap justify-between max-md:justify-center gap-[30px] gap-y-[40px]'>
                        {astrologerData?.astrologer?.map((value, index) => (
                            <div key={index} onClick={() => navigate(`/astrologer/${value?.astrologerName?.split(' ')[0]?.toLowerCase()}`, { state: { stateData: value } })} className='w-[390px] max-md:w-[90vw] flex gap-[20px] rounded-xl p-2 cursor-pointer' style={{ boxShadow: "0 0 10px #bdb5b5" }}>
                                <div className='w-[130px] relative'>
                                    <div className='absolute top-1 right-2 text-xs text-white'>{value?.call_status == "online" ? <div className='bg-green-600 px-2 py-0.5 rounded-lg'>Online</div> : <div className='bg-red-600 px-2 py-0.5 rounded-lg'>Offline</div>}</div>
                                    <img className='rounded-xl h-[110px] w-full' src={api_urls + value?.profileImage} />
                                    <div className='h-[90px] flex flex-col justify-center gap-[5px] rounded-xl text-[13px] text-white'>
                                        <div className='flex items-center gap-2'><div className='bg-primary p-2 rounded-full'><ChatSvg h='12' w='12' /></div> <div className='line-clamp-1 text-black'>{IndianRupee(value?.chat_price)} per min</div></div>
                                        <div className='flex items-center gap-2'><div className='bg-primary p-2 rounded-full'><CallSvg h='12' w='12' /></div> <div className='line-clamp-1 text-black'>{IndianRupee(value?.call_price)} per min</div></div>
                                    </div>
                                </div>
                                <div className='flex-1 flex flex-col justify-center gap-[15px] rounded-xl p-[15px] relative'>
                                    <div className='absolute right-2 top-0'><ReactStars count={5} edit={false} value={Number(value?.rating)} size={20} color2={'#ffd700'} /></div>
                                    <div className='line-clamp-1'>{value?.astrologerName}</div>
                                    <div className='bg-primary text-white rounded-lg px-[10px] py-[5px] line-clamp-1'>{value?.skill?.length > 0 && value?.skill?.map(item => item?.skill)?.join(' , ')}</div>
                                    {/* <div>{value?.skill?.length > 0 ? value?.skill?.map(value => value?.skill)?.join(' , ') : 'N/A'}</div> */}
                                    <div>Experience : {value?.experience} Years</div>
                                    <hr />
                                    <div className='line-clamp-1'>{value?.language.length > 0 ? value?.language.join(' , ') : "Hindi"}</div>
                                </div>
                            </div>
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

            {/* <SortByModal width={`w-[300px]`}>
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
            </FilterModal> */}
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