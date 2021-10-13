////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Animal = require("../models/animal")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// router middleware
///////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")
    }
})

/////////////////////////////////////////
// Routes
////////////////////////////////////////////
// Inital Route
////////////////////////////////////////////


router.get("/seed", (req, res) => {
    // array of starter animals
    const startAnimals = [
          { species: "Bird", location: "Africa", extinct: false, lifeExpectancy : "100" },
          { species: "Fish", location: "Atlantic Ocean", extinct: false, lifeExpectancy : "100" },
          { species: "Reptiles", location: "Amazon River", extinct: false, lifeExpectancy : "100" },
          { species: "Amphibians", location: "Nile River", extinct: false, lifeExpectancy : "100" },
          { species: "Mammals", location: "North America", extinct: false, lifeExpectancy : "100" },
        ]

    // Delete all animals
    Animal.remove({}, (err, data) => {
    // Seed Starter Animals
    Animal.create(startAnimals,(err, data) => {
        // sending the new fruits as a response
        res.json(data);
      });
  });
});

// Index Route (Get => /animals)
router.get("/", (req, res) => {
    Animal.find({username: req.session.username}, (err, animals) => {
        res.render("animals/index.ejs", {animals})
    })
})



// New Route (GET => /animals/new)
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

// Create Route (POST => /animals)
router.post("/", (req, res) => {
    // convert ready to eat to true or false
    req.body.extinct = req.body.extinct === "on" ? true : false
    // add the username to req.body
    req.body.username = req.session.username
    // create the new animal
    Animal.create(req.body, (err, animal) => {
        //send the user back to index
        res.redirect("/animals")
    })
})

// The Edit Route (GET => /animals/:id/edit)
router.get("/:id/edit", (req, res) => {
    const id = req.params.id // get id from params
    // get animal from database
    Animal.findById(id, (err, animal) => {
        // render a template
        res.render("animals/edit.ejs", {animal})
    })
})

// The Update Route (PUT => /animals/:id)
router.put("/:id", (req, res) => {
    // get the id param
    const id = req.params.id
    // convert extinct to true or false 
    req.body.extinct = req.body.extinct === "on" ? true : false
    // update the animal
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        // redirect back to main page
        res.redirect("/animals")
    })
})

// Delete Route
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, animal) => {
        res.redirect("/animals")
    })
})

// THe Show (GET => /animals/:id)
router.get("/:id", (req, res) => {
    // grab the id from params
    const id = req.params.id

    Animal.findById(id, (err, animal) => {
        //render the template
        res.render("animals/show.ejs", {animal})
    })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router