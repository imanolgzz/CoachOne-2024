import express from 'express';
import { connectMongoDB } from '../util/mongodb.js';
import bcrypt from 'bcrypt';
import Users from '../models/users.js';
import { config } from '../config/init.js';

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.get('/', (req, res) => {
  res.send("Hello World!");
})

authRouter.post('/register', async (req, res) => {
  try{
    const {first_name, last_name, street_number, street_name, state, zip, password, confirm_password, email, city } = req.body;
    // verify that parammeters are not undefined
    if(!first_name || !last_name || !street_number || !street_name || !state || !zip || !password || !confirm_password || !email || !city){
      return res.status(400).json({message: "All fields are required"});
    }
    
    // verify that passwords match
    if(password !== confirm_password){
      return res.status(400).json({message: "Passwords do not match"});
    }

    // validate that zip is a string of 5 digits if it is not transform it to a string of 5 digits
    if(zip.length !== 5){
      zip = zip.toString().substring(0, 5);
    }

    // validate that the state is a string of 2 characters if it is not transform it to a string of 2 characters
    if(state.length !== 2){
      state = state.toString().substring(0, 2);
    }

    try {
      await connectMongoDB();
    } catch (error) {
      console.log("Error connecting to mongoDB: ", error);
      return res.status(500).json({message: "Error connecting to mongoDB"});
    }

    // verify that password is at least 8 characters long
    if(password.length < 8){
      return res.status(400).json({message: "Password must be at least 8 characters long"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.findOne({email}).select("_id");
    if(user){
      return res.status(400).json({message: "User already exists"});
    }


    /*
      make a query to the following endpoint: 
      POST http://api.nessieisreal.com/customers?key=8d03edc1ac4aba2e9db9aa396a68bfb3
      {
        "first_name": "string",
        "last_name": "string",
        "address": {
          "street_number": "string",
          "street_name": "string",
          "city": "string",
          "state": "string",
          "zip": "string"
        }
      }
    */

    const url = `http://api.nessieisreal.com/customers?key=${config.capitalone_api_key}`;
    const data = {
      first_name: first_name,
      last_name: last_name,
      address: {
        street_number: street_number,
        street_name: street_name,
        city: city,
        state: state,
        zip: zip
      }
    };
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        data
      )
    });

    if(response.status !== 201){
      console.log("Error creating customer: ", response);
      return res.status(500).json({message: "Error creating customer"});
    }

    let responseData = await response.json()
    
    await Users.create({
      userId: responseData.objectCreated._id,
      email: email,
      password: hashedPassword
    });
    res.status(201).json({
      message: "User creatd successfully"
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({message: "Error creating user"});
  }
})

/*
authRouter.post('/registerDummy', async (req, res) => {
  try{
      make a query to the following endpoint: 
      POST http://api.nessieisreal.com/customers?key=8d03edc1ac4aba2e9db9aa396a68bfb3
      {
        "first_name": "string",
        "last_name": "string",
        "address": {
          "street_number": "string",
          "street_name": "string",
          "city": "string",
          "state": "string",
          "zip": "string"
        }
      }
    const url = `http://api.nessieisreal.com/customers?key=${config.capitalone_api_key}`;
    const data = {
      first_name: "H",
      last_name: "H",
      address: {
        street_number: "JIJIJIJA",
        street_name: "201",
        city: "Monterrey",
        state: "MA",
        zip: "20120"
      }
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
      console.log("Error creating customer: ", response);
      return res.status(500).json({message: "Error creating customer"});
    }
  
    res.status(201).json({
      message: "User creatd successfully"
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({message: "Error creating user"});
  }
})
*/
export default authRouter;