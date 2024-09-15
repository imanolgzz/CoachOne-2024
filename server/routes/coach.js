import OpenAI from "openai"
import dotenv from 'dotenv'
dotenv.config();

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});

async function main(){
    const myAssistant = await openai.beta.assistants.create({
        instructions:
            "You are a personal finance coach, When asked a question about personal finances, or trading, write and run Javascript code to answer the question",
        name:"Coach One",
        tools:[{type:"code_interpreter"}],
        model:"gpt-4o"
    });

    console.log(myAssistant)
}

main();
