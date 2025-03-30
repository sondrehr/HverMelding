const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const cache = {}; // In-memory cache for weather data

app.get('/weather', async (req, res) => {
    const lat = req.query.lat || 59.2;
    const lon = req.query.lon || 9.6;
    const cacheKey = `${lat},${lon}`;
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    let ifModifiedSince = null;

    // Check if cached data exists and is still valid
    if (cache[cacheKey]) {
        const { data, expires } = cache[cacheKey];

        if (new Date() < new Date(expires)) {
            console.log('Using cached weather data');
            return res.json(data);
        }

        ifModifiedSince = expires;
    }

    try {
        console.log('Fetching new weather data');
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'HverMelding/1.0 (https://github.com/sondrehr/HverMelding)',
                ...(ifModifiedSince && { 'If-Modified-Since': ifModifiedSince }),
            },
        });

        console.log('IfModifiedSince', ifModifiedSince);

        if (response.status === 304) {
            console.log('Data not modified, using cached data');
            return res.json(cache[cacheKey].data);
        }

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to fetch weather data: ${response.status}` });
        }

        const data = await response.json();
        const expires = response.headers.get('Expires') || new Date(Date.now() + 3600 * 1000).toUTCString();

        console.log('Loaded data');
        console.log(response.headers.get('Expires'));
        console.log(Date(expires));

        // Update the cache
        cache[cacheKey] = { data, expires };

        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});