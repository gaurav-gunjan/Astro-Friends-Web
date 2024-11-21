import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { AstrologyAPIRequest } from '../../utils/api-function';
import { get_daily_horoscope, get_daily_tomorrow_horoscope, get_daily_yesterday_horoscope, get_monthly_horoscope } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';

function* getDailyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const data = yield AstrologyAPIRequest(get_daily_horoscope(payload));
        console.log('Get Daily Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Horoscope Saga Error :::', error?.error);
    }
};

function* getDailyTomorrowHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Tomorrow Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const data = yield AstrologyAPIRequest(get_daily_tomorrow_horoscope(payload));
        console.log('Get Daily Tomorrow Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_DAILY_TOMORROW_HOROSCOPE, payload: data?.prediction });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Tomorrow Horoscope Saga Error :::', error?.error);
    }
};

function* getDailyYesterdayHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Yesterday Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const data = yield AstrologyAPIRequest(get_daily_yesterday_horoscope(payload));
        console.log('Get Daily Yesterday Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_DAILY_YESTERDAY_HOROSCOPE, payload: data?.prediction });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Yesterday Horoscope Saga Error :::', error?.error);
    }
};

function* getMonthlyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Monthly Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const data = yield AstrologyAPIRequest(get_monthly_horoscope(payload));
        console.log('Get Monthly Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_MONTHLY_HOROSCOPE, payload: data?.prediction });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Monthly Horoscope Saga Error :::', error?.error);
    }
};

export default function* astrologyApiSaga() {
    yield takeLeading(actionTypes?.GET_DAILY_HOROSCOPE, getDailyHoroscope);
    yield takeLeading(actionTypes?.GET_DAILY_TOMORROW_HOROSCOPE, getDailyTomorrowHoroscope);
    yield takeLeading(actionTypes?.GET_DAILY_YESTERDAY_HOROSCOPE, getDailyYesterdayHoroscope);
    yield takeLeading(actionTypes?.GET_MONTHLY_HOROSCOPE, getMonthlyHoroscope);
};