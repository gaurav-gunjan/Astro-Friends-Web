import * as actionTypes from "../action-types";

const initialState = {
    dailyHoroscopeData: null,
    monthlyHoroscopeData: null,
};

const astrologyApiReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_DAILY_HOROSCOPE:
            return { ...state, dailyHoroscopeData: payload };

        case actionTypes.SET_MONTHLY_HOROSCOPE:
            return { ...state, monthlyHoroscopeData: payload };

        default:
            return state;
    }
};

export default astrologyApiReducer;