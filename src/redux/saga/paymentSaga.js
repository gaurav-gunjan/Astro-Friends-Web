import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { postAPI, razorpayPayment } from '../../utils/api-function';
import { get_astrologer } from '../../utils/api-routes';

function* handlePayment(action) {
    try {
        const { payload } = action;
        console.log("Handle Payment Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.data?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })

        console.log("Razor Pay Response ::: ", razorpayResponse);

        if (razorpayResponse) {
            const { data } = yield postAPI('api/customers/recharge-customer-wallet', payload?.data);
            console.log("Final Response :: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: "Payment Successfull", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } })
                yield call(payload?.onComplete);
            }
        } else {
            Swal.fire({ icon: "error", title: 'Failed', text: 'Payment Failed', showConfirmButton: false, timer: 2000 });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: 'Payment Failed', showConfirmButton: false, timer: 2000 });
        console.log("Handle Payment Saga Error ::: ", error);
    }
}


export default function* paymentSaga() {
    yield takeLeading(actionTypes?.HANDLE_PAYMENT, handlePayment);
}