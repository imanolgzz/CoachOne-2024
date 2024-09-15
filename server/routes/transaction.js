import express from 'express';
import { config } from '../config/init.js';
const financeRouter = express.Router();
financeRouter.use(express.json());

financeRouter.post('/accounts', async (req, res) => {
    try {
        const { medium, transaction_date, status, description, amount } = req.body;

        if (!medium || !['balance', 'rewards'].includes(medium)) {
            return res.status(400).json({ error: 'Invalid medium' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const user_id = req.user?.id; 
        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const url = `http://api.nessieisreal.com/customers/${user_id}/deposits?key=${config.capitalone_api_key}`;
        
        const requestBody = {
            medium,
            transaction_date,
            status,
            amount,
            description
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.status === 404) {
            const errorData = await response.json();
            return res.status(404).json({
                error: 'Account not found',
                message: errorData.message || 'Please check the user ID or account information.'
            });
        }

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error });
        }

        const data = await response.json();
        res.status(201).json(data);
    } catch (error) {
        console.error('Error processing deposit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// financeRouter.post(`/accounts/{}/transfer`,async(req,res) => {
//     try{
//         const{medium,transaction_date,status,description,amount,payee_id} = req.body;


//         //realizar el fetch 
//         const url = `http://api.nessieisreal.com/customers?key=${config.capitalone_api_key}`;
//         const data = {
//             medium:medium,
//             transaction_date:transaction_date,
//             status:status,
//             description:description,
//             amount:amount,
//             payee_id:payee_id
//         };

//         let response = await fetch(url,{
//             method: "POST",

//         })
//     }
// })


export default financeRouter;