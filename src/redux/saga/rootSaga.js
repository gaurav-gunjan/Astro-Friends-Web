import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import paymentSaga from "./paymentSaga";
import userSaga from "./userSaga";
import astrologerSaga from "./astrologerSaga";
import chatSaga from "./chatSaga";
import kundliSaga from "./kundliSaga";
import astrologyApiSaga from "./astrologyApiSaga";
import ecommerceSaga from "./ecommerceSaga";
import blogSaga from "./blogSaga";
import staticPageSaga from "./staticPageSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        paymentSaga(),
        userSaga(),
        astrologerSaga(),
        chatSaga(),
        kundliSaga(),
        astrologyApiSaga(),
        ecommerceSaga(),
        blogSaga(),
        staticPageSaga(),
    ])
};
