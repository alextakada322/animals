// import the connected mongoose object
const mongoose = require("./connection")


////////////////////////////////////////////////
// Our Models - description of data & where to store data
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make animals schema
const animalsSchema = new Schema({
    species: String,
    location: String,
    extinct: Boolean,
    lifeExpectancy: Number,
})

// make animal model
const Animal = model("Animal", animalsSchema)

// export the model
module.exports = Animal