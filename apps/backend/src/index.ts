import express from 'express'
import cors from 'cors'
const Routes = require('./routes/routes')
import bodyParser from 'body-parser'

const port = 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/', Routes)

app.listen(port , ()=>{
    console.log('running on port 3000')
})