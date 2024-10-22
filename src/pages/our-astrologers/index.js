import React, { useEffect } from "react";
import AstrologerCard from "../../components/cards/astrologerCard";
import Profile from '../../assets/images/logo/profile.jpg'
import { useDispatch, useSelector } from "react-redux";
import * as AstrologerActions from '../../redux/actions/astrologerAction';
import { api_urls } from "../../utils/api-urls";

const OurAstrologers = () => {
  const dispatch = useDispatch();
  const { astrologerData } = useSelector(state => state?.astrologerReducer);

  useEffect(() => {
    //! Dispatching API For Getting Astrologer 
    dispatch(AstrologerActions.getAstrologer());
  }, []);

  // Ensure astrologerData is not null before slicing
  const latestAstrologers = astrologerData && astrologerData?.astrologer?.slice(0, 3);

  return (
    <main className="flex flex-wrap gap-5 justify-center">
      {latestAstrologers && latestAstrologers?.map((astrologer, index) => (
        <div className="flex-30" key={index}>
          <AstrologerCard
            img={api_urls + astrologer?.profileImage}
            name={astrologer?.astrologerName}
            skill={astrologer?.language}
          />
        </div>
      ))}
    </main>
  );
}

export default OurAstrologers;
