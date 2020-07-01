require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.use(cors())
mongoose.connect(process.env.MONGO_URL_REMOTE,
    {   
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })

app.use(express.static(path.resolve(__dirname, '..', 'tmp')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser(process.env.SECRET))
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(routes)

app.listen(process.env.PORT || 3001)