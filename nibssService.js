require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.NIBSS_BASE_URL;

let cachedToken = null;
let tokenExpiry = null;

async function login() {
  const url = `${BASE_URL}/api/auth/token`;
  console.log('DEBUG - Calling URL:', url);

  const response = await axios.post(url, {
    apiKey: process.env.NIBSS_API_KEY,
    apiSecret: process.env.NIBSS_API_SECRET
  });

  cachedToken = response.data.token;
  tokenExpiry = Date.now() + (55 * 60 * 1000);

  return cachedToken;
}

async function getToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }
  return await login();
}
async function createBvn(bvn, firstName, lastName, dob, phone) {
  const token = await getToken();
  const url = `${BASE_URL}/api/insertBvn`;

  const response = await axios.post(url, {
    bvn, firstName, lastName, dob, phone
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}async function createAccount(kycType, kycID, dob) {
  const token = await getToken();
  const url = `${BASE_URL}/api/account/create`;

  const response = await axios.post(url, {
    kycType, kycID, dob
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}
async function nameEnquiry(accountNumber) {
  const token = await getToken();
  const url = `${BASE_URL}/api/account/name-enquiry/${accountNumber}`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}

async function transfer(from, to, amount) {
  const token = await getToken();
  const url = `${BASE_URL}/api/transfer`;

  const response = await axios.post(url, {
    from, to, amount
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}
async function getTransactionStatus(transactionId) {
  const token = await getToken();
  const url = `${BASE_URL}/api/transaction/${transactionId}`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}

async function getBalance(accountNumber) {
  const token = await getToken();
  const url = `${BASE_URL}/api/account/balance/${accountNumber}`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}
async function createNin(nin, firstName, lastName, dob) {
  const token = await getToken();
  const url = `${BASE_URL}/api/insertNin`;

  const response = await axios.post(url, {
    nin, firstName, lastName, dob
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
}
module.exports = { getToken, createBvn, createAccount, nameEnquiry, transfer, getTransactionStatus, getBalance, createNin };