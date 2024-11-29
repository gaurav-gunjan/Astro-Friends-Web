import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { postAPI } from '../../utils/api-function';
import { change_user_astrologer_call_status, change_user_astrologer_chat_status, change_user_astrologer_video_call_status, get_user_astrologer_by_id, get_user_astrologer_transaction_history, get_user_customer_by_id, user_astrologer_withdrawal_request } from '../../utils/api-routes';
import { Color } from '../../assets/colors';
import { toaster } from '../../utils/services/toast-service';

function* getUserCustomerById(action) {
    try {
        const { payload } = action;
        // console.log("Get User Customer By Id Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_by_id, payload);
        // console.log("Get User Customer By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_BY_ID, payload: data?.customersDetail });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.statusText ? error?.response?.statusText : "Failed To Get Data", showConfirmButton: false, timer: 2000 });
        console.log("Get User Customer By Id Saga Error ::: ", error);
    }
}

function* getUserAstrologerById(action) {
    try {
        const { payload } = action;
        // console.log("Get User Astrologer By Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_by_id, payload);
        // console.log("Get User Astrologer By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_BY_ID, payload: data?.astrologer });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get User Astrologer By Id Saga Error ::: ", error);
    }
};

function* changeUserAstrologerChatStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({ title: `Are you sure ?`, text: `You want to change chat status!!!`, icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_chat_status, payload?.data);
            console.log("Change User Astrologer Chat Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Chat status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change chat status!' });
        console.log("Change User Astrologer Chat Status Saga Error ::: ", error?.response?.data);
    }
};

function* changeUserAstrologerCallStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change call status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_call_status, payload?.data);
            console.log("Change User Astrologer Call Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Call status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change call status!' });
        console.log("Change User Astrologer Call Status Saga Error ::: ", error?.response?.data);
    }
};

function* changeUserAstrologerVideoCallStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change video call status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_video_call_status, payload?.data);
            console.log("Change User Astrologer Video Call Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Video call status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change video call status!' });
        console.log("Change User Astrologer Video Call Status Saga Error ::: ", error?.response?.data);
    }
};

function* userAstrologerWithdrawalRequest(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(user_astrologer_withdrawal_request, payload?.data);
        console.log("User Astrologer Withdrawal Request Saga Response ::: ", data);

        if (data?.success) {
            toaster?.success({ text: 'Withdrawal request has been sent' });
        }
        yield call(payload?.onComplete);

    } catch (error) {
        toaster?.error({ text: 'Failed to send withdrawal request!' });
        console.log("User Astrologer Withdrawal Request Saga Error ::: ", error?.response?.data);
    }
};

function* getUserAstrologerTransationHistory() {
    try {
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_transaction_history, { astrologerId: userAstrologer?._id });
        console.log("Get User Astrologer Transaction History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload: data?.results?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Astrologer Transaction History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export default function* userSaga() {
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_BY_ID, getUserCustomerById);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_BY_ID, getUserAstrologerById);

    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_CHAT_STATUS, changeUserAstrologerChatStatus);
    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_CALL_STATUS, changeUserAstrologerCallStatus);
    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_VIDEO_CALL_STATUS, changeUserAstrologerVideoCallStatus);
    yield takeLeading(actionTypes?.USER_ASTROLOGER_WITHDRAWAL_REQUEST, userAstrologerWithdrawalRequest);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, getUserAstrologerTransationHistory);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, getUserAstrologerTransationHistory);
}