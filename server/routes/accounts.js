import express from 'express';
import { connectMongoDB } from '../util/mongodb.js';
import { config } from '../config/init.js';

const accountsRouter = express.Router();
accountsRouter.use(express.json());

accountsRouter.post('/create', async (req, res) => {
  // receive the following parameters from the request body
  const {user_id, account_type} = req.body;
  // verify that the parameters are not undefined
  if(!user_id || !account_type){
    return res.status(400).json({message: "All fields are required"});
  }

  let type = undefined;
  if(account_type === "1"){
    type = "Savings";
  } else if(account_type === "2"){
    type = "Checking";
  } else {
    type = "Credit Card";
  }

  try {
    await connectMongoDB();
  } catch (error) {
    console.log("Error connecting to mongoDB: ", error);
    return res.status(500).json({message: "Error connecting to mongoDB"});
  }

  /*
    sample curlxx
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
  \"type\": \"Credit Card\",
  \"nickname\": \"string\",
  \"rewards\": 0,
  \"balance\": 0,
  \"account_number\": \"string\"
}" "http://api.nessieisreal.com/customers/adsfasdfasdfdfadfasdfdsfasdfasdf/accounts?key=8d03edc1ac4aba2e9db9aa396a68bfb3"
  */
 // generate a random 16 digit account number
  let account_number = "";
  for(let i = 0; i < 16; i++){
    account_number += Math.floor(Math.random() * 10);
  }
 
  const url = `http://api.nessieisreal.com/customers/${user_id}/accounts?key=${config.capitalone_api_key}`;
  const data = {
    type: type,
    nickname: "string",
    rewards: 0,
    balance: 0,
    account_number: account_number
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if(response.status !== 201){
    console.log("Error creating account: ", response);
    return res.status(500).json({message: "Error creating account"});
  }

  let responseData = await response.json();

  res.status(201).json({
    message: "Account created successfully",
    account: responseData.objectCreated
  });

});

/*

Now create an route for this one

curl -X GET --header "Accept: application/json" "http://api.nessieisreal.com/customers/66e63d319683f20dd5189c7e/accounts?key=8d03edc1ac4aba2e9db9aa396a68bfb3"
the user_id is provided in the body and is a post route
*/

accountsRouter.post('/get', async (req, res) => {
  // receive the following parameters from the request body
  const {user_id} = req.body;
  console.log(req.body)
  // verify that the parameters are not undefined
  if(!user_id){
    return res.status(400).json({message: "All fields are required"});
  }

  try {
    await connectMongoDB();
  } catch (error) {
    console.log("Error connecting to mongoDB: ", error);
    return res.status(500).json({message: "Error connecting to mongoDB"});
  }

  const url = `http://api.nessieisreal.com/customers/${user_id}/accounts?key=${config.capitalone_api_key}`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if(response.status !== 200){
    console.log("Error getting accounts: ", response);
    return res.status(500).json({message: "Error getting accounts"});
  }

  let responseData = await response.json();

  res.status(200).json({
    message: "Accounts retrieved successfully",
    accounts: responseData
  });
});

export default accountsRouter;