import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, takeLeading } from 'redux-saga/effects';
import { postAPI } from '../../utils/api-function';
import { get_user_astrologer_by_id, get_user_customer_by_id } from '../../utils/api-routes';

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
        // Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.statusText ? error?.response?.statusText : "Failed To Get Data", showConfirmButton: false, timer: 2000 });
        console.log("Get User Astrologer By Id Saga Error ::: ", error);
    }
}


export default function* userSaga() {
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_BY_ID, getUserCustomerById);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_BY_ID, getUserAstrologerById);
}