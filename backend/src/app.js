
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRouter')
const songRouter = require('./routes/songRouter')
const cors = require('cors')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : true,
    credentials : true
}))

app.use(express.static("./public"))
app.use('/api/auth',authRouter)
app.use('/api/songs',songRouter)

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..' ,'/public/index.html'))
})


module.exports = app