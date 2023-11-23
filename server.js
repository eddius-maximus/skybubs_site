const express = require('express');
const FortniteAPI = require("fortnite-api-io");
const app = express();
const port = 3000;
const cors = require('cors');
const axios = require('axios');
const fetch = require('node-fetch');
const HYPIXEL_API_KEY = 'b6a49205-d25d-480e-9586-a6c35fe07008';

app.use(cors()); // This will enable CORS for all routes

const client = new FortniteAPI("b62b520a-a7c02d1e-cbcd7224-8ff2d3c5");

app.use(express.static('public'));

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
        console.log(`Fetching UUID for player: ${playerName}`);
        const uuidResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${playerName}`);
        if (!uuidResponse.data) {
            console.log('Player not found in Mojang API');
            return res.status(404).send('Player not found');
        }
        const uuid = uuidResponse.data.id;
        console.log(`UUID for player ${playerName}: ${uuid}`);

        // Fetch player profile for skin and cape
        console.log(`Fetching player profile for UUID: ${uuid}`);
        const profileResponse = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        const skinUrl = profileResponse.data.properties.find(prop => prop.name === 'textures').value;
        const decodedTextures = JSON.parse(Buffer.from(skinUrl, 'base64').toString());

        // Fetch player status from Hypixel API
        console.log(`Fetching Hypixel status for UUID: ${uuid}`);
        const hypixelStatusResponse = await axios.get(`https://api.hypixel.net/v2/status?key=${HYPIXEL_API_KEY}&uuid=${uuid}`);
        const hypixelStatus = hypixelStatusResponse.data && hypixelStatusResponse.data.success ? hypixelStatusResponse.data.session : null;

        // Fetch player rank from Hypixel API
        console.log(`Fetching Hypixel rank for UUID: ${uuid}`);
        const hypixelPlayerResponse = await axios.get(`https://api.hypixel.net/v2/player?key=${HYPIXEL_API_KEY}&uuid=${uuid}`);

        console.log("Hypixel Player API Response:", hypixelPlayerResponse.data);

        const hypixelPlayerData = hypixelPlayerResponse.data && hypixelPlayerResponse.data.success ? hypixelPlayerResponse.data.player : null;
        const playerRank = hypixelPlayerData ? hypixelPlayerData.rank : 'Normal';
            // Fetch guild data from Hypixel API
            const guildResponse = await axios.get(`https://api.hypixel.net/v2/guild?key=${HYPIXEL_API_KEY}&player=${uuid}`);
            const guildData = guildResponse.data;
            // Send JSON response
            res.json({ 
                uuid: uuid, 
                name: uuidResponse.data.name,
                skin: decodedTextures.textures.SKIN ? decodedTextures.textures.SKIN.url : null,
                cape: decodedTextures.textures.CAPE ? decodedTextures.textures.CAPE.url : null,
                hypixelStatus: hypixelStatus,
                hypixelRank: playerRank, // Include the player's rank
                hypixelGuild: guildData.guild
            });

    } catch (error) {
        console.error('Error fetching Minecraft player data:', error);
        res.status(500).send("Error fetching player data");
    }
});





app.listen(port, () => console.log(`Server running on port ${port}`));

