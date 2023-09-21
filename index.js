let steps;
function getStepsForTea() {
  steps = [
    "Step 2: Preheat cup or teapot (optional)",
    "Step 3: Add tea",
    "Step 4: Pour hot water",
    "Step 5: Steep",
    "Step 6: Remove tea bag or strain",
    "Step 7: Optional additions",
    "Step 8: Stir (if adding ingredients)",
    "Step 9: Enjoy"
  ];

  let result = "";
  steps.forEach((step, index) => {
    result += `  ${step}\n`;
  });

  return result;
}

let stepsTea = getStepsForTea();
function getStepsforCake() {
  steps = [
    "Step 1: Mix flour",
    "Step 2: sugar",
    "Step 3: and eggs",
    "Step 4: Bake in a preheated oven at 350°F for 30 minutes.",
  ];

  let result = "";
  steps.forEach((step, index) => {
    result += `  ${step}\n`;
  });

  return result;
}

let stepscake = getStepsforCake();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const axios = require('axios');

async function sendMessageForTea(data) {

  const apiUrl = "https://v1-api.swiftchat.ai/api/bots/0211321361171423/messages";
  const apiKey = "1a6acaf6-abd4-47d5-8652-45990cd74d89";

  const requestBody = {
    to: data,
    type: "text",
    text: {
      body: stepsTea,
    },
    rating_type: "thumb",
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}




async function sendMessageForCake(data) {

  const apiUrl = "https://v1-api.swiftchat.ai/api/bots/0211321361171423/messages";
  const apiKey = "1a6acaf6-abd4-47d5-8652-45990cd74d89";

  const requestBody = {
    to: data,
    type: "text",
    text: {
      body: stepscake,
    },
    rating_type: "thumb",
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}


app.post('/webhook', (req, res) => {
  console.log(req.body.text);

  if (req.body.text.body == "Tea reciepe") {

    const id = sendMessageForTea(req.body.from)
  }

  if (req.body.text.body == "cake") {

    const id = sendMessageForCake(req.body.from)
  }

}
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
