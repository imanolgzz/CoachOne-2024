const config = {
  port: process.env.PORT || 3500,
  db: {
    host: 'localhost',
    port: 27017,
    name: 'mydatabase'
  }
}
export {config}