

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const axios = require('axios');

 async function  sendSessionMessage() {
  const apiUrl = "https://v1-api.swiftchat.ai/api/bots/0211321361171423/messages";
  const apiKey = "1a6acaf6-abd4-47d5-8652-45990cd74d89";

  const requestBody = {
    to: "enter here phoneno",
    type: "text",
    text: {
      body: "how are you",
    },
    rating_type: "thumb",
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response =  await axios.post(apiUrl, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}





app.post('/webhook', (req, res) => {
    console.log(req.body.text); 
    if(req.body.from=="enter here phoneno"){
      if(req.body.text.body=="hy"){
        const id = sendSessionMessage()
      }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});