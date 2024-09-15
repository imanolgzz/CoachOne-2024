import OpenAI from "openai";
import express from 'express';
import dotenv from 'dotenv';
import { config } from '../config/init.js';

dotenv.config();

const chatBot = express.Router();
chatBot.use(express.json());
chatBot.use(express.static('public'));  

const openai = new OpenAI({
    apiKey:config.OPENAI_API_KEY
});

const assistantId = config.OPENAI_ASSISTANT;
let pollingInterval;


async function createThread(){
    const threads = await openai.beta.threads.create();
    return threads
}

async function addMessage(threadId,message){
    const response = await openai.beta.threads.messages.create(
        threadId,
        {
            role:"user",
            content:message
        }
    );
    return response
}

async function runAssistant(threadId){
    const response = openai.beta.threads.run.create(
        threadId,
        {
            assistant_id:assistantId
        }
    )
    return response
}

async function checkinStatus(res,threadId,runId){
    const runObject = await openai.beta.threads.runs.retrieve(
        threadId,
        runId
    )

    const status = runObject.status;
    if(status=="completed"){
        clearInterval(pollingInterval);
        const messageList = await openai.beta.threads.messages.list(threadId);
        let messages = [];

        messageList.body.data.forEach(message => {
            messages.push(message.content);
        });

        res.json({messages});
    }
}

//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++
//                              API Routes
//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++

// Create a new thread
chatBot.get('/thread', (req, res) => {
    createThread().then(thread =>{
        res.json({threadId:thread.id})
    })
});

chatBot.post("/message", (req, res) => {
    const { message, threadId } = req.body;
    addMessage(threadId, message).then(message => {
        runAssistant(threadId).then(run => {
            const runId = run.id

            pollingInterval = setInterval(()=>{
                checkinStatus(res,threadId,runId);  
            },5000);
        })
    })
});

chatBot.get("/assistant-response", (req, res) => {
    const { runId } = req.query;
    res.json({ response: "This is a simulated response from the assistant." });
});

export default chatBot