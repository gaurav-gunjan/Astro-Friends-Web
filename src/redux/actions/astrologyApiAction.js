import * as actionTypes from "../action-types";

//! Horoscope
export const getDailyHoroscope = payload => ({
    type: actionTypes.GET_DAILY_HOROSCOPE, payload
});

export const setDailyHoroscope = payload => ({
    type: actionTypes.SET_DAILY_HOROSCOPE, payload
});

export const getDailyTomorrowHoroscope = payload => ({
    type: actionTypes.GET_DAILY_TOMORROW_HOROSCOPE, payload
});

export const setDailyTomorrowHoroscope = payload => ({
    type: actionTypes.SET_DAILY_TOMORROW_HOROSCOPE, payload
});

export const getDailyYesterdayHoroscope = payload => ({
    type: actionTypes.GET_DAILY_YESTERDAY_HOROSCOPE, payload
});

export const setDailyYesterdayHoroscope = payload => ({
    type: actionTypes.SET_DAILY_YESTERDAY_HOROSCOPE, payload
});

export const getMonthlyHoroscope = payload => ({
    type: actionTypes.GET_MONTHLY_HOROSCOPE, payload
});

export const setMonthlyHoroscope = payload => ({
    type: actionTypes.SET_MONTHLY_HOROSCOPE, payload
});