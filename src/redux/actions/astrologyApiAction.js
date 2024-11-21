import * as actionTypes from "../action-types";

//! Horoscope
export const getDailyHoroscope = payload => ({
    type: actionTypes.GET_DAILY_HOROSCOPE, payload
});

export const setDailyHoroscope = payload => ({
    type: actionTypes.SET_DAILY_HOROSCOPE, payload
});

export const getMonthlyHoroscope = payload => ({
    type: actionTypes.GET_MONTHLY_HOROSCOPE, payload
});

export const setMonthlyHoroscope = payload => ({
    type: actionTypes.SET_MONTHLY_HOROSCOPE, payload
});