import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import paymentReducer from "./paymentReducer";
import userReducer from "./userReducer";
import astrologerReducer from "./astrologerReducer";
import chatReducer from "./chatReducer";
import kundliReducer from "./kundliReducer";
import ecommerceReducer from "./ecommerceReducer";
import blogreducer from "./blogs";
import staticPageReducer from "./staticPageReducer";

const rootReducer = combineReducers({
    commonReducer,
    paymentReducer,
    userReducer,
    astrologerReducer,
    chatReducer,
    kundliReducer,
    ecommerceReducer,
    blogreducer,
    staticPageReducer,
});

export default rootReducer;
