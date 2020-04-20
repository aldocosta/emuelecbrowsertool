const express = require('express')
const path = require('path')
const ejs = require('ejs')
const dotenv = require('dotenv')
dotenv.config()
const expresslayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(expresslayout)



const homeRoute = require('./routes/home')(app)

//app.use(homeRoute)
// app.get('/', (req, res) => {
//     res.render('pages/home')
// })


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Running on ${port}`)
})