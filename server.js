/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() //load env variables
const express = require("express") // import express framework
const morgan = require("morgan") //import morgan for logging
const methodOverride = require("method-override")
const AnimalRouter = require("./controllers/animal")
const UserRouter = require("./controllers/user")
const session = require('express-session')
const MongoStore = require("connect-mongo")
////////////////////////////////////////////////
// move connection code from server.js to connection.js
// move the Animal model into the models/animal.js
////////////////////////////////////////////////

/////////////////////////////////////////////////
// Create App Object
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies for us to have access to it
app.use(express.static("public")) // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false
}))
app.use("/animals", AnimalRouter)
app.use("/user", UserRouter)

////////////////////////////////////////////
// Inital Route
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})
// Users need a way to get to the login and sign up pages so let's refactor the home route in server.js.

/////////////////////////////////////////////////////
// cut the /animal routes from server.js and put them in controllers/animal.js
//////////////////////////////////////////////////////


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))