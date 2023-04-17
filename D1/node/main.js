const express = require('express');
const axios = require('axios');
const app = express();
const port = 80;

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong!' });
  console.log('[Node] ' + req.url);
});

app.get('/forward', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    res.status(400).json({ message: 'Missing url parameter' });
    return;
  }

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error executing request' });
  }
  console.log('[Node] ' + req.url);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});