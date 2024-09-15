import express from 'express';
import { connectMongoDB } from '../util/mongodb.js';
import bcrypt from 'bcrypt';
import Users from '../models/users.js';
import { config } from '../config/init.js';

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/register', async (req, res) => {
  try{
    console.log(req.body);
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
      message: "User created successfully",
      user_id: responseData.objectCreated._id
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({message: "Error creating user"});
  }
})

authRouter.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    // recibe email and password, validate and output userId
    const {email, password} = req.body;

    // verify that parammeters are not undefined
    if(!email || !password){
      console.log(email + " " + password);
      return res.status(400).json({message: "All fields are required"});
    }

    try {
      await connectMongoDB();
    } catch (error) {
      console.log("Error connecting to mongoDB: ", error);
      return res.status(500).json({message: "Error connecting to mongoDB"});
    }

    const user = await Users.findOne({email}).select("_id password userId");
    if(!user){
      return res.status(400).json({message: "Invalid email or password"});
    }
    
    const match = await bcrypt.compare(password, user.password);

    if(!match){
      return res.status(400).json({message: "Invalid email or password"});
    }

    res.status(200).json({
      user_id: user.userId
    });

  } catch (error) {
    console.log("Error logging in user: ", error);
    res.status(500).json({message: "Error logging in user"});
  }
})

export default authRouter;