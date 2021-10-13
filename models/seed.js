///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Animal = require("./animal")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {

  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startAnimals = [
    { species: "Bird", location: "Africa", extinct: false, lifeExpectancy : "100" },
    { species: "Fish", location: "Atlantic Ocean", extinct: false, lifeExpectancy : "100" },
    { species: "Reptiles", location: "Amazon River", extinct: false, lifeExpectancy : "100" },
    { species: "Amphibians", location: "Nile River", extinct: false, lifeExpectancy : "100" },
    { species: "Mammals", location: "North America", extinct: false, lifeExpectancy : "100" },
  ];

  const starterUser = {
    username: "test",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(10)),
  };

  // Delete all animals
  Animal.remove({}, (err, data) => {
    // Seed Starter Animals
    Animal.create(startAnimals, (err, data) => {
      // log the create animals to confirm
      console.log("--------ANIMALS CREATED----------");
      console.log(data);
      console.log("--------ANIMALS CREATED----------");

      // close the DB connection
      mongoose.connection.close();
    });
  });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////

});