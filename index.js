const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const userInput = req.body.query;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: userInput,
      max_tokens: 50,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR-API-KEY`
      }
    });

    const gptResponse = response.data.choices[0].text.trim();

    res.json({
      fulfillmentText: gptResponse
    });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({
      fulfillmentText: 'There was an error processing your request.'
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
