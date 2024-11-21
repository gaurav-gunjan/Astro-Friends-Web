import * as actionTypes from "../action-types";
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import { AstrologyAPIRequest } from '../../utils/api-function';
import { get_daily_horoscope, get_daily_tomorrow_horoscope, get_daily_yesterday_horoscope, get_monthly_horoscope } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';

function* getDailyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Horoscope Payload ::: ", payload);

        if (payload?.day == 'Today') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(500);
            const data = yield AstrologyAPIRequest(get_daily_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Today ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else if (payload?.day == 'Tomorrow') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(500);
            const data = yield AstrologyAPIRequest(get_daily_tomorrow_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Tomorrow ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(500);
            const data = yield AstrologyAPIRequest(get_daily_yesterday_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Yesterday ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Horoscope Saga Error :::', error?.error);
    }
};

function* getMonthlyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Monthly Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(500);
        const data = yield AstrologyAPIRequest(get_monthly_horoscope(payload));
        console.log('Get Monthly Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_MONTHLY_HOROSCOPE, payload: data });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Monthly Horoscope Saga Error :::', error?.error);
    }
};

export default function* astrologyApiSaga() {
    yield takeLeading(actionTypes?.GET_DAILY_HOROSCOPE, getDailyHoroscope);
    yield takeLeading(actionTypes?.GET_MONTHLY_HOROSCOPE, getMonthlyHoroscope);
};