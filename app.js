const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("Ogogdliin santai holbogdoj chadlaa")
})
mongoose.connection.on('error',(err)=>{
    console.log("Ogogdliin santai holbogdoj chadsangui :(",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
/*
const customMiddleware=(req,res,next)=>{
    console.log("middleware executed!")
    next()
}*/

//app.use(customMiddleware)
/*
app.get('/',(req,res)=>{
    console.log("home")
    res.send("Za sain baina uu")
})
app.get('/about',customMiddleware,(req,res)=>{
    console.log("about")
    res.send("about page")
})
*/

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

