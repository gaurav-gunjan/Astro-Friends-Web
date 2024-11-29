//! Auth
//* Customer Auth
export const customer_login = 'api/customers/customer-login';
export const customer_login_otp = 'api/customers/verify_web_customer';
export const customer_update_profile = 'api/customers/update_profile_intake';
export const customer_change_picture = 'api/customers/change_profile';

//* Astrologer Auth
export const astrologer_login = 'api/astrologer/astrologer_web_login';

//* Logout
export const user_logout = 'api/logout';

//! User
export const get_user_customer_by_id = 'api/customers/get-customer-detail';
export const get_user_astrologer_by_id = 'api/astrologer/get-astrologer-details';
export const change_user_astrologer_chat_status = 'api/astrologer/change-chat-status';
export const change_user_astrologer_call_status = 'api/astrologer/change-call-status';
export const change_user_astrologer_video_call_status = 'api/admin/change_videocall_status';
export const user_astrologer_withdrawal_request = 'api/astrologer/withdraw_request';
export const get_user_astrologer_transaction_history = 'api/admin/astrologer_transaction_histroy';

//! Astrologer
export const get_astrologer = 'api/astrologer/get_chat_astrologer';
export const get_astrologer_by_id = 'api/astrologer/get-astrologer-details';
export const get_astrologer_review_by_id = 'api/admin/get-astrologer-review';

// TODO : Chat
export const get_linked_profile_for_chat = 'api/customers/get-linked-profile';
export const create_profile_for_chat = 'api/customers/add-profile';
export const initiate_chat_message = 'api/customers/initiate-chat';

//! Ecommerce
export const get_product_category = 'api/ecommerce/get_product_category';
export const get_products = 'api/ecommerce/get_products';
export const add_to_cart = 'api/ecommerce/add_to_cart';
export const get_customer_cart = 'api/ecommerce/get_customer_cart';
export const update_cart_item_quantity = 'api/ecommerce/update_cart_item_quantity';
export const order_product = 'api/ecommerce/order_product';
export const get_pooja = 'api/ecommerce/get_pooja';
export const get_astrolgoers_pooja = 'ecommerce/get_astrolgoers_pooja';
export const order_astrologer_pooja = 'ecommerce/order_astrologer_pooja';
export const get_custoemer_booked_pooja = 'ecommerce/get_custoemer_booked_pooja';

export const get_puja = 'api/ecommerce/get_puja';

//! Blog
export const get_astro_blogs = 'api/admin/get-astro-blogs-by-category';

//! Static Page
export const get_terms_and_conditions = 'api/admin/get-terms-condition';
export const get_privacy_policy = 'api/admin/get-privacy-policy';

//! Profile
export const create_kundli_matching_profile = 'api/customers/match_save';
export const get_kundli_matching_profile = 'api/customers/match_data';
export const get_kundli_matching_profile_by_id = 'api/customers/match_date_by_id';

//! Astrology API
//* Horoscope
export const get_daily_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/${zodiacName}`;
export const get_daily_tomorrow_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/next/${zodiacName}`;
export const get_daily_yesterday_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/previous/${zodiacName}`;
export const get_monthly_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/horoscope_prediction/monthly/${zodiacName}`;

//* Kundli Matching
export const get_kundli_matching_birth_details = 'https://json.astrologyapi.com/v1/match_birth_details';
export const get_kundli_matching_astro_details = 'https://json.astrologyapi.com/v1/match_astro_details';
export const get_kundli_matching_dashakoot_points_details = 'https://json.astrologyapi.com/v1/match_dashakoot_points';
export const get_kundli_matching_ashtakoot_points_details = 'https://json.astrologyapi.com/v1/match_ashtakoot_points';
export const get_kundli_matching_manglik_report_details = 'https://json.astrologyapi.com/v1/match_manglik_report';