import axios from "axios";
import { api_urls } from "../api-urls";
import { access_token } from "../constants";
import { encode as btoa } from 'base-64';
import Swal from "sweetalert2";

if (typeof global.btoa === 'undefined') global.btoa = btoa;

export const getAPI = async (url) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.get(api_urls + url, { headers: { Authorization: 'Bearer ' + token } })
    return response;
}

export const postAPI = async (url, payload) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.post(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const putAPI = async (url, payload) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.put(api_urls + url, payload, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const deleteAPI = async (url) => {
    const token = localStorage.getItem(access_token);

    const response = await axios.delete(api_urls + url, { headers: { Authorization: 'Bearer ' + token } });
    return response;
}

export const kundliRequest = async (url, payload) => {
    const credentials = `${630051}:${'861bba6a92587a326a9b11ab9dfb9b7ca3492fab'}`;
    const token = btoa(credentials);

    const response = await axios.post(url, payload, { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token } })
    return response?.data;
};

export const razorpayPayment = async ({ amount = 0, name = '', email = '', contact = '' }) => {

    const { data } = await postAPI('api/customers/create_razorpay_order', { amount });
    console.log("Order Response :::", data);

    if (!data?.status) {
        Swal.fire({ icon: "error", title: 'Failed', text: 'Payment Failed', showConfirmButton: false, timer: 2000 });
        return;
    }

    let options = {
        // key: 'rzp_test_7FcETDDAqUcnFu',
        key: 'rzp_live_vfe6ZLq4RYS0ZY',
        name: name,
        currency: 'INR',
        amount: data?.data?.amount,
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        order_id: data?.data?.id,
        prefill: {
            email: email,
            contact: contact,
            name: name
        },
        theme: { color: '#E15602' }
    }

    console.log("Razor Pay Option ::: ", options);

    // const razorpay = new window.Razorpay(options);
    // razorpay.open();

    return new Promise((resolve, reject) => {
        options.handler = function (response) {
            console.log('Handler Response ::: ', response);
            resolve(response);
        };

        options.modal = {
            ondismiss: function () {
                console.log("Payment Dismissed")
                return 'Payment dismissed';
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
            reject(response);
        });
        razorpay.open();
    });
} 