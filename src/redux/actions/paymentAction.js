import * as actionTypes from "../action-types";

export const handlePayment = (payload) => ({
    type: actionTypes.HANDLE_PAYMENT,
    payload,
});