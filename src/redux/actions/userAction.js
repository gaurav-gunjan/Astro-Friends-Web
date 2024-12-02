import * as actionTypes from "../action-types";

//! Customer 
export const getUserCustomerById = payload => ({
    type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload
});

export const setUserCustomerById = payload => ({
    type: actionTypes.SET_USER_CUSTOMER_BY_ID, payload
});

//! Astrologer
export const getUserAstrologerById = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload
});

export const setUserAstrologerById = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_BY_ID, payload
});

export const changeUserAstrologerChatStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_CHAT_STATUS, payload
});

export const changeUserAstrologerCallStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_CALL_STATUS, payload
});

export const changeUserAstrologerVideoCallStatus = payload => ({
    type: actionTypes.CHANGE_USER_ASTROLOGER_VIDEO_CALL_STATUS, payload
});

export const userAstrologerWithdrawalRequest = payload => ({
    type: actionTypes.USER_ASTROLOGER_WITHDRAWAL_REQUEST, payload
});

export const getUserAstrologerWalletHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_WALLET_HISTORY, payload
});

export const setUserAstrologerWalletHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY, payload
});

export const getUserAstrologerTransactionHistory = payload => ({
    type: actionTypes.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload
});

export const setUserAstrologerTransactionHistory = payload => ({
    type: actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload
});