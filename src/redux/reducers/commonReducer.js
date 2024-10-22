import * as actionTypes from "../action-types";

const initialState = {
    isLoading: false
};

const commonReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default commonReducer;
