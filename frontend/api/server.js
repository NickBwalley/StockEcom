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
        model: "text-davinci-004",
        prompt:
          "Generate a list of ecommerce products with prices and descriptions in a structured JSON format.",
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("OpenAI API Response:", response.data);

    const generatedText = response.data.choices[0].text.trim();

    // Attempt to parse the response text as JSON
    let products;
    try {
      products = JSON.parse(generatedText);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError.message);
      console.error("Generated text:", generatedText);
      return res.status(500).json({
        error: "Failed to parse product data",
        details: generatedText,
      });
    }

    // Customize response structure if needed
    const enrichedProducts = products.map((product) => ({
      ...product, // Maintain existing product data
      id: Math.floor(Math.random() * 100000), // Generate a random ID
    }));

    res.json(enrichedProducts);
  } catch (error) {
    console.error("Error fetching products from OpenAI:", error.message);
    if (error.response) {
      console.error("OpenAI API Error Response:", error.response.data);
      return res.status(500).json({
        error: "OpenAI API error",
        details: error.response.data,
      });
    }
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
