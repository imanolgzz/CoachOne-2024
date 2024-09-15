import express from 'express';
import { config } from '../config/init.js';
const transferRouter = express.Router();
transferRouter.use(express.json());

transferRouter.get('/accounts', async (req, res) => {
    try {
        console.log("flag")
        const { user_id, type } = req.body;
        if (!type || !['payer', 'payee'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type' });
        }

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const url = `http://api.nessieisreal.com/accounts/${user_id}/transfers?type=${type}&key=${config.capitalone_api_key}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        if (response.status === 404) {
            return res.status(404).json({
                error: 'Account not found',
                message: 'Please check the user ID or account information.'
            });
        }

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error });
        }

        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default transferRouter;