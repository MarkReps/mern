const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth', require("./routes/auth.routes"))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/',require('./routes/redirect.routes'))

const PORT = config.get("port")||5000;

const start = async () =>{
    mongoose.connect(config.get('mongoUrl'),{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    app.listen(PORT, ()=>console.log(`server working on port = ${PORT}`))
}

start()