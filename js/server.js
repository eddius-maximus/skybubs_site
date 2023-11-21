const express = require('express');
const FortniteAPI = require("fortnite-api-io");
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors()); // This will enable CORS for all routes

const client = new FortniteAPI("b62b520a-a7c02d1e-cbcd7224-8ff2d3c5");

app.get('/daily-shop', async (req, res) => {
    try {
        const dailyShop = await client.v2.getDailyShop({ lang: 'en' });
        res.json(dailyShop);
    } catch (error) {
        res.status(500).send("Error fetching daily shop");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
