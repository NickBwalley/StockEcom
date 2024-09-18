const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware to handle JSON requests
app.use(express.json());

// Route to fetch product data from OpenAI
app.get("/api/special-offers", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt:
          "Generate a list of ecommerce products with prices and descriptions for special offers.",
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Parse the generated text to JSON format (assuming the OpenAI API returns a valid JSON string)
    const products = JSON.parse(response.data.choices[0].text);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products from OpenAI:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
