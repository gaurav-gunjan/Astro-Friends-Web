import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, serverTimestamp, set } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import * as ChatActions from '../../redux/actions/chatAction';


const firebaseConfig = {
  apiKey: "AIzaSyDMirwB_ms0XHhiOU1XaVZ5SLgd-ylxB7M",
  authDomain: "astroremedy-90cb0.firebaseapp.com",
  databaseURL: "https://astroremedy-90cb0-default-rtdb.firebaseio.com",
  projectId: "astroremedy-90cb0",
  storageBucket: "astroremedy-90cb0.appspot.com",
  messagingSenderId: "395034377495",
  appId: "1:395034377495:web:c2311de2d8982ea31dcb52",
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//! Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

const generateTokenByRequestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const fcm_token = await getToken(messaging, { vapidKey: "BPzYOOxSV5DzLMOgqAVATuSETsXmvce1GIOJo1mvuP9JmcGg-8U1yWSMB5ECOjWpEFEXl1VBPdqINUIGJHHFKH0" });
      console.log('FCM Token', fcm_token);
      localStorage.setItem('fcm_token', fcm_token);
      return fcm_token;
    } else if (permission === 'denied') {
    }
  } catch (error) {
    console.log(error)
  }
};

//! Handle foreground messages
const onMessageListener = (navigate, dispatch) => {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    const notificationOptions = { data: payload.data, body: payload.data.title };
    const notificationData = notificationOptions.data;
    console.log("NotificationData :: ", notificationData);

    if (notificationData?.type == 'call_invoice') {
      dispatch(ChatActions?.setCallInvoiceVisibility(true));
      dispatch(ChatActions?.setCallInvoiceData(JSON.parse(notificationData?.data)))
    } else {
      let url;
      switch (notificationData?.sent_to) {
        case 'astrologer':
          console.log('For Astrologer', notificationData?.sent_to)
          url = `/chat/astrologer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&customerName=${notificationData.customerName}&invoiceId=${notificationData.invoiceId}&priority=${notificationData.priority}&profileId=${notificationData.profileId}&type=${notificationData.type}&wallet_balance=${notificationData.wallet_balance}`;
          navigate(url, '_blank');
          console.log('Url ::: ', url);
          break;

        case 'customer':
          console.log('For Customer', notificationData?.sent_to)
          // url = `/chat/customer-accept-reject?user_id=${notificationData.user_id}&astroID=${notificationData.astroID}&chatId=${notificationData.chatId}&astrologerName=${notificationData.astrologerName}&chatPrice=${notificationData.chatPrice}&priority=${notificationData.priority}&type=${notificationData.type}`;
          navigate(`/chat?customer=${notificationData.user_id}&astrologer=${notificationData.astroID}&chatId=${notificationData?.chatId}`, { replace: true })
          break;

        default:
          break
      }
    }
  });
};

export { database, ref, push, onValue, serverTimestamp, set, messaging, generateTokenByRequestPermission, onMessageListener };