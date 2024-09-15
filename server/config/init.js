import dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || 3500,
  capitalone_api_key: process.env.CAPITAL_ONE_API_KEY,
  db: {
    host: 'mongo',
    port: 27017,
    name: 'mydatabase'
  },
  apiKey:process.env.OPENAI_API_KEY
}
export {config}