import OpenAI from "openai";
import express from 'express';
import dotenv from 'dotenv';
import { config } from '../config/init.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));  



const assistantId = "asst_wjm0DtGeNjs4EJhVrLUi46uV"; 

async function threads(){
    const emptyThread = await openai.beta.threads.create();
    console.log(emptyThread);
    return emptyThread;
}

async function waitOnRun(run,thread){

}

async function addMessage(threadId, messageContent) {
    const threadMessages = await openai.beta.threads.messages.create(
        threadId,
        { role: "user", content: messageContent }
    );
    console.log(threadMessages);
    return threadMessages;
}

async function runAssistant(threadId) {
    const response = await openai.beta.threads.runs.create(
        threadId,
        {
            assistant_id: assistantId
        }
    );
    console.log(response);
    return response;
}

//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++
//                              API Routes
//++++++++++++++++++++++++++++          ++++++++++++++++++++++++++++

// Create a new thread
app.get('/thread', (req, res) => {
    threads().then(thread => {
        res.json({ threadId: thread.id });
    }).catch(err => res.status(500).json({ error: err.message }));
});

app.post("/message", (req, res) => {
    const { message, threadId } = req.body;
    addMessage(threadId, message).then(() => {
        runAssistant(threadId).then(run => {
            res.json({ runId: run.id });
        }).catch(err => res.status(500).json({ error: err.message }));
    }).catch(err => res.status(500).json({ error: err.message }));
});

app.get("/assistant-response", (req, res) => {
    const { runId } = req.query;
    res.json({ response: "This is a simulated response from the assistant." });
});
