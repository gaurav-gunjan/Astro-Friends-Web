import * as actionTypes from "../action-types";

const initialState = {
    userCustomerDataById: null,
    userAstrologerDataById: null
};

const userReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_USER_CUSTOMER_BY_ID: {
            return {
                ...state,
                userCustomerDataById: payload,
            };
        }
        case actionTypes.SET_USER_ASTROLOGER_BY_ID: {
            return {
                ...state,
                userAstrologerDataById: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;