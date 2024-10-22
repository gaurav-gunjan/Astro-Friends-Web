import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { postAPI } from '../../utils/api-function';
import { get_astrologer, get_astrologer_by_id, get_astrologer_review_by_id } from '../../utils/api-routes';

function* getAstrologer(action) {
    try {
        const { payload } = action;
        // console.log("Get Astrologer Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_astrologer, payload);
        // console.log("Get Astrologer Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER, payload: data });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.statusText ? error?.response?.statusText : "Failed To Get Data", showConfirmButton: false, timer: 2000 });
        // console.log("Get Astrologer Saga Error ::: ", error);
    }
}

function* getAstrologerById(action) {
    try {
        const { payload } = action;
        // console.log("Get Astrologer By Id Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_astrologer_by_id, payload);
        // console.log("Get Astrologer By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_BY_ID, payload: data?.astrologer });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.statusText ? error?.response?.statusText : "Failed To Get Data", showConfirmButton: false, timer: 2000 });
        // console.log("Get Astrologer By Id Saga Error ::: ", error);
    }
}

function* getAstrologerReviewById(action) {
    try {
        const { payload } = action;
        // console.log("Get Astrologer Review By Id Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_astrologer_review_by_id, payload);
        // console.log("Get Astrologer Review By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, payload: data?.reviews });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // console.log("Get Astrologer Review By Id Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, payload: [] });
    }
}


export default function* astrologerSaga() {
    yield takeLeading(actionTypes?.GET_ASTROLOGER, getAstrologer);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_BY_ID, getAstrologerById);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_REVIEW_BY_ID, getAstrologerReviewById);
}