const express = require('express');
const FortniteAPI = require("fortnite-api-io");
const app = express();
const port = 3000;
const cors = require('cors');
const axios = require('axios');

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

app.get('/minecraft-player/:name', async (req, res) => {
    const playerName = req.params.name;

    try {
        // Fetch UUID
        const uuidResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${playerName}`);
        if (!uuidResponse.data) {
            return res.status(404).send('Player not found');
        }
        const uuid = uuidResponse.data.id;

        // Fetch player profile for skin and cape
        const profileResponse = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        const skinUrl = profileResponse.data.properties.find(prop => prop.name === 'textures').value;
        const decodedTextures = JSON.parse(Buffer.from(skinUrl, 'base64').toString());

        // Send JSON response
        res.json({ 
            uuid: uuid, 
            name: uuidResponse.data.name,
            skin: decodedTextures.textures.SKIN ? decodedTextures.textures.SKIN.url : null,
            cape: decodedTextures.textures.CAPE ? decodedTextures.textures.CAPE.url : null
        });

    } catch (error) {
        console.error('Error fetching Minecraft player data:', error);
        res.status(500).send("Error fetching player data");
    }
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
