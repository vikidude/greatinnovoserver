'use strict';

var PAYTM_STAG_URL = 'https://pguat.paytm.com';
var PAYTM_PROD_URL = 'https://secure.paytm.in';
var MID = 'aBxgXg78340791796490';
var PAYTM_ENVIORMENT = 'TEST';   // PROD FOR PRODUCTION
var PAYTM_MERCHANT_KEY = 'qfdj&DM#S!GGKF58';
var WEBSITE = 'WEBSTAGING';
// var PAYMENT_TYPE_ID = 'UPI'
var CHANNEL_ID =  'WEB'; // WAP --->(Mobile Apps)
var INDUSTRY_TYPE_ID = 'Retail';
// var PAYMENT_MODE_ONLY = 'YES'
var PAYTM_FINAL_URL = '';
if (PAYTM_ENVIORMENT== 'TEST') {
  PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/order/process';
}else{
  PAYTM_FINAL_URL = 'https://securegw-stage.paytm.in/order/process';
}

module.exports = {

    MID: MID,
    PAYTM_MERCHANT_KEY :PAYTM_MERCHANT_KEY,
    PAYTM_FINAL_URL :PAYTM_FINAL_URL,
    WEBSITE: WEBSITE,
    CHANNEL_ID: CHANNEL_ID,
    INDUSTRY_TYPE_ID: INDUSTRY_TYPE_ID,
    // PAYMENT_MODE_ONLY: PAYMENT_MODE_ONLY,
    // PAYMENT_TYPE_ID: PAYMENT_TYPE_ID

};