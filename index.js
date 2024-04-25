import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import cors from "cors"
import fileUpload from 'express-fileupload'

import authRoute from "./routes/auth.js"
import postRoute from './routes/posts.js'
// import postRoute from "./routes/posts.js"

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute )
app.use('/api/posts', postRoute)


app.get('/', (req, res) => {
   return res.json({message: 'All is fine'})
})

async function start() {
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.e3u2iox.mongodb.net/${DB_NAME}`)
        app.listen(PORT, ()=> console.log(`Server start ${PORT}`))
    } catch(error){
        console.log("Error")
    }
}
start()

