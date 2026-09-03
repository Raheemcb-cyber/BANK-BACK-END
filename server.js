require('dotenv').config();
const express = require('express');
const { getToken, createBvn, createAccount, nameEnquiry, transfer, getTransactionStatus, getBalance, createNin } = require('./nibssService');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('NIBSS Banking Backend is running');
});

app.get('/test-login', async (req, res) => {
  try {
    const token = await getToken();
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/test-bvn', async (req, res) => {
  try {
    const result = await createBvn('48273619205', 'Test', 'User2', '2000-01-01', '08087654321');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-account', async (req, res) => {
  try {
    const result = await createAccount('bvn', '48273619205', '2000-01-01');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-name-enquiry', async (req, res) => {
  try {
    const result = await nameEnquiry('9169728961');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-transfer', async (req, res) => {
  try {
    const result = await transfer('9163783536', '9169728961', '1000');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-transaction-status', async (req, res) => {
  try {
    const result = await getTransactionStatus('TX1788370668219');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-balance', async (req, res) => {
  try {
    const result = await getBalance('9163783536');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.get('/test-nin', async (req, res) => {
  try {
    const result = await createNin('56374829103', 'Test', 'User3', '2000-01-01');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, details: error.response ? error.response.data : 'No response data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});