import OpenAI from "openai"
import express from 'express';
import { config } from '../config/init.js';

dotenv.config();

const app = express();
app.use(express.json())

const openai = new OpenAI({
    apiKey:config.apiKey
});

const assistantId = "";

async function main(){

    // console.log(myAssistant)

    threads();


}

async function threads(){
    const emptyThread=await openai.beta.threads.create();
    console.log(emptyThread);
    return emptyThread;
}

async function addMessage (threadId){
    const threadMessages = await openai.beta.threads.messages.create(
        "{threadId}",
        { role: "user", content: "I would like you to give me a financial advice, I spend too much money on coffee, any suggestion" }
      );
    
      console.log(threadMessages);
}

async function runAssistant(threadId){
    const response =await openai.beta.threads.runs.create(
        threadId,{
            assistant_id:assistantId
        }
    );
    console.log(response);
    return response
}



main();


//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++
//                              Server
//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++


app.get('thread',(req,res) =>{
    threads().then(thread =>{
        res.json({threadId: thread.id})
    });
});

app.post("/message",(req,res) =>{
    const {message,threadId} = req.body;
    addMessage(threadId).then(message =>{
        runAssistant(threadId).then(run => {
            const runId = run.id;
        });

    })
})