import * as actionTypes from "../action-types";

const initialState = {
    linkedProfileData: [],
    //* Chat 
    chatTimerCountDown: 0,
    chatInvoiceData: {},
    chatInvoiceVisibility: false,
    //* Call 
    callIntakeDetailData: { visible: false, profileId: null },
    callInvoiceData: {},
    callInvoiceVisibility: false,
    //* Rating 
    astrologerRatingVisibility: { data: null, ratingVisible: false },
};

const chatReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_LINKED_PROFILE_FOR_CHAT:
            return { ...state, linkedProfileData: payload }

        //! Chat 
        case actionTypes.SET_CHAT_TIMER_COUNTDOWN:
            return { ...state, chatTimerCountDown: payload }
        case actionTypes.SET_CHAT_INVOICE_DATA:
            return { ...state, chatInvoiceData: payload }
        case actionTypes.SET_CHAT_INVOICE_VISIBILITY:
            return { ...state, chatInvoiceVisibility: payload }

        //! Call
        case actionTypes.CALL_INTAKE_DETAIL_DATA:
            return { ...state, callIntakeDetailData: payload }
        case actionTypes.SET_CALL_INVOICE_DATA:
            return { ...state, callInvoiceData: payload }
        case actionTypes.SET_CALL_INVOICE_VISIBILITY:
            return { ...state, callInvoiceVisibility: payload }

        case actionTypes.SET_ASTROLOGER_RATING_VISIBILITY:
            return { ...state, astrologerRatingVisibility: payload }

        default:
            return state;
    }
};

export default chatReducer;