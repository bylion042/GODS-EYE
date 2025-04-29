const axios = require('axios');

async function createShortUrl(originalUrl, customShort) {
    try {
        const apiUrl = 'https://api.tinyurl.com/create';
        const payload = { url: originalUrl };

        if (customShort) {
            payload.alias = customShort;
        }

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': `Bearer ${process.env.TINYURL_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        

        if (response.data?.data?.tiny_url) {
            return response.data.data.tiny_url;
        }

        throw new Error('TinyURL API error');
    } catch (error) {
        console.error('Error creating short URL:', error.response?.data || error.message);
        throw new Error('Short URL creation failed');
    }
}

module.exports = { createShortUrl };
