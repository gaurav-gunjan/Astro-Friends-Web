import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { api_urls } from '../../utils/api-urls';
import { astrologer_login, customer_login, customer_login_otp } from '../../utils/api-routes';
import { put, call, takeLeading } from 'redux-saga/effects';
import { access_token, refresh_token } from '../../utils/constants';
import { Color } from '../../assets/colors';

function* astrologerLogin(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield axios.post(api_urls + astrologer_login, payload?.data);
        console.log("Astrologer Login Saga Response ::: ", data);

        if (data?.success && data?.status == 1) {
            Swal.fire({ icon: "success", title: "Login Successfully", showConfirmButton: false, timer: 2000 });
            // localStorage.setItem(access_token, data?.accessToken);
            localStorage.setItem('current_user_id', data?.astrologer?._id)
            localStorage.setItem('user_type', 'astrologer')
            localStorage.setItem('current_user_data', JSON.stringify(data?.astrologer))
            yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: data?.astrologer?._id } });

            yield call(payload?.onComplete);
        } else {
            Swal.fire({ icon: "error", title: 'Failed To Login', text: data?.message, showConfirmButton: false, timer: 2000, });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed To Login', text: error?.response?.data ? error?.response?.data : 'Wrong OTP please try again ', showConfirmButton: false, timer: 2000, });
        console.log("Astrologer Login Saga Error ::: ", error)
    }
}

function* customerLogin(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield axios.post(api_urls + customer_login, payload?.data);
        console.log("Customer Login Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Otp Sent Successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: error?.response?.data?.message, showConfirmButton: false, timer: 2000, });
        console.log("Customer Login Saga Error ::: ", error?.response?.data)
    }
}

function* customerLoginOtp(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield axios.post(api_urls + customer_login_otp, payload?.data);
        console.log("Customer Login Saga Response ::: ", data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: "Login Successfully", showConfirmButton: false, timer: 2000 });
            localStorage.setItem('current_user_id', data?.customer?._id)
            localStorage.setItem('user_type', 'customer')
            localStorage.setItem('current_user_data', JSON.stringify(data?.customer))
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: data?.customer?._id } });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Invalid OTP', text: 'Please try again', showConfirmButton: false, timer: 2000, });
        console.log("Customer Login Saga Error ::: ", error)
    }
}

function* userLogout(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const result = yield Swal.fire({
            icon: "warning", text: "Do you want to logout ?", showConfirmButton: true, timer: 20000,
            confirmButtonText: "Yes", confirmButtonColor: Color.primary, cancelButtonText: "No", showCancelButton: true, cancelButtonColor: Color.darkgrey
        });
        console.log('result', result);

        if (result.isConfirmed) {
            localStorage.removeItem('current_user_data');
            localStorage.removeItem('user_type');
            localStorage.removeItem('current_user_id');

            yield put({ type: actionTypes.SET_USER_CUSTOMER_BY_ID, payload: null });
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_BY_ID, payload: null });

            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed To Logout', text: error?.response?.data ? error?.response?.data : 'Failed To Login', showConfirmButton: false, timer: 2000, });
        console.log("Customer Login Saga Error ::: ", error)
    }
}

export default function* authSaga() {
    yield takeLeading(actionTypes.ASTROLOGER_LOGIN, astrologerLogin);
    yield takeLeading(actionTypes.CUSTOMER_LOGIN, customerLogin);
    yield takeLeading(actionTypes.CUSTOMER_LOGIN_OTP, customerLoginOtp);
    yield takeLeading(actionTypes.USER_LOGOUT, userLogout);
}